import React from 'react';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import MeebitsLogo from '../assets/meebits.svg';

const CALLBACK_URL = 'http://localhost:3001/meebits';

const MEEBITS_ACCESS_REQUEST =
  'https://meebits.larvalabs.com/meebits/apiAccessRequest?callbackUrl=';

//const MEEBITS_API = 'https://meebits.larvalabs.com/api/v1/account/';

const Meebits: FC = () => {
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();

  if (query.get('errorMessage')) {
    return <h1>Error occured {query.get('errorMessage')} </h1>;
  }

  if (query.get('account') && query.get('accessToken')) {
    return <h1>Received account and accessToken</h1>;
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <img src={MeebitsLogo} alt="Meebits Logo" width="100"></img>
        </Col>
      </Row>
      <Row style={{ marginTop: 50 }}>
        <Col xs={12}>
          <a className="btn btn-primary" href={MEEBITS_ACCESS_REQUEST + CALLBACK_URL}>
            Grant access to Meebits
          </a>
        </Col>
      </Row>
    </>
  );
};

export default Meebits;
