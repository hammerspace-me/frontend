import storeFactory from './store-factory';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const accessToken = cookies.get('access_token');
const userAddress = cookies.get('user_address');

export interface IApi {
  reading: boolean;
  writing: boolean;
}

export interface ISpace {
  id: string;
  items: [IItem];
}

export interface IItem {
  id: string;
  category: string;
  content: string;
  source: string;
  metadata: any;
}

export interface IStore {
  accessToken?: string;
  userAddress?: string;
  space?: ISpace;
  technologyProviderModal: boolean;
  api: IApi;
  toggleListGrid: boolean;
}

const storeDefault: IStore = {
  accessToken: accessToken,
  userAddress: userAddress,
  api: {
    reading: false,
    writing: false
  },
  space: undefined,
  technologyProviderModal: false,
  toggleListGrid: false
};

const { Provider: StoreProvider, useStore } = storeFactory<IStore>();

export { StoreProvider, useStore, storeDefault };
