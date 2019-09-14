import React from "react";
import FaceDetection from "./FaceDetection";
import WebcamCapture from "./WebcamCapture";
import * as faceapi from "face-api.js";

function useLoadModel() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = `${process.env.PUBLIC_URL}/weights`;
      await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
      await faceapi.loadFaceLandmarkModel(MODEL_URL);
      await faceapi.loadFaceRecognitionModel(MODEL_URL);
      setIsLoaded(true);
      console.log("face detection model loaded");
    };

    loadModels();
  }, []);

  return { isLoaded };
}

function App() {
  const [image, setImage] = React.useState();
  const { isLoaded } = useLoadModel();
  const handleScreenCapture = img => {
    console.log("handleScreenShot");
    setImage(img);
  };
  return (
    <div className="App">
      <WebcamCapture onScreenCapture={handleScreenCapture} />
      {isLoaded && <FaceDetection image={image} />}
    </div>
  );
}

export default App;
