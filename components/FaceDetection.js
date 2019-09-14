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
      setDetectionList(detections);
      api.postNrSeats(detections.length);
      el.remove();
    };
    detectOnImage();
  }, [image]);
  return detectionList;
}

export default function FaceDetection({ image }) {
  const detectionsList = useDetectFaces(image);
  return (
    <div>
      <h3>Faces detected: {detectionsList.length}</h3>
      <style jsx>{`
        h3 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
