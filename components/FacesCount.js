import React from "react";

export default function FacesCount({ nrOfFaces }) {
  return (
    <div>
      <h2>Faces detected: {nrOfFaces}</h2>
      <style jsx>{`
        h2 {
          margin: 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
