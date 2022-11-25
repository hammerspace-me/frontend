import { FC, useEffect, useState } from 'react';
import Popup from './Popup';
import SelectStageEmptyCard from './SelectStageEmptyCard';
import LoadingSpinner from '../../LoadingSpinner';
import { PipelineStage } from '@hammerspace-me/technology-providers-sdk/dist/provider/pipeline';

interface OAuthStageProps {
  context: {
    aggregate: any;
    provider: any;
    stage: PipelineStage;
  };
  resultCallback: (result: any) => void;
}

const OAuthStage: FC<OAuthStageProps> = (props: OAuthStageProps) => {
  const [error, setError] = useState<string>();

  const popup = new Popup<any>({
    url:
      process.env.REACT_APP_MEEBITS_OAUTH_URL +
      '?callbackUrl=' +
      process.env.REACT_APP_MEEBITS_REDIRECT_URI,
    redirectUri: process.env.REACT_APP_MEEBITS_REDIRECT_URI || 'http://localhost:3001/callback',
    width: 1200,
    height: 1000,
    callback: (result: any) => {
      if (result.errorMessage) {
        setError(result.errorMessage);
      }

      if (result.accessToken && result.account) {
        props.resultCallback({
          accessToken: result.accessToken,
          account: result.account
        });
      } else {
        setError('No access token present');
      }
    },
    formatResult: (queryParameters: { key: string; value: string | null }[]) => {
      const accessToken = queryParameters.find(
        (elem: { key: string; value: string | null }) => elem.key === 'accessToken'
      )?.value;
      const account = queryParameters.find(
        (elem: { key: string; value: string | null }) => elem.key === 'account'
      )?.value;
      const errorMessage = queryParameters.find(
        (elem: { key: string; value: string | null }) => elem.key === 'errorMessage'
      )?.value;

      return {
        accessToken: accessToken,
        account: account,
        errorMessage: errorMessage
      };
    }
  });

  useEffect(() => {
    popup.loadPopup();
  }, []);

  return (
    <div className="w-full h-full">{error ? <SelectStageEmptyCard /> : <LoadingSpinner />}</div>
  );
};

export default OAuthStage;
