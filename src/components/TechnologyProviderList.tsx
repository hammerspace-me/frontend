import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CustomCard from './CustomCard';
import TechnologyProviderCard from './TechnologyProviderCard';
import { TechnologyProvider } from './TechnologyProviderModal';

const styles = {
  row: {
    marginBottom: '50px'
  }
};

interface TechnologyProviderListProps {
  providers: [TechnologyProvider];
}

const TechnologyProviderList: FC<TechnologyProviderListProps> = (
  props: TechnologyProviderListProps
) => {
  return (
    <Container fluid>
      <Row xs={2} style={styles.row}>
        {props.providers.map((provider) => {
          return (
            <Col key={provider.title}>
              <TechnologyProviderCard
                description={provider.description}
                image={provider.image}
                title={provider.title}
                onClick={provider.onClick}></TechnologyProviderCard>
            </Col>
          );
        })}
        <CustomCard></CustomCard>
      </Row>
    </Container>
  );
};

export default TechnologyProviderList;
