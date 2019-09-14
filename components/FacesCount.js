import React from "react";

export default function FacesCount({ nrOfFaces }) {
  return (
    <div>
      <h3>Faces detected: {nrOfFaces}</h3>
      <style jsx>{`
        h3 {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
