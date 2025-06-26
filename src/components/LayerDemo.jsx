import React from 'react';

export default function LayerDemo({ layerKey }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        background: '#fafafa',
      }}
    >
      <strong>Layer preview coming soon:</strong> {layerKey}
    </div>
  );
}