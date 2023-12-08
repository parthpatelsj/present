import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [inputText, setInputText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [textSubmitted, setTextSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setFeedback(null);
    setTextSubmitted(false); // Clear previous success message when input changes
  };

  const handleShowButtonClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/sendText`, {
        text: inputText,
      });
      setFeedback({ type: 'success', message: 'Text sent successfully' });
      setInputText('');
      setTextSubmitted(true); // Set to true on successful submission
    } catch (error) {
      setFeedback({ type: 'error', message: `Error sending text: ${error.message}` });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Admin Page</h2>
        <div style={styles.inputContainer}>
          <label style={styles.label}>
            Enter Text:
            <br />
            <textarea
              rows="4"
              cols="30"
              value={inputText}
              onChange={handleInputChange}
              style={styles.textarea}
            />
          </label>
          <button onClick={handleShowButtonClick} style={styles.button}>
            Show Text
          </button>
        </div>
        {feedback && (
          <div style={styles.feedback} className={feedback.type}>
            {feedback.message}
          </div>
        )}
        {textSubmitted && <div style={styles.textSubmitted}>Text Submitted</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: 'auto',
  },
  label: {
    marginBottom: '10px',
  },
  textarea: {
    padding: '8px',
    marginBottom: '10px',
  },
  button: {
    padding: '8px',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  feedback: {
    marginTop: '10px',
    padding: '8px',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 'bold',
  },
  success: {
    background: '#28a745',
  },
  error: {
    background: '#dc3545',
  },
  textSubmitted: {
    marginTop: '10px',
    color: '#007bff',
    fontWeight: 'bold',
  },
};

export default AdminPage;
