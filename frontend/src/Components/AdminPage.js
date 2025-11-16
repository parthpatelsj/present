import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const AdminPage = () => {
  const [inputText, setInputText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [textSubmitted, setTextSubmitted] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    if (!inputText.trim()) {
      setFeedback({ type: 'error', message: 'Please enter some text' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/sendText`, {
        text: inputText,
      });

      if (response.data.success) {
        setFeedback({ type: 'success', message: 'Text sent successfully to all presentations!' });
        setInputText('');
        setTextSubmitted(true);
        setTimeout(() => setTextSubmitted(false), 3000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      setFeedback({ type: 'error', message: `Error: ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveButtonClick = async () => {
    if (!videoId.trim()) {
      setFeedback({ type: 'error', message: 'Please enter a video ID' });
      return;
    }

    if (videoId.length !== 11) {
      setFeedback({ type: 'error', message: 'YouTube video ID must be 11 characters' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/saveVideoId`, {
        videoId: videoId,
      });

      if (response.data.success) {
        setFeedback({ type: 'success', message: 'Video background updated for all presentations!' });
        setVideoId('');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      setFeedback({ type: 'error', message: `Error: ${errorMessage}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          <Heading>Presentation Control Panel</Heading>
          <Description>Manage real-time presentation content and video backgrounds</Description>
        </Header>

        <ControlsGrid>
          <Card>
            <CardTitle>Footer Text Control</CardTitle>
            <CardDescription>Broadcast text to appear at the bottom of all presentations</CardDescription>
            <InputLabel>Enter footer text:</InputLabel>
            <Textarea
              rows="4"
              value={inputText}
              onChange={handleInputChange}
              placeholder="e.g., Swaminarayan Satsang..."
              maxLength={500}
              disabled={isLoading}
            />
            <CharCount>{inputText.length}/500</CharCount>
            <Button onClick={handleShowButtonClick} disabled={isLoading || !inputText.trim()}>
              {isLoading ? <Spinner /> : '📢 Broadcast Text'}
            </Button>
          </Card>

          <Card>
            <CardTitle>Video Background</CardTitle>
            <CardDescription>Change the YouTube video background for all presentations</CardDescription>
            <InputLabel>YouTube Video ID (11 characters):</InputLabel>
            <Input
              type="text"
              value={videoId}
              onChange={handleVideoInputChange}
              placeholder="e.g., QoytNH5Lq6M"
              maxLength={11}
              disabled={isLoading}
            />
            <HelpText>
              Find the ID in the URL: youtube.com/watch?v=<strong>QoytNH5Lq6M</strong>
            </HelpText>
            <Button onClick={handleSaveButtonClick} disabled={isLoading || !videoId.trim()}>
              {isLoading ? <Spinner /> : '🎬 Update Video'}
            </Button>
          </Card>
        </ControlsGrid>

        {feedback && (
          <Feedback type={feedback.type}>
            {feedback.type === 'success' ? '✓ ' : '✗ '}
            {feedback.message}
          </Feedback>
        )}

        {textSubmitted && <SuccessAnimation>✓ Sent!</SuccessAnimation>}
      </Content>
    </Container>
  );
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Heading = styled.h1`
  font-size: 42px;
  margin-bottom: 12px;
  color: #ffffff;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  font-size: 16px;
  color: #aaaaaa;
  margin: 0;
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    border-color: rgba(102, 126, 234, 0.5);
  }
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 8px 0;
  color: #ffffff;
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #888888;
  margin: 0 0 20px 0;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #cccccc;
  font-size: 14px;
  font-weight: 500;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #666666;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #666666;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #888888;
  margin-top: 4px;
  margin-bottom: 12px;
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 8px 0 12px 0;
  font-style: italic;

  strong {
    color: #667eea;
    font-family: 'Courier New', monospace;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Feedback = styled.div`
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  animation: ${fadeIn} 0.3s ease-out;
  background: ${props => props.type === 'success'
    ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    : 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)'};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const SuccessAnimation = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 80px;
  color: #38ef7d;
  animation: ${keyframes`
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
  `} 0.8s ease-out forwards;
`;

export default AdminPage;
