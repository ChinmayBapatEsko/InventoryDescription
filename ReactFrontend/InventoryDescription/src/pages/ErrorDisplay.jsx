import React from 'react';

function ErrorDisplay({errorDetails}) {
  return (
    <div className="error-display">
      <h2>Error Occurred</h2>
      <p><strong>Title:</strong> {errorDetails.title}</p>
      <p><strong>Status:</strong> {errorDetails.status}</p>
      <p><strong>Detail:</strong> {errorDetails.detail}</p>
    </div>
  );
}

export default ErrorDisplay;
