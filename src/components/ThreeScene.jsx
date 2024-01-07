import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeScene() {
  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-50, 90, 150);

    // Set up renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("solar").appendChild(renderer.domElement);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Create stars as particles
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });

    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Create the sun with texture
    const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
    const sunTexture = new THREE.TextureLoader().load("/public/assets/sun.jpg"); // Replace "sun.jpg" with the actual file path
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create planets with textures
    const planets = [];
    const planetTextures = [
      "/public/assets/mercury.jpg",
      "/public/assets/venus.jpg",
      "/public/assets/earth.jpg",
      "/public/assets/mars.jpg",
      "/public/assets/jupiter.jpg",
      "/public/assets/saturn.jpg", // Replace with actual path for Saturn texture
      "/public/assets/uranus.jpg", // Replace with actual path for Uranus texture
      "/public/assets/pluto.jpg",
    ];
    const textureLoader = new THREE.TextureLoader();

    for (let i = 0; i < planetTextures.length; i++) {
      const texture = textureLoader.load(planetTextures[i]);
      const planetGeometry = new THREE.SphereGeometry(5 - i, 32, 32);
      const planetMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);

      // Position planets in a circular orbit
      const angle = (i / planetTextures.length) * Math.PI * 2;
      const radius = 30 + i * 15;
      planet.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );

      planets.push({
        mesh: planet,
        angle,
        radius,
        orbitSpeed: 0.005 / (i + 1),
      });

      scene.add(planet);
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the stars for a galaxy effect
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      // Move planets around the sun
      planets.forEach((planet) => {
        planet.angle += planet.orbitSpeed;
        planet.mesh.position.set(
          Math.cos(planet.angle) * planet.radius,
          0,
          Math.sin(planet.angle) * planet.radius
        );
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures useEffect runs once after the initial render

  return <div id="solar" />;
}
