import { HamburgerIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
    IconButton,
    Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../components/ChatProvider";
import BadgeItem from "../user/BadgeItem";
import ListItem from "../user/ListItem";


const UpdateChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chatName, groupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();

    const { selectedChat, setSelectedChat } = ChatState();
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8000/api/user?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setLoading(false);
        }
    };

    const handleRename = async () => {
        if (!chatName) {
            return;
        }
        try {
            setRenameLoading(true);
            const { data } = await axios.put(`http://localhost:8000/api/chat/rename`, {
                    chatId: selectedChat._id,
                    chatName: chatName,
                }, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            console.log(data._id);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setRenameLoading(false);
        }
        groupChatName("");
    };

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User Already in group!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (selectedChat.admin._id !== user._id) {
            toast({
                title: "Only admins can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);
            const { data } = await axios.put(`http://localhost:8000/api/chat/add`, {
                    chatId: selectedChat._id,
                    userId: user1._id,
                }, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            console.log(data);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        groupChatName("");
    };

    const handleRemove = async (user1) => {
        if (selectedChat.admin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(`http://localhost:8000/api/chat/remove`, {
                    chatId: selectedChat._id,
                    userId: user1._id,
                }, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            console.log(data);
            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        groupChatName("");
    };

    return (
        <>
            <IconButton d={{ base: "flex" }} icon={<HamburgerIcon />} onClick={onOpen} bg="#626262ff" />

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                        bg="#4d4d4dff"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center" bg="#4d4d4dff">
                        <Box w="100%" d="flex" flexWrap="wrap" pb={3} bg="#4d4d4dff">
                            {selectedChat.users.map((u) => (
                                <BadgeItem
                                    key={u._id}
                                    user={u}
                                    admin={selectedChat.admin}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </Box>
                        <FormControl d="flex" bg="#4d4d4dff">
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                value={chatName}
                                onChange={(e) => groupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                bg="blue.500"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>

                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResult?.map((user) => (
                                <ListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    </ModalBody>
                    <ModalFooter bg="#4d4d4dff" justifyContent="center">
                        <Button onClick={() => handleRemove(user)} bg="red">
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


export default UpdateChatModal;
