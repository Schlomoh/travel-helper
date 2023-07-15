import { useContext } from "react";
import {
  Backdrop,
  Box,
  Button,
  LinearProgress,
  Paper,
  styled,
} from "@mui/material";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import { useOpenAi } from "../../utils";
import { ConversationContext } from "../../store/ConversationContext";
import MessagesList from "./MessagesList";
import LoadingMessage from "./LoadingMessage";
import { CategoryRounded } from "@mui/icons-material";

const Container = styled(Paper)`
  width: 100%;
  height: calc(100% - 5rem);

  border-radius: 1.5rem;
  padding-top: 1rem;
  overflow: scroll;
`;

const BackdropContainer = styled("div")`
  position: absolute;
  top: 1rem;
  height: calc(100% - 8rem);
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled("div")`
  position: relative;
  width: inherit;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
`;

const Spacer = styled(Box)`
  flex-grow: 1;
`;

const StyledButton = styled(Button)`
  position: relative;
  left: 0;
  margin: 0 1rem;
  width: fit-content;
  border-radius: 1rem;
`;

const ReloadButton = () => {
  const { conversation, hasError } = useContext(ConversationContext);
  const { send } = useOpenAi();

  return hasError ? (
    <StyledButton
      startIcon={<CachedRoundedIcon />}
      variant="outlined"
      color="error"
      onClick={() => send(conversation[-1].prompt!)}
    >
      Error - Reload
    </StyledButton>
  ) : null;
};

const Conversation = () => {
  const { isLoading } = useContext(ConversationContext);
  return (
    <Container variant="outlined">
      <BackdropContainer>
        <CategoryRounded
          htmlColor="rgba(128,128,128, .3)"
          sx={{ height: "200px", width: "200px" }}
        ></CategoryRounded>
      </BackdropContainer>
      <ContentContainer>
        <MessagesList />
        <LoadingMessage />
        <ReloadButton />
      </ContentContainer>
      <Spacer />
      {isLoading ? <LinearProgress /> : null}
    </Container>
  );
};

export default Conversation;
