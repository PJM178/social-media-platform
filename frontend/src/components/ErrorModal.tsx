import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const ErrorModal = () => {
  const { errorMessage, setErrorMessage } = useTheme();
  const [progressBarWidth, setProgressBarWidth] = useState<number>(100);


  useEffect(() => {
    setProgressBarWidth(0);

    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content-inside">
          <span onClick={() => setErrorMessage(null)} className="close">&times;</span>
          <p>Something went wrong - {errorMessage}</p>
        </div>
        <div className="progress-bar" style={{ width: `${progressBarWidth}%`, transition: '5s linear' }}></div>
      </div>
    </div>
  );
};

export default ErrorModal;