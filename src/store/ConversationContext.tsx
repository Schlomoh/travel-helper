import { ReactNode, createContext, useState } from "react";
import { Message } from "../types/openAi";
import { Trip } from "../types/trip";

interface Props {
  children: ReactNode;
}

interface PromptMessage extends Partial<Message>, Partial<Trip> {
  prompt?: string;
}

export type Conversation = PromptMessage[];

type TConversationContext = ReturnType<typeof useConversationContext>;
export const ConversationContext = createContext({} as TConversationContext);

const useConversationContext = () => {
  const [conversation, setConversation] = useState<Conversation>([]);

  const advanceConversation = (message: Message | Trip, prompt?: string) => {
    const userMessage = { ...message, prompt: prompt };
    setConversation(
      (previousMessages) => [...previousMessages, userMessage] as Conversation
    );
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
