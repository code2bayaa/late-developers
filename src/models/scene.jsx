import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { Flip, Draggable, MotionPathPlugin } from "gsap/all";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDScroll = ({ glbPath, triggerRef, settings }) => {
  const canvasRef = useRef();   // Ref for the canvas
  const divARef = useRef();     // Ref for the parent div that will trigger scrolling

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin);

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);

    // Set up the camera position
    camera.position.z = [5,5,5,5][settings.position];
    camera.position.x = [-1,-1,-1,-1][settings.position];
    camera.position.y = [1,1,1,1][settings.position];

    // Load the GLB model using the GLTFLoader
    const loader = new GLTFLoader();
    let model;
    loader.load(glbPath, (gltf) => {
      model = gltf.scene;
      // if(![2].includes(settings.position))
        model.scale.set([1.5,10,3,0.7][settings.position], [1.2,7,1,0.5][settings.position], [1.5,10,3,0.7][settings.position]);
      scene.add(model);
    });

    // Add lighting to the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 25, 5);
    scene.add(directionalLight);

    // GSAP scroll animation setup
    const scrollTrigger = gsap.to(divARef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,  // Parent div A
        start: 'top bottom',       // Start when divA hits the bottom of the viewport
        end: 'bottom top', 
        scroller:"#main-body", 
        marker:true,       // End when divA reaches the top of the viewport
        scrub: true,               // Smooth animation while scrolling
        onUpdate: (self) => {
          // Update the model's rotation based on scroll progress
          if (model) {
            const rotation = self.progress * 360; // Map scroll progress to 360 degrees
            model.rotation.y = rotation * (Math.PI / 90); // Convert degrees to radians
          }
        }
      }
    });

    // Animation loop to render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      scrollTrigger.kill(); // Clean up the scroll animation
      if (renderer) renderer.dispose(); // Clean up the WebGL renderer
    };
  }, [glbPath]);

  return (
    <div ref={divARef} style={{ height: '100%', width:"96%", backgroundColor: '#f0f0f0', zIndex:"-1" }}>
      {/* Scrollable container to trigger the scroll effect */}
      <canvas ref={canvasRef} style={{ height: '500px' }} />
    </div>
  );
};

export default ThreeDScroll;