import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import CreateChatModal from "../modals/CreateChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "./ChatProvider";


const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    var user = JSON.parse(localStorage.getItem("userInfo"));
    const toast = useToast();

    const getChats = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/chat", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(data);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        getChats();
    }, [fetchAgain]);

    return (
        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="#323232ff"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={"#323232ff"}
            color="#e1e1e1ff"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "24px" }}
                fontFamily="Work sans"
                d="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                color="#e1e1e1ff"
            >
                My Chatrooms
                <CreateChatModal>
                    <Button
                        d="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                        bg="#323232ff"
                        color="#e1e1e1ff"
                    >
                        New
                    </Button>
                </CreateChatModal>
            </Box>
            <Box
                d="flex"
                flexDir="column"
                p={3}
                bg="#626262ff"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
                alignItems="center"
                fontSize={{ base: "28px", md: "24px" }}
            >
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "blue.500" : "#626262ff"}
                                color={selectedChat === chat ? "e1e1e1ff" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                            >
                                <Text>
                                    {chat.chatName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    );
};


export default MyChats;
