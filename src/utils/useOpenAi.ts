import { useContext, useEffect } from "react";
import { Message, OpenAiResponse } from "../types/openAi";
import { ConversationContext } from "../store";
import { Trip } from "../types/trip";
import { Conversation } from "../store/ConversationContext";
import useCallApi, { CustomOptions } from "./useCallApi";

const KEY = import.meta.env.VITE_OPEN_AI_KEY as string;
const URL = "https://api.openai.com/v1/chat/completions";

const EXAMPLE = `
interface Trip {
  message: string;
  days: {
    [day: string]: {
      activityName: string;
      specificLocation: string; // as "location_name - city, country code"
      plannedTime: string;
      description: string;
    }[];
  }
}`;

function createMessage(msg: string, role: Message["role"]): Message {
  return {
    role,
    content: `Please create only the itinerary from the users' message: "${msg}".`,
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
      messages: [
        {
          role: "system",
          content:
            "Act as a really friendly expert travel planer AI. You are travelGPT. As a smart itinerary planner with extensive knowledge of places around the world, your task is to determine the user's travel destinations and any specific interests or preferences from their message.",
        },
        {
          role: "system",
          content:
            "Create an itinerary that caters to the user's needs, making sure to name all activities, restaurants, and attractions specifically. When creating the itinerary, also consider factors such as time constraints and transportation options. Additionally, all attractions and restaurants listed in the itinerary must exist and be named specifically. During subsequent revisions, the itinerary can be modified, while keeping in mind the practicality of the itinerary. New place for each day. It's important to ensure that the number of activities per day is appropriate, and if the user doesn't specify otherwise, the default itinerary length is 5 days. The itinerary length should remain the same unless there is a change by the user's message.",
        },
        {
          role: "system",
          content: `Format your response as a valid JSON object and use this typescript interface as a reference: ${EXAMPLE} - ENSURE THAT THE RESPONSE IS A VALID JSON OBJECT`,
        },
        {
          role: "system",
          content: "heat: 0.35",
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

const useOpenAi = () => {
  const { conversation, advanceConversation, updateFetchState } =
    useContext(ConversationContext);
  const { data, hasError, isLoading, send, clear } =
    useCallApi<OpenAiResponse>();

  const handlePrompt = (prompt: string) => {
    const newMessage = createMessage(prompt, "user");
    advanceConversation(newMessage, prompt); // update context with user message
    send(createOptions(newMessage, conversation)); // send new user Message
  };

  useEffect(() => {
    if (data) {
      const { choices } = data;
      try {
        const travelRecommendation = JSON.parse(choices[0].message.content) as Trip; // prettier-ignore
        advanceConversation({ ...travelRecommendation, role: "assistant" }); // update context with open ai response
      } catch (e) {
        updateFetchState(false, true);
      }
      clear();
    }
  }, [advanceConversation, clear, data, updateFetchState]);

  useEffect(() => {
    updateFetchState(isLoading, hasError);
  }, [isLoading, hasError, updateFetchState]);

  return {
    send: handlePrompt,
    isLoading,
    hasError,
  };
};

export default useOpenAi;
