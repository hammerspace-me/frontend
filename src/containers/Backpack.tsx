import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import AvatarConnect from '../components/AvatarConnect';
import BackpackItemForm from '../components/BackpackItemForm';
import BackpackGrid from '../components/BackpackGrid';
import Header from '../components/Header';
import TechnologyProviderModal from '../components/TechnologyProviderModal';
import ReadyPlayerMe from '../components/providers/ReadyPlayerMe';
import CryptoAvatars from '../components/providers/CryptoAvatars';
import Meebits from '../components/providers/Meebits';

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
          <Route path="/readyplayerme" element={<ReadyPlayerMe />} />
          <Route path="/cryptoavatars" element={<CryptoAvatars />} />
          <Route path="/meebits" element={<Meebits />} />
        </Routes>
      </div>
      <TechnologyProviderModal />
    </>
  );
};

export default Backpack;
