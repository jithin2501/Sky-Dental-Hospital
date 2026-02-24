import React, { useEffect, useRef } from 'react';
import AdminLayout from './adminlayout';
import './adminstyle/reviewqr.css';

// The URL your QR will point to — update YOUR_DOMAIN when deployed
const REVIEW_URL = `${window.location.origin}/leave-review`;

const ReviewQR = () => {
  const qrRef = useRef(null);

  useEffect(() => {
    // Load qrcode.js from CDN and generate QR
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => {
      if (qrRef.current && !qrRef.current.hasChildNodes()) {
        new window.QRCode(qrRef.current, {
          text: REVIEW_URL,
          width: 240,
          height: 240,
          colorDark: '#0A3D5C',
          colorLight: '#ffffff',
          correctLevel: window.QRCode.CorrectLevel.H,
        });
      }
    };
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const handlePrint = () => window.print();

  return (
    <AdminLayout>
      <div className="qr-wrapper">
        <div className="admin-page-header"><h1>REVIEW QR CODE</h1></div>

        <div className="qr-info-card user-management-container">
          <h2>How it works</h2>
          <p>Print the QR code below and place it in your clinic. When a patient scans it, they are taken directly to the review submission page where they can enter their name, star rating, and feedback.</p>

        </div>

        <div className="admin-table-card qr-card">
          {/* Printable area */}
          <div className="qr-printable" id="qr-printable">
            <div className="qr-print-header">
              <img src="/images/banner_logo/hospital_logos.png" alt="Sky Dental" className="qr-print-logo" />
              <h2>Sky Dental Hospital</h2>
            </div>
            <p className="qr-scan-text">Scan to share your review</p>
            <div ref={qrRef} className="qr-code-box" />
            <p className="qr-url-text">{REVIEW_URL}</p>
            <p className="qr-tagline">Your feedback means everything to us ❤️</p>
          </div>

          <div className="qr-actions">
            <button className="btn-create-admin" onClick={handlePrint}>
              🖨 Print QR Code
            </button>
          </div>
        </div>
      </div>

    </AdminLayout>
  );
};

export default ReviewQR;