import { useEffect, useRef } from "react";
import * as THREE from "three";

function loadTexture(url) {
  const loader = new THREE.TextureLoader();
  return new Promise((resolve) => loader.load(url, resolve));
}

export default function ChoosedPlanet({ planet }) {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();

    // Stars Component
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
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

    // Planet Component
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const init = async () => {
      const planetTexture = await loadTexture(`/public/assets/${planet}.jpg`);
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        map: planetTexture,
        transparent: true,
      });
      const planetMesh = new THREE.Mesh(sphereGeometry, material);
      scene.add(planetMesh);

      // Add Rings (e.g., for Saturn)
      if (planet === "saturn") {
        const ringGeometry = new THREE.RingGeometry(1.5, 2.5, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
          map: await loadTexture("/public/assets/saturn_ring.png"),
          side: THREE.DoubleSide,
          transparent: true,
        });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = Math.PI / 2; // Adjust rotation if needed
        scene.add(ringMesh);
      }

      // Adjust camera position
      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the planet
        planetMesh.rotation.x += 0.005;
        planetMesh.rotation.y += 0.005;

        // Rotate the stars for a galaxy effect
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;

        renderer.render(scene, camera);
      };

      animate();
    };

    init();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [planet]);

  return <div ref={canvasRef} id="choosed" />;
}
