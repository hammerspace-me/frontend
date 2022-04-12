import { Canvas } from '@react-three/fiber';
import { FC, Suspense, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useBackpackActions } from '../actions/backpackActions';
import { IBackpackItem, useStore } from '../store';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Scene: FC = () => {
  // TODO: pass in URL of GLTF model
  const gltf = useLoader(
    GLTFLoader,
    'https://cloudflare-ipfs.com/ipfs/bafybeibiffgffyzsferoimzsck7mmdhgezmy2cklnxnlmcz6nqqv67ecfm/default.glb'
  );
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  );
};

const BackpackItemGrid: FC = () => {
  const [store] = useStore();
  const { getBackpack, deleteBackpackItem } = useBackpackActions();

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
                camera={{ position: [2, 0, 0], near: 0.005, far: 10000, fov: 80 }}
                style={{ backgroundColor: 'white', minHeight: 200 }}>
                <ambientLight intensity={1} />
                <Scene></Scene>
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
