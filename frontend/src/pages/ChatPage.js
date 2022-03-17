import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../components/ChatProvider";
import TopBar from "../components/TopBar";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";


const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
  
    return (
        <div style={{ width: "100%" }}>
            {user && <TopBar />}
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && ( <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
            </Box>
        </div>
    );
};
  

export default Chatpage;
