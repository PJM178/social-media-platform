import { useEffect, useState } from 'react';

interface DislikeModalProps {
  setClearTimer: React.Dispatch<React.SetStateAction<boolean>>
}

const DislikeModal = ({ setClearTimer }: DislikeModalProps) => {
  const [progressBarWidth, setProgressBarWidth] = useState<number>(100);

  useEffect(() => {
    setProgressBarWidth(0);
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content-inside">
          <span className="close">&times;</span>
          <p>Disliking the post...</p>
          <p onClick={() => setClearTimer(true)} className="modal-content-cancel">Cancel</p>
        </div>
        <div className="progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
      </div>
    </div>
  );
};

export default DislikeModal;