/**
 * Portail Client — mon-agenceweb.fr
 */
(function() {
    'use strict';

    // Mobile burger menu
    var burger = document.getElementById('portalBurger');
    var nav = document.querySelector('.portal-nav');
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }

    // CSRF token
    window.portalCSRF = document.querySelector('meta[name="csrf-token"]');
    window.getCSRF = function() {
        return window.portalCSRF ? window.portalCSRF.content : '';
    };

    // Notification polling
    function checkNotifications() {
        fetch('/portail/api/notifications')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                var badge = document.getElementById('notifBadge');
                if (badge) {
                    if (data.count > 0) {
                        badge.style.display = '';
                        badge.title = data.count + ' notification(s)';
                    } else {
                        badge.style.display = 'none';
                    }
                }
            })
            .catch(function() {});
    }

    if (document.querySelector('.portal-nav')) {
        checkNotifications();
        setInterval(checkNotifications, 60000);
    }

    // Auto-save for questionnaire steps
    window.autoSaveStep = function(stepNumber, formElement) {
        var indicator = document.querySelector('.portal-save-indicator');
        var formData = new FormData(formElement);
        var data = {};
        formData.forEach(function(value, key) {
            if (data[key]) {
                if (!Array.isArray(data[key])) data[key] = [data[key]];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        });

        fetch('/portail/api/save-step', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCSRF()
            },
            body: JSON.stringify({
                step: stepNumber,
                data: data,
                completed: false
            })
        })
        .then(function(r) { return r.json(); })
        .then(function(result) {
            if (result.success && indicator) {
                indicator.textContent = 'Sauvegardé';
                indicator.classList.add('visible');
                setTimeout(function() { indicator.classList.remove('visible'); }, 2000);
            }
        })
        .catch(function() {});
    };

    // Debounce for auto-save
    var saveTimeout;
    window.debounceSave = function(stepNumber, form) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function() {
            window.autoSaveStep(stepNumber, form);
        }, 1500);
    };
})();
