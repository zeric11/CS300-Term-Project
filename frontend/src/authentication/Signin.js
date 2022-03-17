import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Signin = () => {
    const toast = useToast();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const submitHandler = async () => {
        setLoading(true);
        if (!username || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:8000/api/user/signin", { 
                    username: username, password 
                }, {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );
            console.log(data);
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            window.localStorage.clear();
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
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
    };

    return (
        <VStack spacing="15px" color="#e1e1e1ff" width={"400px"}>
            <FormControl id="username">
                <FormLabel>
                    Username
                </FormLabel>
                <Input 
                    placeholder='Enter Username'
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>

            <FormControl id="password">
                <FormLabel>
                    Password
                </FormLabel>
                <Input 
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>

            <Button
                colorScheme={"blue"}
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign In
            </Button>
        </VStack>
    );
};

export default Signin;
