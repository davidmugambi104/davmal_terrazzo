import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RealTimeRender({ resolution, qualityPreset }) {
  const mountRef = useRef();
  const rendererRef = useRef(null); // Track renderer instance

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.offsetWidth / mountRef.current.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    rendererRef.current = renderer; // Store renderer instance

    renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
