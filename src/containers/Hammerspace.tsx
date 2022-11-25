import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import SpaceItemForm from '../components/SpaceItemForm';
import SpaceGrid from '../components/SpaceGrid';
import Header from '../components/Header';
import TechnologyProviderModal from '../components/TechnologyProviderModal';
import ReadyPlayerMe from '../components/providers/ReadyPlayerMe';
import CryptoAvatars from '../components/providers/CryptoAvatars';
import Meebits from '../components/providers/Meebits';

const Hammerspace: FC = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="*" element={<SpaceGrid />} />
          <Route path="/item/:id" element={<SpaceItemForm />} />
          <Route path="/item" element={<SpaceItemForm />} />
          <Route path="/readyplayerme" element={<ReadyPlayerMe />} />
          <Route path="/cryptoavatars" element={<CryptoAvatars />} />
          <Route path="/meebits" element={<Meebits />} />
        </Routes>
      </div>
      <TechnologyProviderModal />
    </>
  );
};

export default Hammerspace;
