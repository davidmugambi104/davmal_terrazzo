// lib/threejs/environment-map.js
import * as THREE from 'three';

export const generateEnvironment = (config) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  return {
    initialize: (canvas) => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      canvas.appendChild(renderer.domElement);
      
      // Add lighting based on theme
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    },
    dispose: () => {
      renderer.dispose();
    }
  };
};