import { styled } from "@mui/material";
import { Conversation, PromptField } from "../components";
import { useContext, useEffect } from "react";
import { ConversationContext } from "../store/ConversationContext";

const PageContainer = styled("main")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: calc(100% - 2rem);
  margin: 0 1rem;
  padding: 1rem 0;

  @media screen and (min-width: 600px) {
    width: 50%;
    left: 50%;
    translate: -50% 0;
  }
`;

const Home = () => {
  const { conversation } = useContext(ConversationContext);

  useEffect(() => {
    console.log(conversation);
  }, [conversation]);

  return (
    <PageContainer>
      <Conversation></Conversation>
      <PromptField></PromptField>
    </PageContainer>
  );
};

export default Home;
