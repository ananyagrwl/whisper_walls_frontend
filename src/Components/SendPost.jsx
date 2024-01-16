import { Button } from '@mui/material';
import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

export const SendPost = ({ newMessage, setNewMessage, setMessages }) => {

    const handlePostMessage = async () => {
        if (newMessage.trim() !== '') {
            const msgRef = collection(db, "Post");
            const data = await addDoc(msgRef, { Message: newMessage, Timestamp: Timestamp.now() });
            console.log(data);
        }
        setNewMessage("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handlePostMessage();
            setNewMessage("");
        }
    };

    return (
        <div className="post">
            <div className='flex flex-col md:flex-row items-center justify-center gap-3'>
                <textarea className='post_textarea md:w-3/4 lg:w-1/2 xl:w-2/3'
                    placeholder="Share your secret message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button variant='contained' sx={{
                    backgroundColor: '#F4BF96', color: '#a0414d', height: "30px", '&:hover': {
                        backgroundColor: '#a0414d', color: "#fff"
                    }
                }}
                    onClick={handlePostMessage}>Post</Button>
            </div>
            <div className='text-slate-300 mt-2 md:mt-0 text-center md:text-left'>
                Press "Enter" to Post*
            </div>
        </div>
    );
};
