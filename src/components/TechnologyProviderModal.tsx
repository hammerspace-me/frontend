import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { useModalActions } from '../actions/modalActions';
import { useStore } from '../store';
import TechnologyProviderList from './TechnologyProviderList';

const TechnologyProviderModal: FC = () => {
  const [store] = useStore();
  const { hideTechnologyProviderModal } = useModalActions();

  return (
    <Modal
      size="lg"
      centered
      show={store.technologyProviderModal}
      onHide={hideTechnologyProviderModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new backpack item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TechnologyProviderList />
      </Modal.Body>
    </Modal>
  );
};

export default TechnologyProviderModal;
