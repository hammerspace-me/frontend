import { useStore } from '../store';
import { useApi } from './api-factory';

export const useHammerspaceActions = (
  errorHandler?: (message: string) => void,
  unauthorizedHandler?: (message: string) => void
) => {
  const [store, setStore] = useStore();
  const { api } = useApi(store.accessToken, errorHandler, unauthorizedHandler);

  const getSpace = async () => {
    try {
      setStore((old) => ({
        ...old,
        api: { ...old.api, reading: true }
      }));
      const space = await api.get('space/owner');
      setStore((old) => ({
        ...old,
        space: space,
        api: { ...old.api, reading: false }
      }));
    } catch (e) {
      setStore((old) => ({
        ...old,
        api: { ...old.api, reading: false }
      }));
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setStore((old) => ({
        ...old,
        api: { ...old.api, writing: true }
      }));
      await api.remove('space/item/' + id);
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

  return { getSpace, deleteItem };
};
