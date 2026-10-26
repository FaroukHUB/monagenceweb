/* mon-agenceweb.fr — V3 scène 3D (Three.js) : noyau iridescent, anneaux et particules */
import * as THREE from 'three';

const root = document.documentElement;
const canvas = document.getElementById('gl');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = Math.min(window.innerWidth, window.innerHeight) < 700 || window.innerWidth < 760;

let renderer;
try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' });
} catch (e) {
    root.classList.add('no-webgl');
}

if (renderer) init();

function init() {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const world = new THREE.Group();
    scene.add(world);

    // ---------- Noyau iridescent (sphère déformée par du bruit) ----------
    const noise = /* glsl */`
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
        const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
        vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
        i=mod289(i);
        vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
        float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
        vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
        vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
        return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

    const blobMat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            uTime: { value: 0 },
            uDistort: { value: 0.32 },
            uFreq: { value: 1.15 },
            uMouse: { value: new THREE.Vector2() },
            uAlpha: { value: 1 }
        },
        vertexShader: /* glsl */`
            uniform float uTime; uniform float uDistort; uniform float uFreq; uniform vec2 uMouse;
            varying vec3 vNrm; varying vec3 vView; varying float vN;
            ${noise}
            float R;
            vec3 displaced(vec3 dir, out float base){
                float n = snoise(dir * uFreq + vec3(uTime * 0.18, uTime * 0.12, uMouse.x * 0.6));
                float n2 = snoise(dir * uFreq * 2.6 - vec3(0.0, uTime * 0.25, uMouse.y * 0.6)) * 0.35;
                base = n;
                return dir * (R + (n + n2) * uDistort);
            }
            void main(){
                R = length(position);
                vec3 dir = normalize(position);
                vec3 tg = normalize(cross(dir, abs(dir.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0)));
                vec3 bt = cross(dir, tg);
                float e = 0.012, b0, b1, b2;
                vec3 p0 = displaced(dir, b0);
                vec3 p1 = displaced(normalize(dir + tg * e), b1);
                vec3 p2 = displaced(normalize(dir + bt * e), b2);
                vec3 nrm = normalize(cross(p1 - p0, p2 - p0));
                if (dot(nrm, dir) < 0.0) nrm = -nrm;
                vN = b0;
                vNrm = normalize(normalMatrix * nrm);
                vec4 mv = modelViewMatrix * vec4(p0, 1.0);
                vView = -mv.xyz;
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: /* glsl */`
            uniform float uTime; uniform float uAlpha;
            varying vec3 vNrm; varying vec3 vView; varying float vN;
            vec3 pal(float t){
                vec3 a = vec3(0.545,0.361,0.965);  // violet
                vec3 b = vec3(0.231,0.510,0.965);  // bleu
                vec3 c = vec3(0.133,0.827,0.933);  // cyan
                vec3 d = vec3(0.957,0.447,0.714);  // rose
                t = fract(t);
                if (t < 0.25) return mix(a, b, t / 0.25);
                if (t < 0.5) return mix(b, c, (t - 0.25) / 0.25);
                if (t < 0.75) return mix(c, d, (t - 0.5) / 0.25);
                return mix(d, a, (t - 0.75) / 0.25);
            }
            void main(){
                vec3 n = normalize(vNrm);
                vec3 v = normalize(vView);
                float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.2);
                vec3 L = normalize(vec3(0.6, 0.8, 0.7));
                float diff = clamp(dot(n, L), 0.0, 1.0);
                float spec = pow(clamp(dot(reflect(-L, n), v), 0.0, 1.0), 48.0);
                float t = dot(n, vec3(0.35, 0.55, 0.2)) * 0.9 + vN * 0.35 + uTime * 0.04;
                vec3 iri = pal(t);
                vec3 core = vec3(0.035, 0.025, 0.09);
                vec3 col = mix(core, iri * 0.55, diff * 0.55);
                col += iri * fres * 1.35;
                col += vec3(1.0) * spec * 0.9;
                gl_FragColor = vec4(col, uAlpha);
            }`
    });

    const detail = small ? 40 : 72;
    const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, detail), blobMat);
    world.add(blob);

    // ---------- Anneaux ----------
    const ringGroup = new THREE.Group();
    const ringMat = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.012, 12, 220), ringMat(0xa78bfa, 0.75));
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.95, 0.008, 12, 220), ringMat(0x22d3ee, 0.5));
    ring1.rotation.set(1.25, 0.2, 0);
    ring2.rotation.set(1.1, -0.45, 0.3);
    ringGroup.add(ring1, ring2);

    // Petits satellites sur l'anneau
    const satGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const sats = [];
    [[ring1, 0xffffff, 0], [ring1, 0xf472b6, Math.PI], [ring2, 0x22d3ee, 1.4]].forEach(([r, c, a]) => {
        const s = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: c, transparent: true }));
        s.userData = { ring: r, a, rad: r.geometry.parameters.radius };
        r.add(s); sats.push(s);
    });
    world.add(ringGroup);

    // ---------- Particules ----------
    const count = small ? 700 : 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const palette = [new THREE.Color(0xa78bfa), new THREE.Color(0x22d3ee), new THREE.Color(0xffffff), new THREE.Color(0xf472b6), new THREE.Color(0x60a5fa)];
    for (let i = 0; i < count; i++) {
        const r = 4 + Math.random() * 14;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 1.6;
        pos[i * 3 + 2] = r * Math.cos(ph) - 4;
        const c = palette[(Math.random() * palette.length) | 0];
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        size[i] = Math.random() * 1.6 + 0.4;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    pGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    const pMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
        uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
        vertexShader: /* glsl */`
            attribute float aSize; uniform float uTime; uniform float uPR; varying vec3 vColor; varying float vTw;
            void main(){
                vColor = color;
                vec3 p = position;
                p.y += sin(uTime * 0.3 + position.x) * 0.15;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                vTw = 0.55 + 0.45 * sin(uTime * 1.5 + position.z * 3.0 + position.x);
                gl_PointSize = aSize * uPR * (26.0 / -mv.z);
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: /* glsl */`
            varying vec3 vColor; varying float vTw;
            void main(){
                float d = length(gl_PointCoord - 0.5);
                float a = smoothstep(0.5, 0.0, d);
                gl_FragColor = vec4(vColor, a * a * vTw * 0.9);
            }`
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // ---------- Placement selon l'écran ----------
    const layout = { x: 0, y: 0, s: 1, edge: 0 };
    function place() {
        const w = window.innerWidth, h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        // Largeur visible à z=0
        const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        const visW = visH * camera.aspect;
        if (w > 1080) { layout.x = visW * 0.22; layout.y = 0.15; layout.s = 1; }
        else if (w > 640) { layout.x = visW * 0.2; layout.y = visH * 0.22; layout.s = 0.8; }
        else { layout.x = visW * 0.3; layout.y = visH * 0.34; layout.s = 0.52; }
        // À z = -3.5 le champ visible est ~1.39× plus large : 0.7 ≈ demi-sphère hors écran
        layout.edge = visW * 0.7;
    }
    place();
    window.addEventListener('resize', place);

    // ---------- Souris & scroll ----------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener('pointermove', (e) => {
        mouse.tx = e.clientX / window.innerWidth - 0.5;
        mouse.ty = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
    // Gyroscope sur mobile (si autorisé sans demande)
    window.addEventListener('deviceorientation', (e) => {
        if (e.gamma == null) return;
        mouse.tx = THREE.MathUtils.clamp(e.gamma / 45, -0.5, 0.5);
        mouse.ty = THREE.MathUtils.clamp((e.beta - 45) / 60, -0.5, 0.5);
    }, { passive: true });

    let scrollP = 0, scrollS = 0, lastScroll = window.scrollY, velo = 0;

    const clock = new THREE.Clock();
    let running = true;
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) loop(); });

    function smooth(e0, e1, x) { const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }

    function loop() {
        if (!running) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = reduce ? 4 : clock.elapsedTime;

        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;

        const sy = window.scrollY;
        velo += ((sy - lastScroll) - velo) * 0.1;
        lastScroll = sy;
        scrollP = sy / window.innerHeight;
        scrollS += (scrollP - scrollS) * 0.08;

        // Après le hero : le noyau recule, se décale et devient une présence d'ambiance
        const out = smooth(0.2, 1.4, scrollS);
        // Il passe d'un bord à l'autre au fil des sections : il s'éteint pendant la bascule, jamais sous le texte
        const side = Math.cos(Math.max(0, scrollS - 0.6) * 0.45);
        const fadeK = THREE.MathUtils.lerp(1, Math.min(1, Math.abs(side) * 3), out) * (1 - (window.__studioCover || 0));
        const x = THREE.MathUtils.lerp(layout.x, layout.edge * (side >= 0 ? 1 : -1), out);
        const y = THREE.MathUtils.lerp(layout.y, 0.4, out);
        const s = layout.s * THREE.MathUtils.lerp(1, 0.85, out) * (0.35 + 0.65 * fadeK);
        world.visible = fadeK > 0.02;

        world.position.set(x + mouse.x * 0.35, y - mouse.y * 0.3, THREE.MathUtils.lerp(0, -3.5, out));
        world.scale.setScalar(s);
        blob.rotation.y = t * 0.12 + mouse.x * 0.8 + scrollS * 0.9;
        blob.rotation.x = t * 0.07 + mouse.y * 0.6;
        blobMat.uniforms.uTime.value = t;
        blobMat.uniforms.uMouse.value.set(mouse.x, mouse.y);
        blobMat.uniforms.uDistort.value = 0.3 + Math.min(Math.abs(velo) * 0.004, 0.25) + Math.abs(mouse.x) * 0.1;
        blobMat.uniforms.uAlpha.value = THREE.MathUtils.lerp(1, 0.4, out) * fadeK;

        ringGroup.rotation.z = t * 0.08 + scrollS * 0.6;
        ringGroup.rotation.x = mouse.y * 0.4;
        ringGroup.rotation.y = mouse.x * 0.5;
        ring1.material.opacity = THREE.MathUtils.lerp(0.75, 0.3, out) * fadeK;
        ring2.material.opacity = THREE.MathUtils.lerp(0.5, 0.2, out) * fadeK;
        sats.forEach((s2, i) => {
            const a = s2.userData.a + t * (0.5 + i * 0.15);
            s2.position.set(Math.cos(a) * s2.userData.rad, Math.sin(a) * s2.userData.rad, 0);
            s2.material.opacity = fadeK;
        });

        points.rotation.y = t * 0.015 + mouse.x * 0.15;
        points.rotation.x = mouse.y * 0.1;
        points.position.y = scrollS * 1.2;
        pMat.uniforms.uTime.value = t;

        renderer.render(scene, camera);
        if (!reduce) requestAnimationFrame(loop);
        else setTimeout(() => requestAnimationFrame(loop), 120);
    }
    loop();
}
