import { useCallback, useContext, useEffect, useState } from "react";
import { Message, OpenAiResponse } from "../types/openAi";
import { ConversationContext } from "../store";
import { Trip } from "../types/trip";

const KEY = import.meta.env.VITE_OPEN_AI_KEY as string;
const URL = "https://api.openai.com/v1/chat/completions";

const EXAMPLE = `interface TravelPlan{
      [day: string]: {
        activityName: string;
        specificLocation: string;
        plannedTime: string;
        description: string;
    }[]
    }
   `;

const createMessage = (msg: string, role: Message["role"]): Message => {
  return {
    role,
    content: `Please create only the itinerary from the user's message: "${msg}".`,
  };
};

const send = async (newMessage: Message, conversation: Message[]) => {
  const options = {
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
            "Act as an expert travel planer AI. You are travelGPT. As a smart itinerary planner with extensive knowledge of places around the world, your task is to determine the user's travel destinations and any specific interests or preferences from their message. Create an itinerary that caters to the user's needs, making sure to name all activities, restaurants, and attractions specifically. When creating the itinerary, also consider factors such as time constraints and transportation options. Additionally, all attractions and restaurants listed in the itinerary must exist and be named specifically. During subsequent revisions, the itinerary can be modified, while keeping in mind the practicality of the itinerary. New place for each day. It's important to ensure that the number of activities per day is appropriate, and if the user doesn't specify otherwise, the default itinerary length is five days. The itinerary length should remain the same unless there is a change by the user's message.",
        },
        {
          role: "system",
          content: `Format your response as a JSON object and use this typescript interface as a reference: ${EXAMPLE}`,
        },
        ...conversation,
        newMessage,
      ],
    }),
  } as RequestInit;

  const response = await fetch(URL, options);
  return (await response.json()) as OpenAiResponse;
};

const useOpenAi = () => {
  const { conversation, advanceConversation } = useContext(ConversationContext);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [prompt, setPrompt] = useState("");

  const callApi = useCallback(async () => {
    const newMessage = createMessage(prompt, "user");

    advanceConversation(newMessage); // update context with user message
    const { choices } = await send(newMessage, conversation); // send new user Message
    const travelRecommendation = JSON.parse(choices[0].message.content) as Trip;
    console.log(travelRecommendation);
    advanceConversation(choices[0].message); // update context with open ai response

    setShouldFetch(false);
  }, [prompt]);

  useEffect(() => {
    if (shouldFetch) void callApi();
  }, [callApi, shouldFetch]);

  return (prompt: string) => {
    setShouldFetch(true);
    setPrompt(prompt);
  };
};

export default useOpenAi;
