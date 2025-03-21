// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl-container').appendChild(renderer.domElement);
document.addEventListener("DOMContentLoaded", () => {
    // Hide loader after page loads
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 500);
    }, 1500); // Loader visible for at least 1.5 seconds

    // Smooth page transition with loader
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Stop immediate navigation

            const targetPage = event.target.href;
            document.getElementById("loader").style.display = "flex";
            document.getElementById("loader").style.opacity = "1"; // Show loader

            setTimeout(() => {
                window.location.href = targetPage; // Navigate after effect
            }, 1500); // Delay for smooth transition
        });
    });
});



// Create a black cube with different text on each side
function createTextTexture(text) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 512;

    // Black background
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // White text
    ctx.fillStyle = "white";
    ctx.font = "Bold 40px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    return new THREE.CanvasTexture(canvas);
}

// Cube text faces
const cubeTexts = [
    "Website Developer",
    "Game Developer",
    "Gamer",
    "Tech Enthusiast",
    "Developer",
    "Hacker"
];

// Create cube with emissive effect
const geometry = new THREE.BoxGeometry(2, 2, 2);
const materials = cubeTexts.map(text => new THREE.MeshStandardMaterial({
    map: createTextTexture(text),
    transparent: true,
    opacity: 1,
    emissive: new THREE.Color(0xff0000),
    emissiveIntensity: 1.5
}));

const cube = new THREE.Mesh(geometry, materials);
cube.position.set(0, 0, 0); // Set cube at the center
scene.add(cube);

// Lighting setup
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Adjust camera to ensure the cube is centered
camera.position.z = 5;

// RGB Lightning effect
let time = 0;
function animate() {
    requestAnimationFrame(animate);

    // Rotate cube slowly
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Slow RGB color transitions
    time += 0.05;
    let r = Math.abs(Math.sin(time * 0.5)); 
    let g = Math.abs(Math.sin(time * 0.6)); 
    let b = Math.abs(Math.sin(time * 0.7)); 
    let rgbColor = new THREE.Color(r, g, b);

    // Apply emissive glow
    materials.forEach(material => {
        material.emissive = rgbColor;
        material.emissiveIntensity = Math.abs(Math.sin(time * 2)) * 0.5;
    });

    renderer.render(scene, camera);
}

animate();

// Resize event
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
