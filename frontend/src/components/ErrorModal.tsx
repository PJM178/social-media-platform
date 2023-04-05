import { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

const ErrorModal = () => {
  const timer: { current: NodeJS.Timeout | null }  = useRef(null);
  const { errorMessage, setErrorMessage } = useTheme();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    return () => clearTimeout(timer.current as NodeJS.Timeout);
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content-inside">
          <span onClick={() => setErrorMessage(null)} className="close">&times;</span>
          <p>Something went wrong - {errorMessage}</p>
        </div>
        <div className="progress-bar-error"></div>
      </div>
    </div>
  );
};

export default ErrorModal;