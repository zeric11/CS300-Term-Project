import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { ChatState } from "./ChatProvider";


function TopBar() {
    const {
        setSelectedChat,
        notification,
        setNotification,
    } = ChatState();
    
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const history = useHistory();

    const signoutHandler = () => {
        window.localStorage.clear();
        history.push("/");
    };

    return (
        <>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="#3e3e3eff"
                w="100%"
                p="5px 10px 5px 10px"
                borderColor="#3e3e3eff"
                borderWidth="5px">
                <Text fontSize="2xl" fontFamily="Work sans" justifyContent={"center"} color="#e1e1e1ff">
                    Accord
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1} color="#e1e1e1ff">
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg="#626262ff" >
                            {user.username}
                        </MenuButton>
                        <MenuList bg="#4d4d4dff" borderColor={"#4d4d4dff"}>
                            <MenuItem onClick={signoutHandler}>Sign Out</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
        </>
    );
}


export default TopBar;
