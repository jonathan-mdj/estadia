import React from 'react';

export const MensajeExito = ({ successMessage, fadeOut }) => {
  return (
    <>
      {successMessage && (
        <div className={`alert alert-success ${fadeOut ? 'fade-out' : ''}`}>
          {successMessage}
        </div>
      )}
    </>
  );
};
