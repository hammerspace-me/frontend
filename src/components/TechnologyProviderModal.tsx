import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { useModalActions } from '../actions/modalActions';
import { useStore } from '../store';
import TechnologyProviderList from './TechnologyProviderList';
import AvatarConnectLogo from '../assets/avatarconnect.svg';
import { useNavigate } from 'react-router-dom';

export interface TechnologyProvider {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}

const TechnologyProviderModal: FC = () => {
  const [store] = useStore();
  const { hideTechnologyProviderModal } = useModalActions();
  const navigate = useNavigate();

  const providers: [TechnologyProvider] = [
    {
      title: 'AvatarConnect',
      description:
        'AvatarConnect allows you to add your Ready Player Me, Meebits or CryptoAvatars avatar to Backpack.',
      onClick: () => {
        navigate('/avatarconnect');
      },
      image: AvatarConnectLogo
    }
  ];

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
        <TechnologyProviderList providers={providers} />
      </Modal.Body>
    </Modal>
  );
};

export default TechnologyProviderModal;
