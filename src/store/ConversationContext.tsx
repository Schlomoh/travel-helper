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
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const advanceConversation = (message: Message | Trip, prompt?: string) => {
    const userMessage = { ...message, prompt: prompt };
    setConversation(
      (previousMessages) => [...previousMessages, userMessage] as Conversation
    );
  };

  const updateFetchState = (isLoading: boolean, hasError: boolean) => {
    setLoading(isLoading);
    setError(hasError);
  };

  return {
    advanceConversation,
    conversation,
    setConversation,
    isLoading,
    hasError,
    updateFetchState,
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
