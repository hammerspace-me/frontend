import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOAuthActions } from '../actions/oAuthActions';
import ReactCodeInput from 'react-code-input';
import CardWithLogo from '../components/CardWithLogo';

const styles = {
  fullContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const OAuthActivation: FC = () => {
  const NUMBER_OF_FIELDS = 6;
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { getActivation } = useOAuthActions((message: string) => {
    setError('Activation code is invalid');
  });
  const navigate = useNavigate();

  const verifyActivationCode = async () => {
    setError('');
    const activation = await getActivation(code);
    const queryParameters = {
      response_type: 'code',
      redirect_uri: activation.redirectUri ? activation.redirectUri : '',
      client_id: activation.clientId,
      scope: activation.scopes.join(' '),
      state: activation.state ? activation.state : '',
      activation: code
    };
    const queryString = new URLSearchParams(queryParameters).toString();
    navigate('/oauth/authorize?' + queryString);
  };

  return (
    <div style={styles.fullContainer}>
      <CardWithLogo>
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
          Enter your activation code
        </h5>
        <div className="flex items-center justify-start">
          <ReactCodeInput
            name="Test"
            type="number"
            fields={NUMBER_OF_FIELDS}
            inputMode="numeric"
            onChange={(value) => setCode(value)}
            value={code}
          />
        </div>
        {error !== '' ? <p className="text-red-700">{error}</p> : null}
        <div className="mt-6 grid grid-cols-2 gap-2.5 xs:mt-8">
          <button
            disabled={code.length < 6}
            onClick={verifyActivationCode}
            className="bg-black relative inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium tracking-wider outline-none transition-all sm:text-sm bg-brand border-brand hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none w-full text-white rounded-md sm:rounded-lg px-7 sm:px-9 h-11 sm:h-13">
            Verify
          </button>
        </div>
      </CardWithLogo>
    </div>
  );
};

export default OAuthActivation;
