import React from "react";
import FaceDetection from "./FaceDetection";
import WebcamCapture from "./WebcamCapture";
import * as faceapi from "face-api.js";

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

function App() {
  const [image, setImage] = React.useState();
  const { isLoaded } = useLoadModel();
  const handleScreenCapture = img => {
    setImage(img);
  };
  return (
    <div className="App">
      <WebcamCapture onScreenCapture={handleScreenCapture} />
      {isLoaded ? <FaceDetection image={image} /> : "Loading models..."}
    </div>
  );
}

export default App;
