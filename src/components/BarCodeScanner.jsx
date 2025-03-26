import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const scannerRef = useRef(null); // Use useRef to persist scanner instance

    useEffect(() => {
        if (!scannerRef.current) { // Ensure only one instance is created
            scannerRef.current = new Html5QrcodeScanner("reader", {
                fps: 5,
                qrbox: { width: 500, height: 500 }
            });

            scannerRef.current.render(
                (result) => {
                    scannerRef.current.clear(); // Stop the scanner after a successful scan
                    setScanResult(result);
                },
                (err) => console.warn(err)
            );
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
                scannerRef.current = null; // Reset ref on unmount
            }
        };
    }, []);

    return (
        <div>
            <h2>QR Code Scanning in React using html5qrcode</h2>
            {scanResult ? (
                <div>
                    <strong>Success:</strong>{" "}
                    <a href={scanResult} target="_blank" rel="noopener noreferrer">
                        {scanResult}
                    </a>
                </div>
            ) : (
                <div id="reader"></div>
            )}
        </div>
    );
};

export default BarcodeScanner;
