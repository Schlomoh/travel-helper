import { styled } from "@mui/material";
import { Conversation, PromptField } from "../components";

const PageContainer = styled("main")`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height:100%;
  width: calc(100% - 2rem);
  margin: 0 1rem;
  padding: 1rem 0;

  @media screen and (min-width: 600px) {
    width: 75%;
    left: 50%;
    translate: calc(-50% - 1rem) 0;
  }

  @media screen and (min-width: 1300px) {
    width: 50%;
    left: 50%;
    translate: calc(-50% - 1rem) 0;
  }
`;

const Home = () => {
  return (
    <PageContainer>
      <Conversation></Conversation>
      <PromptField></PromptField>
    </PageContainer>
  );
};

export default Home;
