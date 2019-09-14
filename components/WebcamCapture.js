import React from "react";
import Webcam from "react-webcam";
import useInterval from "@use-hooks/interval";

export default function WebcamCapture({ videoRef, onScreenCapture }) {
  const capture = React.useCallback(() => {
    const imageSrc = videoRef.current.getScreenshot();
    onScreenCapture(imageSrc);
  }, [videoRef, onScreenCapture]);

  React.useEffect(capture, []); //initial before setTimeout

  useInterval(capture, 1000);

  return (
    <>
      <Webcam
        audio={false}
        className="webcam-video"
        ref={videoRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "environment"
        }}
      />
    </>
  );
}
