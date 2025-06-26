import React from 'react';

export default function Swatch({ label, hex, width = 440 }) {
  return (
    <div
      style={{
        background: hex,
        color: 'white',
        padding: '8px 16px',
        fontWeight: 500,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'space-between',
        width,
      }}
    >
      <span>{label}</span>
      <span>{hex.toUpperCase()}</span>
    </div>
  );
}