import { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../actions/api-factory';
import { useStore } from '../store';
const ReadyPlayerMe: FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const rpmIframe = useRef(null);
  const [store, setStore] = useStore();
  const { api } = useApi(store.accessToken);
  const navigate = useNavigate();

  const uploadToBackpack = async () => {
    if (avatarUrl) {
      const base64 = await getBase64FromUrl(avatarUrl);

      const data = {
        file: base64,
        source: 'Ready Player Me',
        category: 'avatar'
      };

      await api.post('/backpack/item/file', data);

      navigate('/admin/backpack');
    }
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

  const receiveMessage = (message: MessageEvent<any>) => {
    const json = parse(message);

    if (json?.source !== 'readyplayerme') {
      return;
    }

    // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === 'v1.frame.ready') {
      if (rpmIframe && rpmIframe.current) {
        (rpmIframe.current as any).contentWindow.postMessage(
          JSON.stringify({
            target: 'readyplayerme',
            type: 'subscribe',
            eventName: 'v1.**'
          }),
          '*'
        );
      }
    }

    if (json.eventName === 'v1.avatar.exported') {
      console.log(`Avatar URL: ${json.data.url}`);
      setAvatarUrl(json.data.url);
    }
  };

  const parse = (event: any) => {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  return (
    <>
      <Row>
        <Col xs={12}>
          <iframe
            id="frame"
            ref={rpmIframe}
            title="Ready Player Me"
            style={{ width: '800px', height: '600px' }}
            src="https://demo.readyplayer.me/avatar?frameApi"
            allow="camera *; microphone *"
            hidden={avatarUrl != null}></iframe>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3>{avatarUrl}</h3>
          <Button disabled={avatarUrl == null} onClick={uploadToBackpack}>
            {store.api.writing ? 'Loading ...' : 'Save to backpack'}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ReadyPlayerMe;
