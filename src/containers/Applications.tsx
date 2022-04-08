import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReadyPlayerMe from '../assets/rpm.png';

const Applications: FC = () => {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={ReadyPlayerMe} />
        <Card.Body>
          <Card.Title>ReadyPlayer.Me</Card.Title>
          <Card.Text>
            ReadyPlayer.Me is an avatar service where you can create your personalized avatar for
            the Metaverse.
          </Card.Text>
          <Link to="/admin/applications/readyplayerme">Add avatar</Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default Applications;
