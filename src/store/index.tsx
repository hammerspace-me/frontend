import storeFactory from './store-factory';
import Cookies from 'universal-cookie';
import AvatarConnect, { BridgeResult } from '@avatarconnect/sdk';

const cookies = new Cookies();
const accessToken = cookies.get('access_token');
const userAddress = cookies.get('user_address');

const avatarConnectBridge = new AvatarConnect(
  [
    // @ts-expect-error: AvatarConnect expects weird type
    ['ready-player-me', { gateway: 'mona' }],
    [
      // @ts-expect-error: AvatarConnect expects weird type
      'crypto-avatars',
      {
        // @ts-expect-error: AvatarConnect expects weird type
        apiKey: '$2b$10$Enqof4ligHNFwhHmToH3ROhwrEXQ/XgDyKeM78CAt0MPN4EsHSGHO',
        // @ts-expect-error: AvatarConnect expects weird type
        address: '0xd36c25d4a1c0216caaa1f88c9c7ef6c220c9e710'
      }
    ],
    // @ts-expect-error: AvatarConnect expects weird type
    'meebits'
  ],
  { maxHeight: 610 }
);

export interface IApi {
  reading: boolean;
  writing: boolean;
}

export interface IBackpack {
  id: string;
  backpackItems: [IBackpackItem];
}

export interface IBackpackItem {
  id: string;
  category: string;
  content: string;
  source: string;
}

export interface IAvatarConnect {
  bridge: AvatarConnect;
  open: boolean;
  latestResult?: BridgeResult;
}

export interface IStore {
  accessToken?: string;
  userAddress?: string;
  backpack?: IBackpack;
  technologyProviderModal: boolean;
  api: IApi;
  toggleListGrid: boolean;
  avatarConnect: IAvatarConnect;
}

const storeDefault: IStore = {
  accessToken: accessToken,
  userAddress: userAddress,
  api: {
    reading: false,
    writing: false
  },
  backpack: undefined,
  technologyProviderModal: false,
  toggleListGrid: false,
  avatarConnect: {
    bridge: avatarConnectBridge,
    open: false,
    latestResult: undefined
  }
};

const { Provider: StoreProvider, useStore } = storeFactory<IStore>();

export { StoreProvider, useStore, storeDefault };
