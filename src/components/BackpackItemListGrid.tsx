import { FC } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { useModalActions } from '../actions/modalActions';
import { useStore } from '../store';
import BackpackItemGrid from './BackpackItemGrid';
import BackpackItemList from './BackpackItemList';

const BackpackItemListGrid: FC = () => {
  const [store, setStore] = useStore();
  const { showTechnologyProviderModal } = useModalActions();
  const toggleListGridView = () => {
    setStore((old) => ({ ...old, toggleListGrid: !old.toggleListGrid }));
  };

  const onCreate = async () => {
    showTechnologyProviderModal();
  };

  return (
    <>
      <Row>
        <Col xs={6} style={{ marginTop: '40px', marginBottom: '40px' }}>
          <Button onClick={onCreate}>Add Backpack item</Button>
        </Col>
        <Col xs={6} style={{ textAlign: 'right', marginTop: '40px', marginBottom: '40px' }}>
          <ButtonGroup>
            <Button
              active={!store.toggleListGrid}
              disabled={!store.toggleListGrid}
              onClick={toggleListGridView}
              variant="secondary">
              Grid
            </Button>
            <Button
              active={store.toggleListGrid}
              disabled={store.toggleListGrid}
              onClick={toggleListGridView}
              variant="secondary">
              List
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      {store.toggleListGrid ? <BackpackItemList /> : <BackpackItemGrid />}
    </>
  );
};

export default BackpackItemListGrid;
