import { FC, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../actions/api-factory';
import { useStore } from '../store';
import AvatarConnectLogo from '../assets/avatarconnect.svg';
import { BridgeResult } from '@avatarconnect/sdk';
import AvatarPreview from './AvatarPreview';

const AvatarConnect: FC = () => {
  const [store] = useStore();
  const { api } = useApi(store.accessToken);
  const [bridgeResult, setBridgeResult] = useState<BridgeResult>();
  const [uploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    store.avatarConnect.bridge.enable();
    store.avatarConnect.bridge.on('result', (result: BridgeResult) => {
      handleBridgeResult(result);
    });
  }, [store.avatarConnect.bridge]);

  const handleBridgeResult = (result: BridgeResult) => {
    // replace Pinata gateway with Cloudflare as gateway has rate limits and CORS problems
    const replacedUrl = result.avatar.uri.replace(
      'https://gateway.pinata.cloud',
      'https://cloudflare-ipfs.com'
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
        category: 'avatar'
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
      <Row>
        <Col xs={12}>
          <img src={AvatarConnectLogo} alt="AvatarConnect Logo" width="100"></img>
          {bridgeResult ? (
            <AvatarPreview avatarUri={bridgeResult.avatar.uri}></AvatarPreview>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button onClick={uploadToBackpack} disabled={uploading}>
            {uploading ? 'Loading...' : 'Upload'}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AvatarConnect;
