import { FC, useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../actions/api-factory';
import { useStore } from '../store';
import AvatarConnectLogo from '../assets/avatarconnect.svg';
import { BridgeResult } from '@avatarconnect/sdk';
import AvatarPreview from './AvatarPreview';
import { AvatarErrorBoundary } from './AvatarErrorBoundary';
import { sourceMapping } from '../utils/sourceMapping';

const AvatarConnect: FC = () => {
  const [store] = useStore();
  const [error, setError] = useState<string>();
  const errorHandler = (message: string) => {
    setError(message);
  };
  const { api } = useApi(store.accessToken, errorHandler);
  const [bridgeResult, setBridgeResult] = useState<BridgeResult>();
  const [uploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    store.avatarConnect.bridge.enable();
    store.avatarConnect.bridge.on('result', (result: BridgeResult) => {
      handleBridgeResult(result);
    });

    return () => {
      store.avatarConnect.bridge.disable();
    };
  }, [store.avatarConnect.bridge]);

  const handleBridgeResult = (result: BridgeResult) => {
    // replace Pinata gateway with Cloudflare as gateway has rate limits and CORS problems
    const replacedUrl = result.avatar.uri.replace(
      'https://gateway.pinata.cloud/ipfs/',
      process.env.REACT_APP_IPFS_GATEWAY || 'https://nftstorage.link/ipfs/'
    );
    result.avatar.uri = replacedUrl;
    setBridgeResult(result);
  };

  const extractFilename = (uri: string) => {
    return uri
      .split(/[#?]/)[0]
      .substring(uri.lastIndexOf('/') + 1)
      .split('.')[0];
  };

  const uploadToBackpack = async () => {
    setUploading(true);
    if (bridgeResult) {
      const base64 = await getBase64FromUrl(bridgeResult.avatar.uri);

      const data = {
        file: base64,
        filename: extractFilename(bridgeResult.avatar.uri),
        fileExtension: bridgeResult.avatar.format,
        source: 'avatar-connect-' + bridgeResult.provider,
        category: 'avatar',
        metadata: {
          format: bridgeResult.avatar.format,
          type: bridgeResult.avatar.type,
          ...(bridgeResult.metadata as Record<string, unknown>)
        }
      };
      await api.post('/backpack/item/file', data);
      navigate('/');
    }
    setUploading(false);
  };

  const getBase64FromUrl = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  return (
    <>
      <img src={AvatarConnectLogo} alt="AvatarConnect Logo" className="w-40"></img>
      {bridgeResult ? (
        <>
          <div className="p-4 w-full max-w-lg bg-white rounded-lg border shadow-md sm:p-6 mt-6 mb-6">
            <AvatarErrorBoundary>
              <AvatarPreview avatarUri={bridgeResult.avatar.uri} />
            </AvatarErrorBoundary>
            <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">
              {sourceMapping[bridgeResult.provider]}
            </h5>
            <span className="text-base text-gray-600 font-semibold break-words">
              {bridgeResult.avatar.uri}
            </span>
          </div>
          <div>
            {error ? (
              <h4 style={{ color: 'red' }}>Encountered an error {error}</h4>
            ) : (
              <Button onClick={uploadToBackpack} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            )}
          </div>
        </>
      ) : (
        <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">
          Follow the steps in AvatarConnect
        </h5>
      )}
    </>
  );
};

export default AvatarConnect;
