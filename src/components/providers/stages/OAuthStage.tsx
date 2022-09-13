import { FC, useEffect, useState } from 'react';
import { PipelineStage } from '@bkpk/providers/dist/provider/pipeline';
import { Popup } from '@bkpk/sdk';

interface OAuthStageProps {
  context: {
    aggregate: any;
    provider: any;
    stage: PipelineStage;
  };
  resultCallback: (result: any) => void;
}

const OAuthStage: FC<OAuthStageProps> = (props: OAuthStageProps) => {
  useEffect(() => {
    const handleAuthorization = async () => {
      const popup = new Popup<any>('Client ID', 'token');

      const result = await new Promise<any>((resolve, reject) => {
        popup.on('result', (result: any) => resolve(result));
        popup.on('error', (error: any) => reject(error));
      });

      return result;
    };
    handleAuthorization();
  }, []);

  return <div className="w-full h-full"></div>;
};

export default OAuthStage;
