import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Message, OpenAiResponse } from "../types/openAi";
import { Trip } from "../types/trip";
import { Conversation } from "../store/ConversationContext";
import useCallApi, { CustomOptions } from "./useCallApi";

interface ConversationState {
  conversation: Conversation;
  setConversation: Dispatch<SetStateAction<Conversation>>;
}

const KEY = import.meta.env.VITE_OPEN_AI_KEY as string;
const URL = "https://api.openai.com/v1/chat/completions";

const EXAMPLE = `
interface Trip {
  message: string;
  estimatedTotalPrice: number;
  days: {
    [day: string]: {
      activityName: string;
      specificLocation: string; // as "location_name - city, country code"
      plannedTime: string;
      description: string;
      estimatedPrice: number;
    }[];
  }
}`;

function createMessage(msg: string, role: Message["role"]): Message {
  return {
    role,
    content: `Please create only the itinerary from the users' message: "${msg}"`,
  };
}

function createOptions(msg: Message, conversation: Conversation) {
  return {
    url: URL,
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "Act as a friendly expert travel planer AI. You are travelGPT. As a smart itinerary planner with extensive knowledge of places around the world, your task is to determine the user's travel activities based on their specific interests or preferences.",
        },
        {
          role: "system",
          content:
            "Estimate an appropriate price per activity and a total sum of all the combined ativity prices. You should consider all costly factors of the trip. Make te estimates as close to reality as possible",
        },
        {
          role: "system",
          content:
            "Create an itinerary that caters to the user's needs, making sure to name all activities, restaurants, and attractions specifically. When creating the itinerary, also consider factors such as time constraints and transportation options. Additionally, all attractions and restaurants listed in the itinerary must exist and be named specifically. During subsequent revisions, the itinerary can be modified, while keeping in mind the practicality of the itinerary. New place or activities for each day. It's important to ensure that the number of activities per day is appropriate, and if the user doesn't specify otherwise, the default itinerary length is 3 days. The itinerary length should remain the same unless there is a change by the user's message.",
        },
        {
          role: "system",
          content: `Format your response as a valid JSON object and use this typescript interface as a reference: ${EXAMPLE} -  NO CONVERSATION OUTSIDE OF THE JSON OBJECT RESPONSE. ENSURE THAT THE RESPONSE IS A VALID JSON OBJECT.`,
        },
        ...conversation.map((item) => ({
          role: item.role,
          content: item.content || JSON.stringify(item),
        })),
        msg,
      ],
    }),
  } as CustomOptions;
}

const useOpenAi = ({ conversation, setConversation }: ConversationState) => {
  const { data, hasError, setError, isLoading, setLoading, send, clear } =
    useCallApi<OpenAiResponse>();

  const advanceConversation = useCallback(
    (message: Message | Trip, prompt?: string) => {
      const userMessage = { ...message, prompt: prompt };
      setConversation(
        (previousMessages) => [...previousMessages, userMessage] as Conversation
      );
    },
    [setConversation]
  );

  const handlePrompt = (prompt: string) => {
    const newMessage = createMessage(prompt, "user");
    advanceConversation(newMessage, prompt); // update context with user message
    send(createOptions(newMessage, conversation)); // send new user Message
  };

  const resend = () => {
    const message = conversation.slice(-1)[0];
    const cleanedConv = conversation.slice(0, -1);

    send(
      createOptions(
        { content: message.content!, role: message.role! },
        cleanedConv
      )
    );
  };

  useEffect(() => {
    if (data) {
      const { choices } = data;

      try {
        const travelRecommendation = JSON.parse(choices[0].message.content) as Trip; // prettier-ignore
        advanceConversation({ ...travelRecommendation, role: "assistant" }); // update context with open ai response
      } catch (e) {
        setError(true);
        setLoading(false);
      }

      clear();
    }
  }, [advanceConversation, clear, data, setError, setLoading]);

  return {
    send: handlePrompt,
    resend,
    isLoading,
    hasError,
  };
};

export default useOpenAi;
