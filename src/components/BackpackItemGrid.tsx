import { Canvas } from '@react-three/fiber';
import { FC, Suspense, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useBackpackActions } from '../actions/backpackActions';
import { useStore } from '../store';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface ModelProps {
  modelUrl: string;
}

const Model: FC<ModelProps> = (props: ModelProps) => {
  // TODO: pass in URL of GLTF model
  const gltf = useLoader(GLTFLoader, props.modelUrl);
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  );
};

const BackpackItemGrid: FC = () => {
  const [store] = useStore();
  const { getBackpack } = useBackpackActions();

  useEffect(() => {
    getBackpack();
  }, []);

  /*const onDelete = async (item: IBackpackItem) => {
    await deleteBackpackItem(item.content);
    getBackpack();
  };*/

  return store.backpack ? (
    <Row>
      {store.backpack?.backpackItems.map((item) => (
        <Col xs={6} key={item.content} style={{ marginBottom: '20px' }}>
          <Card>
            <Card.Body>
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
                style={{ backgroundColor: 'white', minHeight: 280 }}>
                <ambientLight intensity={1} />
                <Model
                  modelUrl={'https://cloudflare-ipfs.com/ipfs/' + item.content + '/default.glb'}
                />
              </Canvas>
              <Card.Title>{item.content}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.source}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <h1>No backpack found.</h1>
  );
};

export default BackpackItemGrid;
