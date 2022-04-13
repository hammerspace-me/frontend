import { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../actions/api-factory';
import { useStore } from '../store';
import ReadyPlayerMeLogo from '../assets/readyplayerme.svg';

enum ReadyPlayerMeState {
  Init,
  Created,
  Upload,
  Finished
}

const ReadyPlayerMe: FC = () => {
  const [state, setState] = useState<ReadyPlayerMeState>(ReadyPlayerMeState.Init);
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const rpmIframe = useRef(null);
  const [store] = useStore();
  const { api } = useApi(store.accessToken);
  const navigate = useNavigate();

  const uploadToBackpack = async () => {
    setState(ReadyPlayerMeState.Upload);
    if (avatarUrl) {
      const base64 = await getBase64FromUrl(avatarUrl);
      console.log(base64);
      const data = {
        file: base64,
        source: 'Ready Player Me',
        category: 'avatar'
      };
      await api.post('/backpack/item/file', data);
      navigate('/');
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

  /* eslint-disable */
  const receiveMessage = (message: MessageEvent<unknown>) => {
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
      setState(ReadyPlayerMeState.Created);
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
  /* eslint-enable */

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [receiveMessage]);

  const getButtonText = () => {
    switch (state) {
      case ReadyPlayerMeState.Init:
        return 'Create an avatar first';
      case ReadyPlayerMeState.Created:
        return 'Create backpack item';
      case ReadyPlayerMeState.Upload:
        return 'Uploading to IPFS...';
      case ReadyPlayerMeState.Finished:
        return 'Done';
    }
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <img src={ReadyPlayerMeLogo} alt="Ready Player Me Logo" width="100"></img>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <iframe
            id="frame"
            ref={rpmIframe}
            title="Ready Player Me"
            style={{ width: '800px', height: '600px', marginTop: '20px' }}
            src="https://demo.readyplayer.me/avatar?frameApi"
            allow="camera *; microphone *"
            hidden={state !== ReadyPlayerMeState.Init}></iframe>
          <h3>{avatarUrl}</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button disabled={state !== ReadyPlayerMeState.Created} onClick={uploadToBackpack}>
            {getButtonText()}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ReadyPlayerMe;
