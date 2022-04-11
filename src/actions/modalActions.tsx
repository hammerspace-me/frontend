import { useStore } from '../store';

export const useModalActions = () => {
  const [, setStore] = useStore();

  const showTechnologyProviderModal = () => {
    setStore((old) => ({
      ...old,
      technologyProviderModal: true
    }));
  };

  const hideTechnologyProviderModal = () => {
    setStore((old) => ({
      ...old,
      technologyProviderModal: false
    }));
  };

  return { showTechnologyProviderModal, hideTechnologyProviderModal };
};
