import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import BackpackList from '../components/BackpackList';
import BackpackItemForm from '../components/BackpackItemForm';
import Sidebar from '../components/Sidebar';
import Applications from './Applications';
import ReadyPlayerMe from '../components/ReadyPlayerMe';

const Admin: FC = () => {
  return (
    <Row>
      <Col xs={3}>
        <Sidebar />
      </Col>
      <Col>
        <Routes>
          <Route path="/backpack" element={<BackpackList />} />
          <Route path="/backpack/item/:id" element={<BackpackItemForm />} />
          <Route path="/backpack/item" element={<BackpackItemForm />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/readyplayerme" element={<ReadyPlayerMe />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default Admin;
