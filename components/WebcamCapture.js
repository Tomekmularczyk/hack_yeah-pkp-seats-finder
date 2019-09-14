import React from "react";
import Webcam from "react-webcam";
import useInterval from "@use-hooks/interval";

export default function WebcamCapture({ onScreenCapture }) {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onScreenCapture(imageSrc);
  }, [webcamRef, onScreenCapture]);

  React.useEffect(capture, []); //initial before setTimeout

  useInterval(capture, 2000);

  return (
    <>
      <Webcam
        audio={false}
        className="webcam-video"
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "environment"
        }}
      />
      <style jsx global>{`
        .webcam-video {
          width: 100%;
          height: calc(100vh - 3rem);
        }
      `}</style>
    </>
  );
}
