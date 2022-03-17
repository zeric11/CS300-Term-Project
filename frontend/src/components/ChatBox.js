import { Box } from "@chakra-ui/layout";
import "./styles.css";
import Chat from "./Chat";
import { ChatState } from "./ChatProvider";


const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();

    return (
        <Box
            d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="#626262ff"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={"#626262ff"}
        >
            <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
};


export default Chatbox;
