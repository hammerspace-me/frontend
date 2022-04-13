import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import BackpackItemForm from '../components/BackpackItemForm';
import BackpackItemListGrid from '../components/BackpackItemListGrid';
import CryptoAvatars from '../components/CryptoAvatars';
import Meebits from '../components/Meebits';
import ReadyPlayerMe from '../components/ReadyPlayerMe';
import TechnologyProviderModal from '../components/TechnologyProviderModal';

const Backpack: FC = () => {
  return (
    <>
      <Row>
        <Col>
          <Routes>
            <Route path="*" element={<BackpackItemListGrid />} />
            <Route path="/item/:id" element={<BackpackItemForm />} />
            <Route path="/item" element={<BackpackItemForm />} />
            <Route path="/readyplayerme" element={<ReadyPlayerMe />} />
            <Route path="/cryptoavatars" element={<CryptoAvatars />} />
            <Route path="/meebits" element={<Meebits />} />
          </Routes>
        </Col>
      </Row>
      <TechnologyProviderModal />
    </>
  );
};

export default Backpack;
