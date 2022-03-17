import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {
    const toast = useToast();
    const history = useHistory();

    const [username, setUsername] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        setLoading(true);
        if (!username || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:8000/api/user/signup", {
                    username: username,
                    password: password,
                }, {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );
            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
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

            <FormControl id="confirmPassword">
                <FormLabel>
                    Confirm Password
                </FormLabel>
                <Input 
                    placeholder='Enter Password Again'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </FormControl>

            <Button
                colorScheme={"blue"}
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;
