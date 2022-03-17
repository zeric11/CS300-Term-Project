const axios = require("axios");


it("Tests signup and signin", async () => {
    const username1 = "testuser1";
    const password1 = "testpassword1";

    const username2 = "testuser2";
    const password2 = "testpassword2";

    const username3 = "testuser3";
    const password3 = "testpassword3";

    try {
        // Create users 1, 2, and 3
        const signupRes1 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username1, 
                password: password1
            }
        );
        expect(signupRes1.data.username).toEqual(username1);

        const signupRes2 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username2, 
                password: password2
            }
        );
        expect(signupRes2.data.username).toEqual(username2);

        const signupRes3 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username3, 
                password: password3
            }
        );
        expect(signupRes3.data.username).toEqual(username3);


        // Signin users 1, 2, and 3
        const signinRes1 = await axios.post("http://localhost:8000/api/user/signin", 
            { 
                username: username1, 
                password: password1
            }
        );
        expect(signinRes1.data.username).toEqual(username1);
        expect(signinRes1.data._id).toEqual(signupRes1.data._id);

        const signinRes2 = await axios.post("http://localhost:8000/api/user/signin", 
            { 
                username: username2, 
                password: password2
            }
        );
        expect(signinRes2.data.username).toEqual(username2);
        expect(signinRes2.data._id).toEqual(signupRes2.data._id);

        const signinRes3 = await axios.post("http://localhost:8000/api/user/signin", 
            { 
                username: username3, 
                password: password3
            }
        );
        expect(signinRes3.data.username).toEqual(username3);
        expect(signinRes3.data._id).toEqual(signupRes3.data._id);


        // Remove users 1, 2, and 3
        var _id = signupRes1.data._id;
        const deleteRes1 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});
        expect(deleteRes1.status).toEqual(200);
        expect(deleteRes1.data.deletedCount).toEqual(1);

        var _id = signupRes2.data._id;
        const deleteRes2 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});
        expect(deleteRes2.status).toEqual(200);
        expect(deleteRes2.data.deletedCount).toEqual(1);

        var _id = signupRes3.data._id;
        const deleteRes3 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});
        expect(deleteRes3.status).toEqual(200);
        expect(deleteRes3.data.deletedCount).toEqual(1);
    } catch(error) {
        throw new Error(error.message);
    }
});


it("Tests creating and updating chatrooms", async () => {
    const username1 = "testuser1";
    const password1 = "testpassword1";

    const username2 = "testuser2";
    const password2 = "testpassword2";

    const username3 = "testuser3";
    const password3 = "testpassword3";

    const chatName = "testchat";
    const newChatName = "newtestchat"

    try {
        // Create users 1, 2, and 3
        const signupRes1 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username1, 
                password: password1
            }
        );

        const signupRes2 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username2, 
                password: password2
            }
        );

        const signupRes3 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username3, 
                password: password3
            }
        );


        // Create the chat
        const users = JSON.stringify([signupRes2.data._id, signupRes3.data._id]);
        const createChatRes = await axios.post("http://localhost:8000/api/chat/create", 
            { 
                name: chatName, 
                users: users 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(createChatRes.data.chatName).toEqual(chatName);
        expect(createChatRes.data.admin._id).toEqual(signupRes1.data._id);
        expect(createChatRes.data.admin.username).toEqual(username1);
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(createChatRes.data.users[0]._id);
        expect([username1, username2, username3])
            .toContain(createChatRes.data.users[0].username);  
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(createChatRes.data.users[1]._id);
        expect([username1, username2, username3])
            .toContain(createChatRes.data.users[1].username);    
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(createChatRes.data.users[2]._id);
        expect([username1, username2, username3])
            .toContain(createChatRes.data.users[2].username); 


        // Retrieve the chat
        const getChatsRes = await axios.get("http://localhost:8000/api/chat", 
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(getChatsRes.data[0]._id).toEqual(createChatRes.data._id);
        expect(getChatsRes.data[0].chatName).toEqual(chatName);
        expect(getChatsRes.data[0].admin._id).toEqual(signupRes1.data._id);
        expect(getChatsRes.data[0].admin.username).toEqual(username1);
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(getChatsRes.data[0].users[0]._id);
        expect([username1, username2, username3])
            .toContain(getChatsRes.data[0].users[0].username);  
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(getChatsRes.data[0].users[1]._id);
        expect([username1, username2, username3])
            .toContain(getChatsRes.data[0].users[1].username);    
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(getChatsRes.data[0].users[2]._id);
        expect([username1, username2, username3])
            .toContain(getChatsRes.data[0].users[2].username);    


        // Remove a user
        const removeUserRes = await axios.put("http://localhost:8000/api/chat/remove", 
            {
                chatId: createChatRes.data._id,
                userId: signupRes3.data._id
            },
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(removeUserRes.data._id).toEqual(createChatRes.data._id);
        expect(removeUserRes.data.chatName).toEqual(chatName);
        expect(removeUserRes.data.admin._id).toEqual(signupRes1.data._id);
        expect(removeUserRes.data.admin.username).toEqual(username1);
        expect([signupRes1.data._id, signupRes2.data._id])
            .toContain(removeUserRes.data.users[0]._id);
        expect([username1, username2])
            .toContain(removeUserRes.data.users[0].username); 
        expect([signupRes1.data._id, signupRes2.data._id])
            .toContain(removeUserRes.data.users[1]._id);
        expect([username1, username2])
            .toContain(removeUserRes.data.users[1].username);    
        expect([removeUserRes.data.users[0]._id, removeUserRes.data.users[1]._id])
            .not.toContain(signupRes3.data._id);   
        expect([removeUserRes.data.users[0].username, removeUserRes.data.users[1].username])
            .not.toContain(username3);  
            
            
        // Add a user
        const addUserRes = await axios.put("http://localhost:8000/api/chat/add", 
            {
                chatId: createChatRes.data._id,
                userId: signupRes3.data._id
            },
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(addUserRes.data._id).toEqual(createChatRes.data._id);
        expect(addUserRes.data.chatName).toEqual(chatName);
        expect(addUserRes.data.admin._id).toEqual(signupRes1.data._id);
        expect(addUserRes.data.admin.username).toEqual(username1);
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(addUserRes.data.users[0]._id);
        expect([username1, username2, username3])
            .toContain(addUserRes.data.users[0].username);  
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(addUserRes.data.users[1]._id);
        expect([username1, username2, username3])
            .toContain(addUserRes.data.users[1].username);   
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(addUserRes.data.users[2]._id);
        expect([username1, username2, username3])
            .toContain(addUserRes.data.users[2].username);  


        // Rename the chat
        const renameChatRes = await axios.put("http://localhost:8000/api/chat/rename", 
            {
                chatId: createChatRes.data._id,
                name: newChatName
            },
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(renameChatRes.data._id).toEqual(createChatRes.data._id);
        expect(renameChatRes.data.chatName).toEqual(chatName);
        expect(renameChatRes.data.admin._id).toEqual(signupRes1.data._id);
        expect(renameChatRes.data.admin.username).toEqual(username1);
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(renameChatRes.data.users[0]._id);
        expect([username1, username2, username3])
            .toContain(renameChatRes.data.users[0].username);  
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(renameChatRes.data.users[1]._id);
        expect([username1, username2, username3])
            .toContain(renameChatRes.data.users[1].username);    
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(renameChatRes.data.users[2]._id);
        expect([username1, username2, username3])
            .toContain(renameChatRes.data.users[2].username); 


        // Remove the chat
        var _id = createChatRes.data._id;
        const deleteChatRes = await axios.delete("http://localhost:8000/api/chat", { data: { _id }});
        expect(deleteChatRes.status).toEqual(200);
        expect(deleteChatRes.data.deletedCount).toEqual(1);


        // Remove users 1, 2, and 3
        var _id = signupRes1.data._id;
        const deleteRes1 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});

        var _id = signupRes2.data._id;
        const deleteRes2 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});

        var _id = signupRes3.data._id;
        const deleteRes3 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});
    } catch(error) {
        throw new Error(error.message);
    }
});


it("Tests sending messages", async () => {
    const username1 = "testuser1";
    const password1 = "testpassword1";

    const username2 = "testuser2";
    const password2 = "testpassword2";

    const username3 = "testuser3";
    const password3 = "testpassword3";

    const chatName = "testchat";

    const message1 = "This is test message 1";
    const message2 = "This is test message 2";
    const message3 = "This is test message 3";

    try {
        // Create users 1, 2, and 3
        const signupRes1 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username1, 
                password: password1
            }
        );

        const signupRes2 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username2, 
                password: password2
            }
        );

        const signupRes3 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username3, 
                password: password3
            }
        );


        // Create the chat
        const users = JSON.stringify([signupRes2.data._id, signupRes3.data._id]);
        const createChatRes = await axios.post("http://localhost:8000/api/chat/create", 
            { 
                name: chatName, 
                users: users 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );

        
        // Create the messages
        const sendMessageRes1 = await axios.post("http://localhost:8000/api/message", 
            { 
                content: message1, 
                chatId: createChatRes.data._id 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(sendMessageRes1.data.sender._id).toEqual(signupRes1.data._id);
        expect(sendMessageRes1.data.sender.username).toEqual(username1);
        expect(sendMessageRes1.data.content).toEqual(message1);
        expect(sendMessageRes1.data.chat._id).toEqual(createChatRes.data._id);

        const sendMessageRes2 = await axios.post("http://localhost:8000/api/message", 
            { 
                content: message2, 
                chatId: createChatRes.data._id 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes2.data.token}`
                }
            }
        );
        expect(sendMessageRes2.data.sender._id).toEqual(signupRes2.data._id);
        expect(sendMessageRes2.data.sender.username).toEqual(username2);
        expect(sendMessageRes2.data.content).toEqual(message2);
        expect(sendMessageRes2.data.chat._id).toEqual(createChatRes.data._id);

        const sendMessageRes3 = await axios.post("http://localhost:8000/api/message", 
            { 
                content: message3, 
                chatId: createChatRes.data._id 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes3.data.token}`
                }
            }
        );
        expect(sendMessageRes3.data.sender._id).toEqual(signupRes3.data._id);
        expect(sendMessageRes3.data.sender.username).toEqual(username3);
        expect(sendMessageRes3.data.content).toEqual(message3);
        expect(sendMessageRes3.data.chat._id).toEqual(createChatRes.data._id);


        // Get all messages
        const getMessagesRes = await axios.get(`http://localhost:8000/api/message/${createChatRes.data._id}`, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect([getMessagesRes.data[0].sender._id, getMessagesRes.data[1].sender._id, getMessagesRes.data[2].sender._id])
            .toContain(signupRes1.data._id);
        expect([getMessagesRes.data[0].sender._id, getMessagesRes.data[1].sender._id, getMessagesRes.data[2].sender._id])
            .toContain(signupRes2.data._id);
        expect([getMessagesRes.data[0].sender._id, getMessagesRes.data[1].sender._id, getMessagesRes.data[2].sender._id])
            .toContain(signupRes3.data._id);
        expect([getMessagesRes.data[0]._id, getMessagesRes.data[1]._id, getMessagesRes.data[2]._id])
            .toContain(sendMessageRes1.data._id);
        expect([getMessagesRes.data[0]._id, getMessagesRes.data[1]._id, getMessagesRes.data[2]._id])
            .toContain(sendMessageRes2.data._id);
        expect([getMessagesRes.data[0]._id, getMessagesRes.data[1]._id, getMessagesRes.data[2]._id])
            .toContain(sendMessageRes3.data._id);
        expect([getMessagesRes.data[0].content, getMessagesRes.data[1].content, getMessagesRes.data[2].content])
            .toContain(message1);
        expect([getMessagesRes.data[0].content, getMessagesRes.data[1].content, getMessagesRes.data[2].content])
            .toContain(message2);
        expect([getMessagesRes.data[0].content, getMessagesRes.data[1].content, getMessagesRes.data[2].content])
            .toContain(message3);
        expect(getMessagesRes.data[0].chat._id).toContain(createChatRes.data._id);
        expect(getMessagesRes.data[1].chat._id).toContain(createChatRes.data._id);
        expect(getMessagesRes.data[2].chat._id).toContain(createChatRes.data._id);
        expect(getMessagesRes.data[0].chat.chatName).toContain(chatName);
        expect(getMessagesRes.data[1].chat.chatName).toContain(chatName);
        expect(getMessagesRes.data[2].chat.chatName).toContain(chatName);


        // Remove the messages
        var _id = sendMessageRes1.data._id;
        const deleteMessageRes1 = await axios.delete("http://localhost:8000/api/message", { data: { _id }});
        expect(deleteMessageRes1.status).toEqual(200);
        expect(deleteMessageRes1.data.deletedCount).toEqual(1);

        var _id = sendMessageRes2.data._id;
        const deleteMessageRes2 = await axios.delete("http://localhost:8000/api/message", { data: { _id }});
        expect(deleteMessageRes2.status).toEqual(200);
        expect(deleteMessageRes2.data.deletedCount).toEqual(1);

        var _id = sendMessageRes3.data._id;
        const deleteMessageRes3 = await axios.delete("http://localhost:8000/api/message", { data: { _id }});
        expect(deleteMessageRes3.status).toEqual(200);
        expect(deleteMessageRes3.data.deletedCount).toEqual(1);


        // Remove the chat
        var _id = createChatRes.data._id;
        const deleteChatRes = await axios.delete("http://localhost:8000/api/chat", { data: { _id }});


        // Remove users 1, 2, and 3
        var _id = signupRes1.data._id;
        const deleteRes1 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});

        var _id = signupRes2.data._id;
        const deleteRes2 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});

        var _id = signupRes3.data._id;
        const deleteRes3 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});
    } catch(error) {
        throw new Error(error.message);
    }
});


it("Tests a sample Accord session between three users", async () => {
    const username1 = "testuser1";
    const password1 = "testpassword1";

    const username2 = "testuser2";
    const password2 = "testpassword2";

    const username3 = "testuser3";
    const password3 = "testpassword3";

    const chatName1 = "testchat1";
    const chatName2 = "testchat2";

    const message1 = "This is test message 1";
    const message2 = "This is test message 2";
    const message3 = "This is test message 3";
    const message4 = "This is test message 4";
    const message5 = "This is test message 5";

    try {
        // User1 and User2 create accounts
        const signupRes1 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username1, 
                password: password1
            }
        );
        expect(signupRes1.data.username).toEqual(username1);

        const signinRes1 = await axios.post("http://localhost:8000/api/user/signin", 
            { 
                username: username1, 
                password: password1
            }
        );
        expect(signinRes1.data.username).toEqual(username1);
        expect(signinRes1.data._id).toEqual(signupRes1.data._id);

        const signupRes2 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username2, 
                password: password2
            }
        );
        expect(signupRes2.data.username).toEqual(username2);

        const signinRes2 = await axios.post("http://localhost:8000/api/user/signin", 
            { 
                username: username2, 
                password: password2
            }
        );
        expect(signinRes2.data.username).toEqual(username2);
        expect(signinRes2.data._id).toEqual(signupRes2.data._id);


        // User1 creates a chat and invites User2
        const users1 = JSON.stringify([signupRes2.data._id]);
        const createChatRes1 = await axios.post("http://localhost:8000/api/chat/create", 
            { 
                name: chatName1, 
                users: users1 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(createChatRes1.data.chatName).toEqual(chatName1);
        expect(createChatRes1.data.admin._id).toEqual(signupRes1.data._id);
        expect(createChatRes1.data.admin.username).toEqual(username1);
        expect([signupRes1.data._id, signupRes2.data._id]).toContain(createChatRes1.data.users[0]._id);
        expect([username1, username2]).toContain(createChatRes1.data.users[0].username);  
        expect([signupRes1.data._id, signupRes2.data._id]).toContain(createChatRes1.data.users[1]._id);
        expect([username1, username2]).toContain(createChatRes1.data.users[1].username);    


        // User1 sends a message to User2 and User2 retrieves it
        const sendMessageRes1 = await axios.post("http://localhost:8000/api/message", 
            { 
                content: message1, 
                chatId: createChatRes1.data._id 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(sendMessageRes1.data.sender._id).toEqual(signupRes1.data._id);
        expect(sendMessageRes1.data.sender.username).toEqual(username1);
        expect(sendMessageRes1.data.content).toEqual(message1);
        expect(sendMessageRes1.data.chat._id).toEqual(createChatRes1.data._id);

        const getMessagesRes1 = await axios.get(`http://localhost:8000/api/message/${createChatRes1.data._id}`, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes2.data.token}`
                }
            }
        );
        expect(getMessagesRes1.data[0].sender._id).toEqual(signupRes1.data._id);
        expect(getMessagesRes1.data[0]._id).toEqual(sendMessageRes1.data._id);
        expect(getMessagesRes1.data[0].content).toEqual(message1);
        expect(getMessagesRes1.data[0].chat._id).toEqual(createChatRes1.data._id);
        expect(getMessagesRes1.data[0].chat.chatName).toEqual(chatName1);


        // User2 sends a message to User1 and User1 retrieves it
        const sendMessageRes2 = await axios.post("http://localhost:8000/api/message", 
            { 
                content: message2, 
                chatId: createChatRes1.data._id 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes2.data.token}`
                }
            }
        );
        expect(sendMessageRes2.data.sender._id).toEqual(signupRes2.data._id);
        expect(sendMessageRes2.data.sender.username).toEqual(username2);
        expect(sendMessageRes2.data.content).toEqual(message2);
        expect(sendMessageRes2.data.chat._id).toEqual(createChatRes1.data._id);

        const getMessagesRes2 = await axios.get(`http://localhost:8000/api/message/${createChatRes1.data._id}`, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes1.data.token}`
                }
            }
        );
        expect(getMessagesRes2.data[1].sender._id).toEqual(signupRes2.data._id);
        expect(getMessagesRes2.data[1]._id).toEqual(sendMessageRes2.data._id);
        expect(getMessagesRes2.data[1].content).toEqual(message2);
        expect(getMessagesRes2.data[1].chat._id).toEqual(createChatRes1.data._id);
        expect(getMessagesRes2.data[1].chat.chatName).toEqual(chatName1);


        // User3 signs up
        const signupRes3 = await axios.post("http://localhost:8000/api/user/signup", 
            { 
                username: username3, 
                password: password3
            }
        );
        expect(signupRes3.data.username).toEqual(username3);

        const signinRes3 = await axios.post("http://localhost:8000/api/user/signin", 
            { 
                username: username3, 
                password: password3
            }
        );
        expect(signinRes3.data.username).toEqual(username3);
        expect(signinRes3.data._id).toEqual(signupRes3.data._id);


        // User3 makes a chatroom and invites User2
        const users2 = JSON.stringify([signupRes2.data._id]);
        const createChatRes2 = await axios.post("http://localhost:8000/api/chat/create", 
            { 
                name: chatName2, 
                users: users2 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes3.data.token}`
                }
            }
        );
        expect(createChatRes2.data.chatName).toEqual(chatName2);
        expect(createChatRes2.data.admin._id).toEqual(signupRes3.data._id);
        expect(createChatRes2.data.admin.username).toEqual(username3);
        expect([signupRes3.data._id, signupRes2.data._id]).toContain(createChatRes2.data.users[0]._id);
        expect([username3, username2]).toContain(createChatRes2.data.users[0].username);  
        expect([signupRes3.data._id, signupRes2.data._id]).toContain(createChatRes2.data.users[1]._id);
        expect([username3, username2]).toContain(createChatRes2.data.users[1].username); 


        // User3 sends a message to User2 and User2 retrieves it
        const sendMessageRes3 = await axios.post("http://localhost:8000/api/message", 
            { 
                content: message3, 
                chatId: createChatRes2.data._id 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes3.data.token}`
                }
            }
        );
        expect(sendMessageRes3.data.sender._id).toEqual(signupRes3.data._id);
        expect(sendMessageRes3.data.sender.username).toEqual(username3);
        expect(sendMessageRes3.data.content).toEqual(message3);
        expect(sendMessageRes3.data.chat._id).toEqual(createChatRes2.data._id);

        const getMessagesRes3 = await axios.get(`http://localhost:8000/api/message/${createChatRes2.data._id}`, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes2.data.token}`
                }
            }
        );
        expect(getMessagesRes3.data[0].sender._id).toEqual(signupRes3.data._id);
        expect(getMessagesRes3.data[0]._id).toEqual(sendMessageRes3.data._id);
        expect(getMessagesRes3.data[0].content).toEqual(message3);
        expect(getMessagesRes3.data[0].chat._id).toEqual(createChatRes2.data._id);
        expect(getMessagesRes3.data[0].chat.chatName).toEqual(chatName2);


        // User2 sends a message to User3 and User3 retrieves it
        const sendMessageRes4 = await axios.post("http://localhost:8000/api/message", 
            { 
                content: message4, 
                chatId: createChatRes2.data._id 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes2.data.token}`
                }
            }
        );
        expect(sendMessageRes4.data.sender._id).toEqual(signupRes2.data._id);
        expect(sendMessageRes4.data.sender.username).toEqual(username2);
        expect(sendMessageRes4.data.content).toEqual(message4);
        expect(sendMessageRes4.data.chat._id).toEqual(createChatRes2.data._id);

        const getMessagesRes4 = await axios.get(`http://localhost:8000/api/message/${createChatRes2.data._id}`, 
            {
                headers: {
                    Authorization: `Bearer ${signupRes3.data.token}`
                }
            }
        );
        expect(getMessagesRes4.data[1].sender._id).toEqual(signupRes2.data._id);
        expect(getMessagesRes4.data[1]._id).toEqual(sendMessageRes4.data._id);
        expect(getMessagesRes4.data[1].content).toEqual(message4);
        expect(getMessagesRes4.data[1].chat._id).toEqual(createChatRes2.data._id);
        expect(getMessagesRes4.data[1].chat.chatName).toEqual(chatName2);


        // User1 is added to the new chatroom
        // Add a user
        const addUserRes = await axios.put("http://localhost:8000/api/chat/add", 
            {
                chatId: createChatRes2.data._id,
                userId: signupRes1.data._id
            },
            {
                headers: {
                    Authorization: `Bearer ${signupRes3.data.token}`
                }
            }
        );
        expect(addUserRes.data._id).toEqual(createChatRes2.data._id);
        expect(addUserRes.data.chatName).toEqual(chatName2);
        expect(addUserRes.data.admin._id).toEqual(signupRes3.data._id);
        expect(addUserRes.data.admin.username).toEqual(username3);
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(addUserRes.data.users[0]._id);
        expect([username1, username2, username3])
            .toContain(addUserRes.data.users[0].username);  
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(addUserRes.data.users[1]._id);
        expect([username1, username2, username3])
            .toContain(addUserRes.data.users[1].username);   
        expect([signupRes1.data._id, signupRes2.data._id, signupRes3.data._id])
            .toContain(addUserRes.data.users[2]._id);
        expect([username1, username2, username3])
            .toContain(addUserRes.data.users[2].username);  


        // Remove the messages
        var _id = sendMessageRes1.data._id;
        const deleteMessageRes1 = await axios.delete("http://localhost:8000/api/message", { data: { _id }});
        expect(deleteMessageRes1.status).toEqual(200);
        expect(deleteMessageRes1.data.deletedCount).toEqual(1);

        var _id = sendMessageRes2.data._id;
        const deleteMessageRes2 = await axios.delete("http://localhost:8000/api/message", { data: { _id }});
        expect(deleteMessageRes2.status).toEqual(200);
        expect(deleteMessageRes2.data.deletedCount).toEqual(1);

        var _id = sendMessageRes3.data._id;
        const deleteMessageRes3 = await axios.delete("http://localhost:8000/api/message", { data: { _id }});
        expect(deleteMessageRes3.status).toEqual(200);
        expect(deleteMessageRes3.data.deletedCount).toEqual(1);

        var _id = sendMessageRes4.data._id;
        const deleteMessageRes4 = await axios.delete("http://localhost:8000/api/message", { data: { _id }});
        expect(deleteMessageRes4.status).toEqual(200);
        expect(deleteMessageRes4.data.deletedCount).toEqual(1);

        // Remove the chats
        var _id = createChatRes1.data._id;
        const deleteChatRes1 = await axios.delete("http://localhost:8000/api/chat", { data: { _id }});
        expect(deleteChatRes1.status).toEqual(200);
        expect(deleteChatRes1.data.deletedCount).toEqual(1);

        var _id = createChatRes2.data._id;
        const deleteChatRes2 = await axios.delete("http://localhost:8000/api/chat", { data: { _id }});
        expect(deleteChatRes2.status).toEqual(200);
        expect(deleteChatRes2.data.deletedCount).toEqual(1);


        // Remove users 1, 2, and 3
        var _id = signupRes1.data._id;
        const deleteRes1 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});
        expect(deleteRes1.status).toEqual(200);
        expect(deleteRes1.data.deletedCount).toEqual(1);

        var _id = signupRes2.data._id;
        const deleteRes2 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});
        expect(deleteRes2.status).toEqual(200);
        expect(deleteRes2.data.deletedCount).toEqual(1);

        var _id = signupRes3.data._id;
        const deleteRes3 = await axios.delete("http://localhost:8000/api/user", { data: { _id }});
        expect(deleteRes3.status).toEqual(200);
        expect(deleteRes3.data.deletedCount).toEqual(1);
    } catch(error) {
        throw new Error(error.message);
    }
});