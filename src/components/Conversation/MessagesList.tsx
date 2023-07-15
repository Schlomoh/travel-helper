import { useContext } from "react";
import { Paper, Typography, styled } from "@mui/material";
import { ConversationContext } from "../../store";
import TripDetails from "./TripDetails";

export const MessageContainer = styled(Paper)`
  padding: 0.5rem 1rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;

  max-width: 75%;
  width: fit-content;

  p {
    overflow-wrap: break-word;
  }

  &.user {
    margin: 0 1rem 0 0;
    align-self: flex-end;
    background-color: ${({ theme }) => theme.palette.primary.dark};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }

  &.assistant {
    margin: 0 0 0 1rem;
    align-self: flex-start;

    @media screen and (max-width: 600px) {
        max-width: 90%;
    }
  }
`;

const MessagesList = () => {
  const { conversation } = useContext(ConversationContext);

  return conversation.map(({ message, prompt, role, days }, i) => (
    <MessageContainer className={role} key={i}>
      <Typography variant="body1">{prompt || message}</Typography>
      <TripDetails {...days} />
    </MessageContainer>
  ));
};

export default MessagesList;
