import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/library";

const CameraScanner = () => {
  const [barcode, setBarcode] = useState("");
  const webcamRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current) {
        const video = webcamRef.current.video;
        if (video.readyState === 4) {
          codeReader
            .decodeFromVideoDevice(undefined, video, (result, err) => {
              if (result) {
                setBarcode(result.text);
              }
            })
            .catch(console.error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scanner-container">
      <h2>Barcode Scanner (Camera)</h2>
      <Webcam ref={webcamRef} className="webcam" />
      <p className="result">Scanned Code: <strong>{barcode}</strong></p>
    </div>
  );
};

export default CameraScanner;