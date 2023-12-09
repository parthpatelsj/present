import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AdminPage = () => {
  const [inputText, setInputText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [textSubmitted, setTextSubmitted] = useState(false);
  const [videoId, setVideoId] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setFeedback(null);
    setTextSubmitted(false);
  };

  const handleVideoInputChange = (e) => {
    setVideoId(e.target.value);
    setFeedback(null);
    setTextSubmitted(false);
  };

  const handleShowButtonClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/sendText`, {
        text: inputText,
      });
      setFeedback({ type: 'success', message: 'Text sent successfully' });
      setInputText('');
      setTextSubmitted(true);
    } catch (error) {
      setFeedback({ type: 'error', message: `Error sending text: ${error.message}` });
    }
  };

  const handleSaveButtonClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/saveVideoId`, {
        videoId: videoId,
      });
      setFeedback({ type: 'success', message: 'Video ID saved successfully' });
    } catch (error) {
      setFeedback({ type: 'error', message: `Error saving video ID: ${error.message}` });
    }
  };

  return (
    <Container>
      <Content>
        <Heading>Presentation Controls</Heading>
        <InputContainer>
          <InputLabel>
            Enter footer text:
            <Textarea
              rows="4"
              cols="30"
              value={inputText}
              onChange={handleInputChange}
            />
          </InputLabel>
          <Button onClick={handleShowButtonClick}>Show Text</Button>
        </InputContainer>
        <InputContainer>
          <InputLabel>
            Enter Video ID:
            <Textarea
              rows="4"
              cols="10"
              value={videoId}
              onChange={handleVideoInputChange}
            />
          </InputLabel>
          <Button onClick={handleSaveButtonClick}>Change Video</Button>
        </InputContainer>
        {feedback && <Feedback className={feedback.type}>{feedback.message}</Feedback>}
        {textSubmitted && <TextSubmitted>Text Submitted</TextSubmitted>}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
`;

const Feedback = styled.div`
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
`;

const TextSubmitted = styled.div`
  margin-top: 10px;
  color: #007bff;
  font-weight: bold;
`;

export default AdminPage;
