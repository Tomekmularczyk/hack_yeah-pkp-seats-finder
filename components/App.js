import React from "react";
import WebcamCapture from "./WebcamCapture";
import * as faceapi from "face-api.js";

function useLoadModel() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "static/weights";
      try {
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceExpressionModel(MODEL_URL);
      } catch (e) {
        console.error("couldn't load model");
      }
      setIsLoaded(true);
    };

    loadModels();
  }, []);

  return { isLoaded };
}

const detectionsStub = {
  expressions: {
    happy: 0
  }
};
function useDetectExpression(image, isLoaded, videoRef) {
  const [detection, setDetection] = React.useState(detectionsStub);

  React.useEffect(() => {
    const video = videoRef.current;
    const detectOnImage = async () => {
      const el = document.createElement("img");
      el.src = image;
      const options = new faceapi.TinyFaceDetectorOptions({});
      const result = await faceapi
        .detectSingleFace(el, options)
        .withFaceExpressions();
      setDetection(result || detectionsStub);
      el.remove();
    };
    if (isLoaded && video) {
      detectOnImage();
    }
  }, [image, isLoaded]);

  return detection;
}

// function useDrawBoxes(canvasRef, videoRef, results) {
//   React.useEffect(() => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     if (canvas && video) {
//       video.width = 600;
//       video.height = 600;
//       const dims = faceapi.matchDimensions(canvas, video, true);
//       faceapi.draw.drawDetections(canvas, faceapi.resizeResults(results, dims));
//     }
//   }, [results]);
// }

function App() {
  const canvasRef = React.useRef();
  const videoRef = React.useRef();
  const [image, setImage] = React.useState();
  const { isLoaded } = useLoadModel();
  const { expressions } = useDetectExpression(image, isLoaded, videoRef);

  const happinessFactor = expressions.happy;

  return (
    <div className="App">
      <WebcamCapture videoRef={videoRef} onScreenCapture={setImage} />
      <h3>
        {isLoaded ? (
          <>{happinessFactor > 0.9 ? "KEEP ON SMILING!" : "Smile a little!"}</>
        ) : (
          "Loading models..."
        )}
      </h3>
      <style jsx global>{`
        .webcam-video {
          width: 100%;
          height: calc(100vh - 3rem);
        }
        h3 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default App;
