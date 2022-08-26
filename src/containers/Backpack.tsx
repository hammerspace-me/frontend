import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AvatarConnect from '../components/AvatarConnect';
import BackpackItemForm from '../components/BackpackItemForm';
import BackpackGrid from '../components/BackpackGrid';
import Header from '../components/Header';
import TechnologyProviderModal from '../components/TechnologyProviderModal';

const Backpack: FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="*" element={<BackpackGrid />} />
          <Route path="/item/:id" element={<BackpackItemForm />} />
          <Route path="/item" element={<BackpackItemForm />} />
          <Route path="/avatarconnect" element={<AvatarConnect />} />
        </Routes>
      </div>
      <TechnologyProviderModal />
    </>
  );
};

export default Backpack;
