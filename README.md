** Tech Stack: 

 *** Front-end:
 1. React
 2. Material-UI
 3. Tailwind
 4. Axios
 5. JS-Cookie
 6. React-router-dom
 7. Redux
    
*** Backend:
1. Node
2. JWT Token
3. Mongoose
4. Firebase (For google auth and data storage)
5. Cors

** Features: 
1) User Authentication System 
1. A secure authentication system is provided which included user registration using email and password. This is made using JWT Token. The JWT Token is signed in the Node and sent to frontend for authorisation. The token is then stored in MongoDB.
2. Google Authentication: The Authentication can also be done using Google. I used Firebase for this purpose. Firebase allows us to integrate google auth securely.
3. Forgot Password: In case the user forgets his/her password, by clicking on forgot password, he will receive an email to reset his password.
4. Logout: The user can logout at any time and will be redirected to login page. In this I added a feature using Cookies that, if the user doesn’t log out and tries to reach home screen, it can do so. And if he logout and then tries to reach home page then it will redirect it to login page only. This secure functionality was achieved by adding token in Cookies.


2) Secret Posting Section
1. Home Screen: A user-friendly home screen is made using React, MUI and Tailwind.
2. Navbar: Navbar contains facility of Home, Logout and displaying the Username. The Username is displayed using Redux and is stored in JS-Cookies. Redux allows me to use the name anywhere in the website using useSelector while Cookie allows me to store the name in a cookie so that even on refreshing the page, the name is still available.
3. Send Post: Each user is allowed to post one Secret and either press Enter or Post button to post it. These posts are stored in Firebase.
4. Real-Time Posting: The showstopper of my website is that the posts will load as soon as any user sends it without refreshing the page. This functionality, which is usually achieved by socket io, was achieved using Firebase Snapshot feature.
5. Post Display and Anonymous behaviour: The Posts are displayed anonymously, ie without revealing the identity of the sender.
6. Deleting Post: Each Post card contains a feature of delete post, and a pop up will appear asking for the confirmation. This is handled in Firebase.


3) Responsiveness:
•	The website is completely responsive and can be used in your smart phones.


4) Deployemnt : Vercel is used for deploying both frontend and backend.


** How to use ?
1. Login with email or password or directly with google.
2. Home screen will be displayed where your name will be displayed in the top right corner.
3. Write your secrete in the text filed and post it.
4. Your post along with everyone's post will be displayed in the post section.

Website URL
https://whisperwalls.vercel.app/

GitHub Link:
Frontend: https://github.com/ananyagrwl/whisper_walls_frontend
Backend: https://github.com/ananyagrwl/whisper_walls_backend

Documentation Link :
https://docs.google.com/document/d/1VXMnJqQeUWCFOmuPKHWDGoYnKcphkAHM/edit?usp=sharing&ouid=102832276304791531927&rtpof=true&sd=true


Thanking You,
Ananya Agrawal
ananya88agrawal@gmail.com
+91 8878331661
https://github.com/ananyagrwl
https://www.linkedin.com/in/ananya-agrawal-65b1b7252/



