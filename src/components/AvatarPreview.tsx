import { Canvas, useFrame } from '@react-three/fiber';
import { FC, Suspense, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM, VRMSchema, VRMUtils } from '@pixiv/three-vrm';
import { PerspectiveCamera, Vector3 } from 'three';

interface AvatarPreviewProps {
  avatarUri: string;
}

const AvatarPreview: FC<AvatarPreviewProps> = (props: AvatarPreviewProps) => {
  const extractFileFormat = (uri: string) => {
    return uri.split(/[#?]/)[0].split('.')?.pop()?.trim();
  };

  const avatarFormat = extractFileFormat(props.avatarUri);

  if (avatarFormat === 'vrm') {
    return <VRMAvatar avatarUri={props.avatarUri}></VRMAvatar>;
  }

  return <GLTFAvatar avatarUri={props.avatarUri}></GLTFAvatar>;
};

const GLTFAvatar: FC<AvatarPreviewProps> = (props: AvatarPreviewProps) => {
  const gltf = useLoader(GLTFLoader, props.avatarUri);
  return (
    <Canvas
      camera={{
        position: [0, 1.6, 2],
        rotation: [0, 0, 0],
        aspect: 1,
        near: 0.01,
        far: 1000,
        fov: 50,
        zoom: 3
      }}
      style={{ backgroundColor: 'white', height: 280 }}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <primitive object={gltf.scene} />
      </Suspense>
    </Canvas>
  );
};

const VRMAvatar: FC<AvatarPreviewProps> = (props: AvatarPreviewProps) => {
  const gltf = useLoader(GLTFLoader, props.avatarUri);
  const [position, setPosition] = useState<Vector3>();
  const camera = new PerspectiveCamera(30.0, 320 / 280, 0.01, 20.0);

  const ChangeCamera = () => {
    useFrame((state) => {
      if (position) {
        state.camera.position.set(position?.x, position?.y, position?.z);
        state.camera.updateProjectionMatrix();
      }
    });
    return null;
  };

  useEffect(() => {
    if (gltf) {
      VRM.from(gltf as unknown as GLTF).then((vrm) => {
        const head = vrm?.humanoid?.getBoneNode('head' as VRMSchema.HumanoidBoneName);
        if (head) {
          const headPosition = new Vector3(0.0, head.getWorldPosition(new Vector3()).y, 1);
          setPosition(headPosition);
        }
      });
    } else {
      const defaultPosition = new Vector3(0.0, 1.4, 5);
      setPosition(defaultPosition);
    }
  }, [gltf]);

  return (
    <Canvas style={{ backgroundColor: 'white', height: 280 }} camera={camera}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <primitive object={gltf.scene} />
      </Suspense>
      <ChangeCamera />
    </Canvas>
  );
};

export default AvatarPreview;
