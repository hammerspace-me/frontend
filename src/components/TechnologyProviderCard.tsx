import { FC } from 'react';
import ReadyPlayerMe from '../assets/readyplayerme.svg';
import CryptoAvatars from '../assets/cryptoavatars.png';
import Meebits from '../assets/meebits.svg';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useModalActions } from '../actions/modalActions';

interface TechnologyProviderCardProps {
  provider: TechnologyProvider;
}

export enum TechnologyProvider {
  ReadyPlayerMe,
  CryptoAvatars,
  Meebits
}

const styles = {
  card: {
    cursor: 'pointer'
  },
  cardImage: {
    padding: '20px'
  }
};

const TechnologyProviderCard: FC<TechnologyProviderCardProps> = (
  props: TechnologyProviderCardProps
) => {
  const navigate = useNavigate();
  const { hideTechnologyProviderModal } = useModalActions();

  const onClick = () => {
    hideTechnologyProviderModal();
    navigate(data.link);
  };

  let data = {
    image: '',
    title: '',
    category: '',
    description: '',
    link: ''
  };

  switch (props.provider) {
    case TechnologyProvider.ReadyPlayerMe:
      data = {
        image: ReadyPlayerMe,
        title: 'ReadyPlayer.Me',
        category: 'Avatar',
        description:
          'ReadyPlayer.Me is an avatar service where you can create your personalized avatar for the Metaverse.',
        link: '/readyplayerme'
      };
      break;
    case TechnologyProvider.CryptoAvatars:
      data = {
        image: CryptoAvatars,
        title: 'CryptoAvatars',
        category: 'Avatar',
        description:
          'CryptoAvatars is an avatar service where you can create your personalized avatar for the Metaverse.',
        link: ''
      };
      break;
    case TechnologyProvider.Meebits:
      data = {
        image: Meebits,
        title: 'Meebits',
        category: 'Avatar',
        description:
          'Meebits is an avatar service where you can create your personalized avatar for the Metaverse.',
        link: ''
      };
      break;
    default:
  }

  return (
    <Card onClick={onClick} style={styles.card}>
      <Card.Img variant="top" src={data.image} style={styles.cardImage} />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TechnologyProviderCard;
