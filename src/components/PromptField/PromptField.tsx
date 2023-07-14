import { ChangeEvent, useState } from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import { useOpenAi } from "../../utils";

const Container = styled(Box)`
  height: 3.5rem;
  width: 100%;

  box-sizing: content-box;
  position: fixed;
  bottom: 0;
  margin-bottom: 1rem;
  padding: 1rem;

  border-radius: 0.5rem;
  background-color: rgba(128, 128, 128, 0.5);

  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const StyledTextField = styled(TextField)`
  width: 80%;
`;

const StyledButton = styled(Button)`
  height: 100%;
  width: 20%;
`;

const PromptField = () => {
  const [prompt, setPrompt] = useState("");
  const send = useOpenAi();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSend = () => {
    send(prompt);
    setPrompt("");
  };

  return (
    <Container>
      <StyledTextField
        label="Let me plan a trip for you 🏝️"
        placeholder="Describe where you want to go"
        value={prompt}
        onChange={handleChange}
      ></StyledTextField>
      <StyledButton variant="contained" onClick={handleSend} disabled={!prompt}>
        Send
      </StyledButton>
    </Container>
  );
};

export default PromptField;
