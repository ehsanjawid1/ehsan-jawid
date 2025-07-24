// --- Basic Three.js Setup ---

const container = document.getElementById('threejs-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0); // شفاف
container.appendChild(renderer.domElement);

// نورپردازی
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// مدل: یک جعبه ساده به عنوان جایگزین تصویر 3D شما
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x6e8efb, roughness: 0.3, metalness: 0.7 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ردیابی حرکت موس
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

function onMouseMove(event) {
    const rect = container.getBoundingClientRect();
    mouseX = (event.clientX - rect.left) / rect.width;
    mouseY = (event.clientY - rect.top) / rect.height;

    // تبدیل موقعیت موس به زاویه چرخش
    targetRotationY = (mouseX - 0.5) * Math.PI;  // چرخش حول محور Y
    targetRotationX = (mouseY - 0.5) * Math.PI;  // چرخش حول محور X
}

container.addEventListener('mousemove', onMouseMove);

function animate() {
    requestAnimationFrame(animate);

    // حرکت نرم به سمت هدف
    cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05;
    cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05;

    renderer.render(scene, camera);
}

animate();

// تغییر سایز رندر هنگام تغییر سایز پنجره یا کانتینر
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// اسکرول به بخش ها
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

