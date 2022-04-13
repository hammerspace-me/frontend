import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import CryptoAvatarsLogo from '../assets/cryptoavatars.png';

const CryptoAvatars: FC = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <img src={CryptoAvatarsLogo} alt="CryptoAvatars Logo" width="100"></img>
        </Col>
      </Row>
      <Row>
        <Col xs={12}></Col>
      </Row>
    </>
  );
};

export default CryptoAvatars;
