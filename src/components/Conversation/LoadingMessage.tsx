import { useContext } from "react";
import { ConversationContext } from "../../store";
import { Typography, styled } from "@mui/material";
import { MessageContainer } from "./MessagesList";

const LoadingContainer = styled(MessageContainer)`
  &.dots p {
    border-bottom-left-radius: 0.25rem;
    animation: pulse 0.75s alternate infinite;

    @keyframes pulse {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

const LoadingMessage = () => {
  const { isLoading } = useContext(ConversationContext);

  return isLoading ? (
    <LoadingContainer className="dots assistant">
      <Typography variant="body1">Thinking...</Typography>
    </LoadingContainer>
  ) : null;
};

export default LoadingMessage;
