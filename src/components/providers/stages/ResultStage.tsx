import { FC, useEffect, useState } from 'react';
import { AvatarErrorBoundary } from '../../AvatarErrorBoundary';
import AvatarPreview from '../../AvatarPreview';
import { sourceMapping } from '../../../utils/sourceMapping';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../actions/api-factory';
import { useStore } from '../../../store';
import Button from '../../Button';
import {
  PipelineResponse,
  PipelineStage
} from '@metaverse-backpack/backpack-providers/dist/provider/pipeline';

interface ResultStageProps {
  context: {
    aggregate: any;
    provider: any;
    stage: PipelineStage;
  };
}

const ResultStage: FC<ResultStageProps> = (props: ResultStageProps) => {
  const [store] = useStore();
  const [error, setError] = useState<string>();
  const errorHandler = (message: string) => {
    setError(message);
  };
  const { api } = useApi(store.accessToken, errorHandler);
  const navigate = useNavigate();
  const item: PipelineResponse = props.context.aggregate;

  const extractFilename = (uri: string) => {
    return uri
      .split(/[#?]/)[0]
      .substring(uri.lastIndexOf('/') + 1)
      .split('.')[0];
  };

  const uploadToBackpack = async () => {
    const replacedUrl = item.data.replace(
      'https://gateway.pinata.cloud/ipfs/',
      process.env.REACT_APP_IPFS_GATEWAY || 'https://nftstorage.link/ipfs/'
    );
    const base64 = await getBase64FromUrl(replacedUrl);
    const data = {
      file: base64,
      filename: extractFilename(replacedUrl),
      fileExtension: item.metadata.fileFormat,
      source: item.metadata.source,
      category: 'avatar',
      metadata: item.metadata
    };

    await api.post('/backpack/item/file', data);
    navigate('/');
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

  useEffect(() => {
    uploadToBackpack().catch((error) => {
      setError(error);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div
        key={item.data}
        className="w-full bg-white border shadow-md p-6 transition-all sm:text-sm rounded-md">
        <span className="inline-flex items-center m-2 px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="ml-1">Avatars</span>
        </span>
        <AvatarErrorBoundary>
          <AvatarPreview avatarUri={item.data} />
        </AvatarErrorBoundary>
        <h5 className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-xl">
          {sourceMapping[item.metadata.source]}
        </h5>
        <div className="w-full flex items-center flex-col">
          {error ? (
            <>
              <span className="mt-5 mb-3 text-base font-semibold text-red-600 md:text-l">
                Whoops... something went wrong!
              </span>
              <Button onClick={() => navigate('/')}>Back to Overview</Button>
            </>
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-black"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="mt-5 mb-3 text-base font-semibold text-gray-900 md:text-l">
                Creating your Backpack item from avatar...
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultStage;
