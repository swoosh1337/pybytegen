import React, { useState } from 'react';

export default function BytecodeViewer() {
  const [pythonCode, setPythonCode] = useState('print("Hello, World!")');
  const [bytecode, setBytecode] = useState('');

  const getBytecode = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/bytecode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: pythonCode }),
      });
      const data = await response.json();
      setBytecode(data.bytecode);
    } catch (error) {
      console.error('Error fetching bytecode:', error);
      setBytecode('Error fetching bytecode. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Python Bytecode Viewer</h1>
      <div style={styles.gridContainer}>
        <div style={styles.column}>
          <h2 style={styles.subtitle}>Python Code</h2>
          <textarea
            value={pythonCode}
            onChange={(e) => setPythonCode(e.target.value)}
            style={styles.textarea}
            placeholder="Enter your Python code here..."
          />
        </div>
        <div style={styles.column}>
          <h2 style={styles.subtitle}>Bytecode</h2>
          <pre style={styles.pre}>
            {bytecode || 'Bytecode will appear here...'}
          </pre>
        </div>
      </div>
      <button onClick={getBytecode} style={styles.button}>
        Generate Bytecode
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  gridContainer: {
    display: 'justifyContent',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '20px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 'semibold',
    marginBottom: '10px',
    color: '#555',
  },
  textarea: {
    width: '100%',
    height: '200px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '1.4',
    resize: 'vertical',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  pre: {
    width: '100%',
    height: '200px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '1.4',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'block',
    margin: '0 auto',
  },
};

// Media query for larger screens
if (window.matchMedia("(min-width: 768px)").matches) {
  styles.gridContainer = {
    ...styles.gridContainer,
    flexDirection: 'row',
  };
  styles.textarea = {
    ...styles.textarea,
    height: '300px',
  };
  styles.pre = {
    ...styles.pre,
    height: '300px',
  };
}