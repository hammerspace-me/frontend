import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AvatarConnect from '../components/AvatarConnect';
import BackpackItemForm from '../components/BackpackItemForm';
import BackpackItemListGrid from '../components/BackpackItemListGrid';
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
            <Route path="/avatarconnect" element={<AvatarConnect />} />
          </Routes>
        </Col>
      </Row>
      <TechnologyProviderModal />
    </>
  );
};

export default Backpack;
