import React, { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeReader = () => {
  const [barcode, setBarcode] = useState("Not Found");
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermission(true);
        stream.getTracks().forEach((track) => track.stop()); // Stop the camera stream after permission check
      } catch (error) {
        console.error("Camera access denied:", error);
        setCameraPermission(false);
      }
    };

    requestCameraPermission();
  }, []);

  return (
    <div className="scanner-container">
      <h2>Barcode Scanner (Webcam Input)</h2>

      {cameraPermission === null && <p>Requesting camera access...</p>}
      {cameraPermission === false && <p style={{ color: "red" }}>Camera access denied. Please enable it in browser settings.</p>}

      {cameraPermission && (
        <BarcodeScannerComponent
          width={500}
          height={500}
          facingMode="environment"
          delay={300}
          formats={['CODE128', 'QR_CODE', 'AZTEC', 'DATA_MATRIX']}
          onUpdate={(err, result) => {
            if (result) {
              setBarcode(result.text);
            }
          }}
        />
      )}

      <p className="result">Scanned Code: <strong>{barcode}</strong></p>
    </div>
  );
};

export default BarcodeReader;
