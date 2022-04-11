import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import BackpackItemList from '../components/BackpackItemList';
import BackpackItemForm from '../components/BackpackItemForm';
import Sidebar from '../components/Sidebar';
import Applications from './Applications';
import ReadyPlayerMe from '../components/ReadyPlayerMe';
import TechnologyProviderModal from '../components/TechnologyProviderModal';

const Admin: FC = () => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col>
          <Routes>
            <Route path="/backpack" element={<BackpackItemList />} />
            <Route path="/backpack/item/:id" element={<BackpackItemForm />} />
            <Route path="/backpack/item" element={<BackpackItemForm />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/readyplayerme" element={<ReadyPlayerMe />} />
          </Routes>
        </Col>
      </Row>
      <TechnologyProviderModal />
    </>
  );
};

export default Admin;
