import React from "react";
import Webcam from "react-webcam";
import useInterval from "@use-hooks/interval";

const WebcamCapture = ({ onScreenCapture }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onScreenCapture(imageSrc);
  }, [webcamRef, onScreenCapture]);

  React.useEffect(capture, []); //initial before setTimeout

  useInterval(capture, 3000);

  return (
    <Webcam
      audio={false}
      height={500}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={1000}
      videoConstraints={{
        width: 1280,
        height: 720,
        facingMode: "environment"
      }}
    />
  );
};

export default WebcamCapture;
