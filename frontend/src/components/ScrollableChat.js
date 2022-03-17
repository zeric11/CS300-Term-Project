import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "./ChatProvider";


const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages && messages.map((message, i) => (
                <div style={{ display: "flex" }} key={message._id}>
                    <span
                        style={{
                                backgroundColor: `${message.sender._id === user._id ? "#3484cc" : "#4cbc7c"}`,
                                marginLeft: `${message.sender._id === user._id ? "auto" : "0px"}`,
                                marginTop: "10px",
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                        }} >
                        {message.sender.username + ": " + message.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    );
};


export default ScrollableChat;
