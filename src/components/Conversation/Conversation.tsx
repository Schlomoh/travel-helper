import { useContext } from "react";
import { ConversationContext } from "../../store/ConversationContext";
import { styled } from "@mui/material";

const Container = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 0.5rem;
`;

const MessageContainer = styled("div")`
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #49c0e1;
  max-width: 50%;
  width: fit-content;

  p {
    margin: 0;
    overflow-wrap: break-word;
  }

  &.user {
    align-self: flex-end;
  }

  &.assistent {
    align-self: flex-start;
  }
`;

const Conversation = () => {
  const { conversation } = useContext(ConversationContext);
  return (
    <Container>
      {conversation.map((message, i) => (
        <MessageContainer className={message.role || "assistent"} key={i}>
          <p>{message.prompt || message.message}</p>
        </MessageContainer>
      ))}
    </Container>
  );
};

export default Conversation;
