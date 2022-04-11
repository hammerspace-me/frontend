import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CustomCard from './CustomCard';
import TechnologyProviderCard, { TechnologyProvider } from './TechnologyProviderCard';

const styles = {
  row: {
    marginBottom: '50px'
  }
};

const TechnologyProviderList: FC = () => {
  return (
    <Container fluid>
      <Row xs={3} style={styles.row}>
        <Col>
          <TechnologyProviderCard
            provider={TechnologyProvider.ReadyPlayerMe}></TechnologyProviderCard>
        </Col>
        <Col>
          <TechnologyProviderCard
            provider={TechnologyProvider.CryptoAvatars}></TechnologyProviderCard>
        </Col>
        <Col>
          <TechnologyProviderCard provider={TechnologyProvider.Meebits}></TechnologyProviderCard>
        </Col>
      </Row>
      <Row xs={3} style={styles.row}>
        <Col>
          <CustomCard></CustomCard>
        </Col>
      </Row>
    </Container>
  );
};

export default TechnologyProviderList;
