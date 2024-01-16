import { Button } from '@mui/material';
import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

export const SendPost = ({ newMessage, setNewMessage, setMessages }) => {

    const handlePostMessage = async () => {
        if (newMessage.trim() !== '') {
            const msgRef = collection(db, "Post");
            const data = await addDoc(msgRef, { Message: newMessage, Timestamp: Timestamp.now() });
            console.log(data)
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
            <div className=' flex m-0 items-center justify-center gap-3'>
                <textarea className='post_textarea'
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
            <div className=' text-slate-300 m-0 items-start justify-start'>
                Press "Enter" to Post*
            </div>
        </div>
    )
}
