/**
 * Modal Positioning Test
 * Test component to verify modal positioning
 */

import React from 'react';

export const ModalPositionTest: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 999999,
          padding: '10px 20px',
          backgroundColor: '#c77dff',
          color: '#10002b',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Test Modal Position
      </button>
    );
  }

  return (
    <div 
      style={{ 
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Modal Position Test</h2>
        <p>This modal should be centered on the screen, not the page content.</p>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#c77dff',
            color: '#10002b',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalPositionTest;
