import { useContext } from "react";
import { ConversationContext } from "../../store/ConversationContext";

const Conversation = () => {
  const { conversation } = useContext(ConversationContext);
  return (
    <div>
      {conversation.map((message, i) => (
        <p key={i}>{message.content}</p>
      ))}
    </div>
  );
};

export default Conversation;
