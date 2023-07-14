import { ReactNode, createContext, useState } from "react";
import { Message } from "../types/openAi";

interface Props {
  children: ReactNode;
}

type TConversationContext = ReturnType<typeof useConversationContext>;
export const ConversationContext = createContext({} as TConversationContext);

const useConversationContext = () => {
  const [conversation, setConversation] = useState<Message[]>([]);

  const advanceConversation = (messages: Message) => {
    setConversation((previousMessages) => [...previousMessages, messages]);
  };

  return {
    advanceConversation,
    conversation,
    setConversation,
  };
};

const ConversationContextProvider = ({ children }: Props) => {
  const value = useConversationContext();
  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
