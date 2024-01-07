import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const loadTexture = (url) => {
  const textureLoader = new THREE.TextureLoader();
  return textureLoader.load(url);
};

const PlanetDetail = ({ planet }) => {
  useEffect(() => {
    let renderer, camera, controls, scene, planetMesh;

    const initPlanetDetail = async () => {
      scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer();

      const aspectRatio = window.innerWidth / window.innerHeight;
      const size = Math.min(window.innerWidth, window.innerHeight);

      renderer.setSize(size, size);
      document.getElementById("planetDetails").appendChild(renderer.domElement);
      renderer.setPixelRatio(window.devicePixelRatio);

      camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
      camera.position.set(0, 0, 5); // Move the camera backward along the z-axis
      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 1.12;
      controls.maxDistance = 10;

      // Create planet
      const planetTexture = loadTexture(`/public/assets/${planet}.jpg`);
      const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
      const planetMaterial = new THREE.MeshBasicMaterial({
        map: planetTexture,
        transparent: false,
        opacity: 1,
      });
      planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
      scene.add(planetMesh);

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

      const animate = () => {
        requestAnimationFrame(animate);
        // Rotate the stars for a galaxy effect
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;
        planetMesh.rotation.y += 0.005; // Adjust the rotation speed as needed
        renderer.render(scene, camera);
      };

      animate();
    };

    initPlanetDetail();

    const handleResize = () => {
      const newSize = Math.min(window.innerWidth, window.innerHeight);
      renderer.setSize(newSize, newSize);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (controls) controls.dispose();
      if (renderer) renderer.dispose();
    };
  }, [planet]);

  return null;
};

export default PlanetDetail;
