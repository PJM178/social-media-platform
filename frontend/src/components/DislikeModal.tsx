import { useEffect, useState } from 'react';

interface DislikeModalProps {
  setClearTimer: React.Dispatch<React.SetStateAction<boolean>>
  timeouts: NodeJS.Timeout[]
}

const DislikeModal = ({ setClearTimer, timeouts }: DislikeModalProps) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [progressBarWidth, setProgressBarWidth] = useState<number>(100);
  const [intervalGoing, setIntervalGoing] = useState<boolean>(false);
  console.log(progressBarWidth);

  // useEffect(() => {
  //   if (progressBarWidth !== 0) {
  //     if (intervalGoing) {
  //       setTimer(setInterval(() => {
  //         setProgressBarWidth(progressBarWidth - 5);
  //       }, 100));
  //     }
  //   }
  //   return () => clearInterval(timer);
  // }, [progressBarWidth, intervalGoing]);

  useEffect(() => {
    setProgressBarWidth(0);
  }, []);

  const handleStop = () => {
    // setIntervalGoing(false);
    setProgressBarWidth(0);
    clearInterval(timer);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-content-inside'>
          <span className="close">&times;</span>
          <p>Disliking the post...</p>
          {/* <p onClick={() => setClearTimer(true)}>Cancel</p> */}
          <p onClick={() => setClearTimer(true)}>Cancel</p>
        </div>
        <div className='progress-bar' style={{ width: `${progressBarWidth}%` }}></div>
      </div>
    </div>
  );
};

export default DislikeModal;