import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Signin from "../authentication/Signin";
import Signup from "../authentication/Signup";


function Homepage() {
    const history = useHistory();

    return (
        <Container maxW="container.xl" centerContent>
            <Box
                display={"flex"}
                justifyContent={"center"}
                padding={3}
                background={"#454545ff"}
                width={"40%"}
                margin={"40px 0 15px 0"}
                borderRadius={"1g"}
                border={"black"}
                borderWidth={"2px"}
                boxShadow={"lg"}
                rounded={"md"}
                color={"#e1e1e1ff"}
            >
                <Text fontSize="4xl" fontFamily="Work sans">
                    Accord
                </Text>
            </Box>

            <Box display={"flex"}
                justifyContent={"center"}
                padding={4}
                background={"#454545ff"}
                width={"40%"}
                borderRadius={"1g"}
                border={"black"}
                borderWidth={"2px"}
                boxShadow={"lg"}
                rounded={"md"}
                color={"#e1e1e1ff"} >
                <Tabs isFitted variant='unstyled'>
                    <TabList marginBottom={"1em"} >
                        <Tab  _selected={{ color: 'white', bg: 'blue.500' }}>Sign In</Tab>
                        <Tab  _selected={{ color: 'white', bg: 'green.400' }}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Signin/>
                        </TabPanel>
                        <TabPanel>
                            <Signup/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
}


export default Homepage;
