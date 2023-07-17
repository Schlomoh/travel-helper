import { ReactNode, createContext, useState } from "react";
import { Message } from "../types/openAi";
import { Trip } from "../types/trip";
import { useOpenAi } from "../utils";

interface Props {
  children: ReactNode;
}

interface PromptMessage extends Partial<Message>, Partial<Trip> {
  prompt?: string;
}

export type Conversation = PromptMessage[];

type TConversationContext = ReturnType<typeof useConversationContext>;
const useConversationContext = () => {
  const [conversation, setConversation] = useState<Conversation>([]);
  const { send, resend, isLoading, hasError } = useOpenAi({conversation, setConversation});

  return {
    send,
    resend,
    conversation,
    setConversation,
    isLoading,
    hasError,
  };
};

export const ConversationContext = createContext({} as TConversationContext);

const ConversationContextProvider = ({ children }: Props) => {
  const value = useConversationContext();
  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
