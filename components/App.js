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
      const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
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

function App() {
  const [image, setImage] = React.useState();
  const { isLoaded } = useLoadModel();
  const detectionsList = useDetectFaces(image, isLoaded);
  const handleScreenCapture = img => {
    setImage(img);
  };
  return (
    <div className="App">
      <WebcamCapture onScreenCapture={handleScreenCapture} />
      {isLoaded ? (
        <FacesCount nrOfFaces={detectionsList.length} />
      ) : (
        "Loading models..."
      )}
    </div>
  );
}

export default App;
