/* mon-agenceweb.fr — Studio 3D des projets phares : MacBook + iPhone, vidéo du site à l'écran */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const section = document.getElementById('projets');
const canvas = document.getElementById('studioGl');
const panels = [...section.querySelectorAll('.studio-panel')];
const dots = [...section.querySelectorAll('.studio-dot')];
const countEl = document.getElementById('studioCount');
const fallbackImg = document.getElementById('studioFallback');
const N = panels.length;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrow = () => window.innerWidth <= 900;

// ---------- Panneaux de texte & navigation (fonctionnent même sans 3D) ----------
let active = 0;
function setActive(i) {
    if (i === active) return;
    active = i;
    panels.forEach((p, j) => p.classList.toggle('is-active', j === i));
    dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
    countEl.innerHTML = '0' + (i + 1) + ' <i>/ 0' + N + '</i>';
    section.style.setProperty('--studio-accent', hexA(panels[i].dataset.accent, 0.28));
    if (fallbackImg) fallbackImg.src = panels[i].dataset.posterD;
}
section.style.setProperty('--studio-accent', hexA(panels[0].dataset.accent, 0.28));

function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}

function progress() {
    const r = section.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return { p: THREE.MathUtils.clamp(-r.top / total, 0, 1), enter: THREE.MathUtils.clamp(1 - r.top / window.innerHeight, 0, 1), r };
}

dots.forEach((d, i) => d.addEventListener('click', () => {
    const r = section.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    const y = window.scrollY + r.top + total * ((i + 0.35) / N);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
}));

// Sans WebGL : les panneaux suivent le scroll, une capture remplace les appareils
function fallbackLoop() {
    const { p } = progress();
    setActive(Math.min(N - 1, Math.floor(p * N)));
    requestAnimationFrame(fallbackLoop);
}

let renderer;
try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (e) { renderer = null; }

if (!renderer) {
    document.documentElement.classList.add('no-webgl-studio');
    fallbackLoop();
} else {
    build();
}

function build() {
    const small = window.innerWidth < 760;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.75 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    // ---------- Lumières (la couleur d'accent suit le projet) ----------
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 6, 5);
    scene.add(key);
    const rimL = new THREE.PointLight(0x8ab4f8, 14, 20);
    rimL.position.set(-5, 3, -2);
    const rimR = new THREE.PointLight(0xffffff, 10, 20);
    rimR.position.set(5, 2, -3);
    scene.add(rimL, rimR);

    // ---------- Matériaux ----------
    const alu = new THREE.MeshPhysicalMaterial({ color: 0x23232c, metalness: 0.85, roughness: 0.32, clearcoat: 0.4, clearcoatRoughness: 0.3 });
    const titanium = new THREE.MeshPhysicalMaterial({ color: 0x2e2c36, metalness: 0.9, roughness: 0.22, clearcoat: 0.6 });
    const black = new THREE.MeshStandardMaterial({ color: 0x050507, roughness: 0.4, metalness: 0.2 });
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x0d0d12, roughness: 0.65, metalness: 0.1 });
    const padMat = new THREE.MeshPhysicalMaterial({ color: 0x2a2a33, metalness: 0.6, roughness: 0.18, clearcoat: 1 });

    const rig = new THREE.Group();
    scene.add(rig);

    // ---------- MacBook ----------
    const laptop = new THREE.Group();
    rig.add(laptop);
    const BW = 3.3, BD = 2.25, BH = 0.11;
    const base = new THREE.Mesh(new RoundedBoxGeometry(BW, BH, BD, 4, 0.05), alu);
    laptop.add(base);

    // Clavier : touches instanciées
    const kw = 0.19, kgap = 0.034, cols = 13, rows = 5;
    const keys = new THREE.InstancedMesh(new RoundedBoxGeometry(kw, 0.02, kw, 2, 0.02), keyMat, cols * rows);
    const m4 = new THREE.Matrix4();
    let idx = 0;
    const kx0 = -((cols - 1) * (kw + kgap)) / 2;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            m4.makeTranslation(kx0 + c * (kw + kgap), BH / 2 + 0.006, -0.82 + r * (kw + kgap));
            keys.setMatrixAt(idx++, m4);
        }
    }
    laptop.add(keys);
    // Barre d'espace
    const space = new THREE.Mesh(new RoundedBoxGeometry(1.1, 0.02, kw, 2, 0.02), keyMat);
    space.position.set(0, BH / 2 + 0.006, -0.82 + rows * (kw + kgap));
    laptop.add(space);
    // Trackpad
    const pad = new THREE.Mesh(new RoundedBoxGeometry(1.25, 0.008, 0.62, 2, 0.004), padMat);
    pad.position.set(0, BH / 2 + 0.002, 0.68);
    laptop.add(pad);

    // Écran (charnière à l'arrière)
    const LH = 2.15, LT = 0.07;
    const hinge = new THREE.Group();
    hinge.position.set(0, BH / 2, -BD / 2 + 0.04);
    laptop.add(hinge);
    const lid = new THREE.Mesh(new RoundedBoxGeometry(BW, LH, LT, 4, 0.05), alu);
    lid.position.set(0, LH / 2, 0);
    hinge.add(lid);
    const bezel = new THREE.Mesh(new THREE.PlaneGeometry(BW - 0.08, LH - 0.08), black);
    bezel.position.set(0, LH / 2, LT / 2 + 0.001);
    hinge.add(bezel);
    const screenW = 3.04, screenH = 1.9; // 1280 × 800
    const lapScreenMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const lapScreen = new THREE.Mesh(new THREE.PlaneGeometry(screenW, screenH), lapScreenMat);
    lapScreen.position.set(0, LH / 2 + 0.04, LT / 2 + 0.003);
    hinge.add(lapScreen);
    // Encoche caméra
    const notch = new THREE.Mesh(new THREE.CircleGeometry(0.018, 16), new THREE.MeshBasicMaterial({ color: 0x1a1a22 }));
    notch.position.set(0, LH - 0.065, LT / 2 + 0.004);
    hinge.add(notch);
    // Reflet vitré sur l'écran
    const glare = new THREE.Mesh(new THREE.PlaneGeometry(screenW, screenH), new THREE.MeshBasicMaterial({
        transparent: true, opacity: 0.08, depthWrite: false, blending: THREE.AdditiveBlending,
        map: glareTexture()
    }));
    glare.position.copy(lapScreen.position); glare.position.z += 0.002;
    hinge.add(glare);

    // Logo lumineux au dos de l'écran (visible pendant la rotation)
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.5), new THREE.MeshBasicMaterial({
        map: logoTexture(), transparent: true, depthWrite: false, toneMapped: false
    }));
    logo.position.set(0, LH / 2 + 0.05, -LT / 2 - 0.002);
    logo.rotation.y = Math.PI;
    hinge.add(logo);

    // ---------- iPhone ----------
    const phone = new THREE.Group();
    rig.add(phone);
    const PW = 0.92, PH = 1.92, PT = 0.085;
    phone.add(new THREE.Mesh(new RoundedBoxGeometry(PW, PH, PT, 6, 0.14), titanium));
    const pBezel = new THREE.Mesh(roundedRect(PW - 0.04, PH - 0.04, 0.12), black);
    pBezel.position.z = PT / 2 + 0.001;
    phone.add(pBezel);
    const phScreenMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const phScreen = new THREE.Mesh(roundedRect(0.84, 1.84, 0.1), phScreenMat); // 780 × 1688
    phScreen.position.z = PT / 2 + 0.003;
    phone.add(phScreen);
    const island = new THREE.Mesh(roundedRect(0.24, 0.07, 0.035), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    island.position.set(0, PH / 2 - 0.12, PT / 2 + 0.005);
    phone.add(island);
    // Boutons latéraux
    const btn = new THREE.Mesh(new RoundedBoxGeometry(0.02, 0.22, 0.04, 2, 0.01), titanium);
    btn.position.set(PW / 2 + 0.005, 0.35, 0);
    phone.add(btn);

    // ---------- Ombre douce au sol ----------
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(7, 4.2), new THREE.MeshBasicMaterial({
        map: radialTexture(), transparent: true, depthWrite: false, opacity: 0.85
    }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -BH / 2 - 0.01;
    rig.add(shadow);

    // ---------- Médias : poster d'abord, vidéo dès qu'elle joue ----------
    const loader = new THREE.TextureLoader();
    const media = panels.map((p) => ({
        d: { video: null, vtex: null, poster: null, src: p.dataset.videoD, posterSrc: p.dataset.posterD },
        m: { video: null, vtex: null, poster: null, src: p.dataset.videoM, posterSrc: p.dataset.posterM }
    }));
    function ensure(slot) {
        if (!slot.poster && slot.posterSrc) {
            slot.poster = loader.load(slot.posterSrc, (t) => { t.colorSpace = THREE.SRGBColorSpace; });
        }
        if (!slot.video && slot.src) {
            const v = document.createElement('video');
            v.src = slot.src; v.muted = true; v.loop = true; v.playsInline = true;
            v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.preload = 'auto'; v.crossOrigin = 'anonymous';
            slot.video = v;
            slot.vtex = new THREE.VideoTexture(v);
            slot.vtex.colorSpace = THREE.SRGBColorSpace;
        }
        return slot;
    }
    function texFor(slot) {
        if (slot.video && slot.video.readyState >= 2) return slot.vtex;
        return slot.poster;
    }
    let shown = -1;
    function show(i) {
        if (i === shown) return;
        // Précharge le projet suivant
        [i, Math.min(N - 1, i + 1)].forEach((k) => { ensure(media[k].d); ensure(media[k].m); });
        media.forEach((mm, k) => ['d', 'm'].forEach((s) => {
            const v = mm[s].video;
            if (!v) return;
            if (k === i && inView && !reduce) v.play().catch(() => {});
            else v.pause();
        }));
        if (media[i].d.video) media[i].d.video.currentTime = 0;
        if (media[i].m.video) media[i].m.video.currentTime = 0;
        shown = i;
    }

    // ---------- Mise en page selon l'écran ----------
    const lay = { x: 0, y: 0, s: 1, camZ: 11, camY: 2.6, lookY: 0.7 };
    function resize() {
        const w = section.clientWidth, h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const visH = (z) => 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * z;
        if (isNarrow()) {
            // Mobile : appareils au centre, entre le titre et le texte
            lay.camZ = 13 / Math.min(1, camera.aspect / 0.68); lay.camY = 2.4; lay.lookY = 0.45;
            lay.x = -0.12; lay.y = 0.5; lay.s = 1;
            phone.position.set(2.0, 0, 1.1);
        } else {
            lay.camZ = 10.5; lay.camY = 2.6; lay.lookY = 0.7;
            // Centre du duo vers 66 % de la largeur, sous le titre
            lay.x = visH(lay.camZ) * camera.aspect * 0.19 - 0.5; lay.y = -0.55; lay.s = 0.9;
            phone.position.set(2.05, 0, 0.75);
        }
        camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // ---------- Souris ----------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener('pointermove', (e) => {
        mouse.tx = e.clientX / window.innerWidth - 0.5;
        mouse.ty = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });

    // ---------- Rendu seulement quand la section est visible ----------
    let inView = false, raf = 0;
    new IntersectionObserver(([e]) => {
        inView = e.isIntersecting;
        if (inView) { shown = -1; show(active); if (!raf) raf = requestAnimationFrame(loop); }
        else media.forEach((mm) => ['d', 'm'].forEach((s) => mm[s].video && mm[s].video.pause()));
    }, { rootMargin: '200px 0px' }).observe(section);

    const clock = new THREE.Clock();
    const sm = (a, b, x) => { const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    const accent = new THREE.Color(), accentT = new THREE.Color();
    let pS = 0, enterS = 0;

    function loop() {
        raf = 0;
        if (!inView) { window.__studioCover = 0; return; }
        const dt = Math.min(clock.getDelta(), 0.1);
        const t = clock.elapsedTime;
        const { p, enter, r } = progress();
        const k1 = 1 - Math.exp(-dt * 7), k2 = 1 - Math.exp(-dt * 4);
        pS += (p - pS) * k1;
        enterS += (enter - enterS) * k1;
        mouse.x += (mouse.tx - mouse.x) * k2;
        mouse.y += (mouse.ty - mouse.y) * k2;
        // Indique à la scène de fond de s'effacer tant que le studio occupe l'écran
        const vh = window.innerHeight;
        window.__studioCover = THREE.MathUtils.clamp(Math.min((vh - r.top) / (vh * 0.5), (r.bottom) / (vh * 0.6)), 0, 1);

        // Segment courant + rotation de transition dans le dernier quart
        const f = Math.min(pS * N, N - 0.0001);
        const k = Math.floor(f);
        const local = f - k;
        const last = k === N - 1;
        const spinT = last || reduce ? 0 : sm(0.72, 1, local);
        const proj = !last && local > 0.86 ? k + 1 : k;   // l'écran change quand il est de dos
        setActive(proj);
        show(proj);

        // Couleur d'accent des lumières
        accentT.set(panels[proj].dataset.accent);
        accent.lerp(accentT, k2);
        rimL.color.copy(accent).lerp(new THREE.Color(0xffffff), 0.5);

        // Écrans : poster ou vidéo
        const tD = texFor(media[proj].d), tM = texFor(media[proj].m);
        if (tD && lapScreenMat.map !== tD) { lapScreenMat.map = tD; lapScreenMat.needsUpdate = true; }
        if (tM && phScreenMat.map !== tM) { phScreenMat.map = tM; phScreenMat.needsUpdate = true; }

        // Ouverture de l'écran à l'arrivée dans la section
        const open = reduce ? 1 : sm(0.25, 0.95, enterS);
        hinge.rotation.x = THREE.MathUtils.lerp(1.53, -0.3, open);
        lapScreenMat.color.setScalar(0.25 + 0.75 * open);

        // Chorégraphie du rig
        const sway = reduce ? 0 : Math.sin(t * 0.6) * 0.04;
        rig.position.set(lay.x, lay.y + Math.sin(spinT * Math.PI) * 0.35 + (1 - open) * -0.4, 0);
        rig.rotation.y = -0.42 + mouse.x * 0.35 + sway + spinT * Math.PI * 2 + (1 - open) * 0.5;
        rig.rotation.x = 0.06 + mouse.y * 0.12;
        rig.scale.setScalar(lay.s * (0.85 + 0.15 * open));

        // Le téléphone flotte légèrement, en décalé
        phone.rotation.set(-0.08, -0.32 + Math.sin(t * 0.8) * 0.04, 0.02);
        phone.position.y = PH / 2 - BH / 2 + 0.02 + (reduce ? 0 : Math.sin(t * 1.1) * 0.05) + 0.08;

        camera.position.set(mouse.x * 0.6, lay.camY - mouse.y * 0.3, lay.camZ);
        camera.lookAt(0, lay.lookY, 0);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
    }

    // ---------- Utilitaires ----------
    function roundedRect(w, h, r) {
        const s = new THREE.Shape();
        const x = -w / 2, y = -h / 2;
        s.moveTo(x + r, y);
        s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
        s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
        s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
        const g = new THREE.ShapeGeometry(s, 12);
        const uv = g.attributes.uv, pos = g.attributes.position;
        for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h);
        return g;
    }
    function radialTexture() {
        const c = document.createElement('canvas'); c.width = c.height = 256;
        const g = c.getContext('2d');
        const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
        gr.addColorStop(0, 'rgba(0,0,0,.75)'); gr.addColorStop(0.55, 'rgba(0,0,0,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(c);
    }
    function logoTexture() {
        const c = document.createElement('canvas'); c.width = 512; c.height = 232;
        const g = c.getContext('2d');
        const gr = g.createLinearGradient(80, 0, 430, 0);
        gr.addColorStop(0, '#dfe8fb'); gr.addColorStop(1, '#8ab4f8');
        g.font = '800 150px Manrope, "Inter Tight", system-ui, sans-serif';
        g.textAlign = 'center'; g.textBaseline = 'middle';
        g.shadowColor = 'rgba(138,180,248,.5)'; g.shadowBlur = 14;
        g.fillStyle = gr; g.fillText('maw.', 256, 120);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        // Redessine quand la police d'affichage est chargée
        if (document.fonts) document.fonts.ready.then(() => {
            g.clearRect(0, 0, 512, 232); g.fillText('maw.', 256, 120); tex.needsUpdate = true;
        });
        return tex;
    }
    function glareTexture() {
        const c = document.createElement('canvas'); c.width = 256; c.height = 160;
        const g = c.getContext('2d');
        const gr = g.createLinearGradient(0, 0, 256, 160);
        gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.42, 'rgba(255,255,255,0)');
        gr.addColorStop(0.5, 'rgba(255,255,255,1)'); gr.addColorStop(0.62, 'rgba(255,255,255,0)');
        g.fillStyle = gr; g.fillRect(0, 0, 256, 160);
        return new THREE.CanvasTexture(c);
    }
}
