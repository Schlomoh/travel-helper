import { ChangeEvent, useContext, useState } from "react";
import { Button, Paper, TextField, styled } from "@mui/material";
import { ConversationContext } from "../../store";

const Container = styled(Paper)`
  height: fit-content;
  box-sizing: border-box;
  border-radius: 1.5rem;
  width: calc(100% - 2rem);

  position: fixed;
  bottom: 0;
  margin-bottom: 1rem;
  padding: 0.75rem;

  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media screen and (min-width: 600px) {
    width: 100%;
  }
`;

const StyledTextField = styled(TextField)`
  width: 80%;

  border-radius: 1rem;
  fieldset {
    border-radius: 1rem;
  }
`;

const StyledButton = styled(Button)`
  height: auto;
  width: 20%;
  border-radius: 1rem;
`;

const PromptField = () => {
  const [prompt, setPrompt] = useState("");
  const { send, isLoading, hasError } = useContext(ConversationContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSend = () => {
    send(prompt);
    setPrompt("");
  };

  return (
    <Container elevation={6}>
      <StyledTextField
        onKeyDown={(event) => event.key === "Enter" && handleSend()}
        label="Let me plan a trip for you 🏝️"
        placeholder="Describe where you want to go"
        value={prompt}
        onChange={handleChange}
        disabled={hasError}
        size="small"
      ></StyledTextField>
      <StyledButton
        variant="contained"
        onClick={handleSend}
        disabled={!prompt || isLoading || hasError}
      >
        Send
      </StyledButton>
    </Container>
  );
};

export default PromptField;
