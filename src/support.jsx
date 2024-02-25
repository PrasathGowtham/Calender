import React, { Suspense, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { MeshStandardMaterial } from 'three';

// Component to load and display the 3D model
const Model = ({ modelUrl, onClick }) => {
  // Use GLTFLoader to load the 3D model
  const { scene } = useLoader(GLTFLoader, modelUrl);

  // Set up a material with an initial color
  const material = new MeshStandardMaterial({ color: 'blue' });

  // Traverse the model and apply the material to all meshes
  scene.traverse((node) => {
    if (node.isMesh) {
      node.material = material;
    }
  });

  // Ref to access the 3D model in the scene
  const modelRef = React.useRef();

//   // UseFrame to update the interaction
//   useFrame(({ mouse }) => {
//     // If the model is hovered, change its color
//     if (modelRef.current) {
//     //   const intersects = mouse && mouse.intersectsObject(modelRef.current, true);
//       material.color.set(intersects ? 'red' : 'blue');
//     }
//   });

  return <primitive object={scene} ref={modelRef} onClick={onClick} />;
};

// Main App component
function Support() {
  const [clicked, setClicked] = useState(false);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas  camera={{ position: [0, 0, 100], fov: 15 }}>
        <Suspense fallback={null}>
          {/* Use startTransition to avoid suspending during synchronous input */}
          <Model
            modelUrl="/model/quest_3.glb"
            onClick={() => setClicked((prev) => !prev)}
          />
        </Suspense>
      </Canvas>
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>
        {clicked ? 'Clicked!' : 'Hover over the model'}
      </div>
    </div>
  );
}

export default Support;
