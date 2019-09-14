import React from "react";
import FacesCount from "./FacesCount";
import WebcamCapture from "./WebcamCapture";
import * as faceapi from "face-api.js";
import * as api from "./api";

function useLoadModel() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "static/weights";
      try {
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
      } catch (e) {
        console.error("couldn't load model");
      }
      setIsLoaded(true);
    };

    loadModels();
  }, []);

  return { isLoaded };
}

function useDetectFaces(image, isLoaded) {
  const [detectionList, setDetectionList] = React.useState([]);

  React.useEffect(() => {
    const detectOnImage = async () => {
      const el = document.createElement("img");
      el.src = image;
      const options = new faceapi.SsdMobilenetv1Options({
        minConfidence: 0.7,
        maxResults: 5
      });
      const detections = await faceapi.detectAllFaces(el, options);
      setDetectionList(detections);
      api.postNrSeats(detections.length);
      el.remove();
    };
    if (isLoaded) {
      detectOnImage();
    }
  }, [image, isLoaded]);

  return detectionList;
}

function useDrawBoxes(canvasRef, videoRef, results) {
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      video.width = 600;
      video.height = 600;
      const dims = faceapi.matchDimensions(canvas, video, true);
      faceapi.draw.drawDetections(canvas, faceapi.resizeResults(results, dims));
    }
  }, [results]);
}

function App() {
  const canvasRef = React.useRef();
  const videoRef = React.useRef();
  const [image, setImage] = React.useState();
  const { isLoaded } = useLoadModel();
  const detectionsList = useDetectFaces(image, isLoaded);
  useDrawBoxes(canvasRef, videoRef, detectionsList);

  return (
    <div className="App">
      <WebcamCapture videoRef={videoRef} onScreenCapture={setImage} />
      <canvas ref={canvasRef} />
      {isLoaded ? (
        <FacesCount nrOfFaces={detectionsList.length} />
      ) : (
        "Loading models..."
      )}
      <style jsx global>{`
        .webcam-video {
          width: 100%;
          height: calc(100vh - 3rem);
        }
        canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100vh - 3rem);
        }
      `}</style>
    </div>
  );
}

export default App;
