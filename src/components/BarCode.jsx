import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRCodeScanner = () => {
  const [qrData, setQrData] = useState("Not Found");

  return (
    <div className="scanner-container">
      <h2>QR Code Scanner (Webcam Input)</h2>
      <QrReader
        constraints={{ facingMode: "environment" }} // Use back camera on mobile
        onResult={(result, error) => {
          if (result) {
            setQrData(result?.text);
          }
          if (error) {
            console.error("QR scanning error:", error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p className="result">Scanned Code: <strong>{qrData}</strong></p>
    </div>
  );
};

export default QRCodeScanner;
