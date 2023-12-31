import { useContext } from "react";
import {
  Button,
  LinearProgress,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { BeachAccessRounded } from "@mui/icons-material";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import { ConversationContext } from "../../store/ConversationContext";
import MessagesList from "./MessagesList";
import LoadingMessage from "./LoadingMessage";

const Container = styled(Paper)`
  width: 100%;
  height: calc(100% - 5rem);

  border-radius: 1.5rem;
  overflow: scroll;
  scrollbar-width: none;
`;

const BackdropContainer = styled("div")`
  position: absolute;
  z-index: 1;
  top: 1rem;
  height: calc(100% - 7rem);
  width: 100%;
  padding: 1rem;
  text-align: center;

  h4 {
    color: rgba(128, 128, 128, 0.3);
    font-weight: 700;
  }

  p {
    margin: 1rem;
    color: rgba(128, 128, 128, 0.3);
    font-weight: 500;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled("div")`
  position: relative;
  z-index: 2;
  width: inherit;

  margin: 1rem 0;

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
`;

const StyledButton = styled(Button)`
  position: relative;
  left: 0;
  margin: 0 1rem;
  width: fit-content;
  border-radius: 1rem;
  border-bottom-left-radius: 0.25rem;
`;

const ReloadButton = () => {
  const { resend, hasError } = useContext(ConversationContext);

  return hasError ? (
    <StyledButton
      startIcon={<CachedRoundedIcon />}
      variant="outlined"
      color="error"
      onClick={resend}
    >
      Error - Resend
    </StyledButton>
  ) : null;
};

const Conversation = () => {
  const { isLoading, conversation } = useContext(ConversationContext);
  return (
    <Container variant="outlined">
      {isLoading ? (
        <LinearProgress
          sx={{
            position: "relative",
            bottom: "0",
            height: ".25rem",
          }}
        />
      ) : null}
      {conversation.length <= 0 ? (
        <BackdropContainer>
          <BeachAccessRounded
            htmlColor="rgba(128,128,128, .3)"
            sx={{ height: "200px", width: "200px" }}
          ></BeachAccessRounded>
          <Typography variant="h4">TravelGPT</Typography>
          <Typography variant="body1">
            Tell your assistant abobut the trip you're looking for
          </Typography>
        </BackdropContainer>
      ) : null}
      <ContentContainer>
        <MessagesList />
        <LoadingMessage />
        <ReloadButton />
      </ContentContainer>
    </Container>
  );
};

export default Conversation;
