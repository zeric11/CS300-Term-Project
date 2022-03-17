This is the Accord Chat App I created with the MERN stack.


The main repository contains two folders: backend and frontend.
The backend contains the server and routes files that are 
responsible for sending data and accepting user input from 
the client, as well as storing and retrieving database entries
from MongoDB. The frontend folder houses functions that are 
responsible for page display, processing user input, user
authentication, and password encryption. 


Installation:

	To install the backend dependencies, use
	
		npm i
	
	inside the backend folder.
	
	To install the front dependencies, use
	
		npm i
	
	inside the frontend folder.
	
	
How to Use:

	After installation, use 
	
		npm start 
		
	in both the backend and frontend folders
	to open the applicaiton.
	

Testing:

	Testing was done using Jest. Four tests were scriped in 
	api.test.js in the backend folder. The first test tested
	the user api for signing up (creating a user), signing in 
	(authenticating a user) and deleting a user. The second test 
	tested the chat api for creating a new chatroom, retrieving a 
	chat, removing a user from the chat, adding a user, renaming 
	the chat, and deleting the chatroom. The third test tested 
	the message api for sending, retrieving, and deleting a 
	message.

	To run the tests, use
	
		npm test
		
	within the backend folder. Note that in order 
	to run the tests, the backend must be running.
	

This being my first time working with JavaScript and the MERN 
stack, many online resources were used to help guide me in the
development of this application. 

Furthermore, there are still some bugs in the project that I have 
yet to fixed (particularly in the front end):

	- Searching for a username to add will only list the 
	  current username, but clicking on the listings will 
	  still add the user correctly.
	  
	- Renaming the chatroom does not change the chat's name.


Here are some of the resources that I found to be the most helpful for this project:

	https://www.youtube.com/watch?v=mrHNSanmqQ4&t=2400s
	
	https://www.youtube.com/watch?v=7CqJlxBYj-M&t=36s
	
	https://www.youtube.com/watch?v=gzdQDxzW2Tw
	
	https://www.youtube.com/watch?v=3vRcB0P84t4&list=PLKhlp2qtUcSZsGkxAdgnPcHioRr-4guZf
	
	https://www.youtube.com/watch?v=ZwFA3YMfkoc&t=1768s
	
	https://javascript.plainenglish.io/build-your-own-realtime-chat-app-with-mern-stack-c5908ba75126
