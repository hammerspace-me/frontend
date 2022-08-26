import { useStore } from '../store';
import { useApi } from './api-factory';

export const useBackpackActions = (
  errorHandler?: (message: string) => void,
  unauthorizedHandler?: (message: string) => void
) => {
  const [store, setStore] = useStore();
  const { api } = useApi(store.accessToken, errorHandler, unauthorizedHandler);

  const getBackpack = async () => {
    try {
      setStore((old) => ({
        ...old,
        api: { ...old.api, reading: true }
      }));
      const backpack = await api.get('backpack/owner');
      setStore((old) => ({
        ...old,
        backpack: backpack,
        api: { ...old.api, reading: false }
      }));
    } catch (e) {
      setStore((old) => ({
        ...old,
        api: { ...old.api, reading: false }
      }));
    }
  };

  const deleteBackpackItem = async (id: string) => {
    try {
      setStore((old) => ({
        ...old,
        api: { ...old.api, writing: true }
      }));
      await api.remove('backpack/item/' + id);
      setStore((old) => ({
        ...old,
        api: { ...old.api, writing: false }
      }));
    } catch (e) {
      setStore((old) => ({
        ...old,
        api: { ...old.api, writing: false }
      }));
    }
  };

  return { getBackpack, deleteBackpackItem };
};
