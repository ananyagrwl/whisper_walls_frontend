import { SendPost } from '../Components/SendPost';
import { Cards } from '../Components/Cards';
import { useDebugValue, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';
import Navbar from '../Components/Navbar';
// import { Cookie } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { updateName } from '../redux/Name';

export const Home = () => {

    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if(!Cookies.get("token")){
            navigate("/")
        }
        else{
            dispatch(updateName(Cookies.get("name")))
        }

      const messageRef = collection(db , "Post");
      const timeSortedQuery = query(messageRef, orderBy('Timestamp', 'desc'));
    //   let data = getDocs(messageRef);
      onSnapshot(timeSortedQuery, async(e)=>{
        let data = e.docs.map((doc)=>{
            return({
                ...doc.data(), id:doc.id
            })
        })
        console.log(data);
        setMessages(data);
      })
    }, [])
    

    return (
        <>
            <div className="home">
                <Navbar/>
                <div className='home_heading'>WHISPER WALLS</div>

                <p className='home_text'>Share your secrets anonymously with the world.</p>
                <SendPost newMessage={msg} setNewMessage={setMsg} setMessages={setMessages} />
            </div>
            <div className='cardbox'>
                {messages.map((e) => {
                    return <Cards message={e}/>
                })}

            </div>
        </>
    )
}
