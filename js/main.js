// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('mobile-menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', !isOpen);
      // Toggle icons
      var iconOpen = toggle.querySelector('.icon-open');
      var iconClose = toggle.querySelector('.icon-close');
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
      }
    });
    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        var iconOpen = toggle.querySelector('.icon-open');
        var iconClose = toggle.querySelector('.icon-close');
        if (iconOpen && iconClose) {
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.classList.remove('open');
          i.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
        });
        // Open clicked if it was closed
        if (!wasOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});
