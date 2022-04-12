import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useModalActions } from '../actions/modalActions';

const styles = {
  card: {
    cursor: 'pointer'
  },
  cardIcon: {
    fontSize: '100px',
    padding: '20px'
  }
};

const CustomCard: FC = () => {
  const navigate = useNavigate();
  const { hideTechnologyProviderModal } = useModalActions();

  const onClick = () => {
    hideTechnologyProviderModal();
    navigate('/item');
  };

  return (
    <Card onClick={onClick} style={styles.card}>
      <FontAwesomeIcon style={styles.cardIcon} icon={faPlusSquare} />
      <Card.Body>
        <Card.Title>Custom backpack item</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
