import React from "react";
import * as faceapi from "face-api.js";
import * as api from "./api";

function useDetectFaces(image) {
  const [detectionList, setDetectionList] = React.useState([]);
  React.useEffect(() => {
    const detectOnImage = async () => {
      const el = document.createElement("img");
      el.src = image;
      const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
      const detections = await faceapi.detectAllFaces(el, options);
      console.log("Detected");
      setDetectionList(detections);
      api.postNrSeats(detections.length);
    };
    detectOnImage();
  }, [image]);
  return detectionList;
}

export default function FaceDetection({ image }) {
  const detectionsList = useDetectFaces(image);
  return (
    <div>
      <br />
      <h2>Faces detected: {detectionsList.length}</h2>
    </div>
  );
}
