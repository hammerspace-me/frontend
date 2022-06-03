import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { useModalActions } from '../actions/modalActions';

interface TechnologyProviderCardProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
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
  const { hideTechnologyProviderModal } = useModalActions();

  const onClick = () => {
    hideTechnologyProviderModal();
    props.onClick();
  };

  return (
    <Card onClick={onClick} style={styles.card}>
      <Card.Img variant="top" src={props.image} style={styles.cardImage} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TechnologyProviderCard;
