// ===== Three.js: Mobil & Gamepad 3D Hologram =====

const HOLO_COLOR = 0x4df0ff;

function makeHoloScene(containerId, buildFn) {
    const container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return null;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 4.2);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const root = buildFn(scene);
    root.position.y = -0.2;

    return { scene, camera, renderer, root, container };
}

// Material hologram: transparan + glow cyan
function holoMaterial(opacity) {
    return new THREE.MeshBasicMaterial({
        color: HOLO_COLOR,
        transparent: true,
        opacity: opacity || 0.45,
        wireframe: false,
    });
}

// Bungkus dengan wireframe luar untuk kesan hologram
function hologramWrap(group) {
    const wire = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 1.6, 1.2),
        new THREE.MeshBasicMaterial({ color: HOLO_COLOR, wireframe: true, transparent: true, opacity: 0.15 })
    );
    wire.position.y = 0.1;
    wire.visible = true;
    group.add(wire);
}

// ---------- MOBIL 3D ----------
function buildCar() {
    const group = new THREE.Group();
    const bodyMat = holoMaterial(0.5);

    // Badan bawah
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 0.6), bodyMat);
    body.position.y = 0.15;
    group.add(body);

    // Kabin
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, 0.55), holoMaterial(0.4));
    cabin.position.set(-0.05, 0.45, 0);
    group.add(cabin);

    // Roda (silinder)
    const wheelGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.08, 16);
    const wheelMat = holoMaterial(0.6);
    const wfl = new THREE.Mesh(wheelGeo, wheelMat);
    wfl.rotation.z = Math.PI / 2;
    wfl.position.set(-0.4, 0.11, 0.32);
    group.add(wfl);
    const wfr = wfl.clone();
    wfr.position.set(-0.4, 0.11, -0.32);
    group.add(wfr);
    const wbl = new THREE.Mesh(wheelGeo, wheelMat);
    wbl.rotation.z = Math.PI / 2;
    wbl.position.set(0.4, 0.11, 0.32);
    group.add(wbl);
    const wbr = wbl.clone();
    wbr.position.set(0.4, 0.11, -0.32);
    group.add(wbr);

    hologramWrap(group);
    return group;
}

// ---------- GAMEPAD 3D ----------
function buildGamepad() {
    const group = new THREE.Group();
    const bodyMat = holoMaterial(0.5);

    // Badan gamepad
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.28, 0.7), bodyMat);
    body.position.y = 0.1;
    group.add(body);

    // Grip kiri & kanan
    const gripMat = holoMaterial(0.45);
    const gripL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.45), gripMat);
    gripL.position.set(-0.5, -0.18, 0);
    gripL.rotation.x = 0.15;
    group.add(gripL);
    const gripR = gripL.clone();
    gripR.position.set(0.5, -0.18, 0);
    gripR.rotation.x = -0.15;
    group.add(gripR);

    // Tombol (bulat)
    const btnGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const btnMat = holoMaterial(0.7);
    const ba = new THREE.Mesh(btnGeo, btnMat);
    ba.position.set(0.32, 0.3, 0.3);
    group.add(ba);
    const bb = new THREE.Mesh(btnGeo, btnMat);
    bb.position.set(0.2, 0.34, 0.34);
    group.add(bb);
    const bx = new THREE.Mesh(btnGeo, btnMat);
    bx.position.set(0.42, 0.24, 0.28);
    group.add(bx);

    hologramWrap(group);
    return group;
}

// ---------- Initialize ----------
const init = () => {
    if (typeof THREE === 'undefined') return;

    const car = makeHoloScene('car3d', buildCar);
    const pad = makeHoloScene('pad3d', buildGamepad);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    window.addEventListener('mousemove', (e) => {
        pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const isMobile = window.matchMedia('(max-width: 600px)').matches;

    function animate() {
        if (car) {
            car.root.rotation.y += 0.008;
            if (!isMobile) {
                car.root.rotation.x += (pointer.ty * 0.4 - car.root.rotation.x) * 0.05;
                car.root.rotation.z += (-pointer.tx * 0.3 - car.root.rotation.z) * 0.05;
            }
            car.renderer.render(car.scene, car.camera);
        }
        if (pad) {
            pad.root.rotation.y -= 0.008;
            if (!isMobile) {
                pad.root.rotation.x += (-pointer.ty * 0.4 - pad.root.rotation.x) * 0.05;
                pad.root.rotation.z += (pointer.tx * 0.3 - pad.root.rotation.z) * 0.05;
            }
            pad.renderer.render(pad.scene, pad.camera);
        }
        requestAnimationFrame(animate);
    }
    animate();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
