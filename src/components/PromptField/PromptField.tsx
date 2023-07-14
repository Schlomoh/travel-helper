import { ChangeEvent, useState } from "react";
import { Box, Button, TextField, styled } from "@mui/material";
import { useOpenAi } from "../../utils";

const Container = styled(Box)`
  width: 100%;

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
        placeholder="What's your desitnation?"
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
