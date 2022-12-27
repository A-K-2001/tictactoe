import { IoIosArrowBack} from "react-icons/io";
import { ImCross} from "react-icons/im";
import { BsFillRecordCircleFill } from "react-icons/bs";
import "./style.css";
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Button from "../components/Button";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import axios from "axios";
import { render } from "@testing-library/react";
import { io, Socket } from "socket.io-client"



const RegisterBOx = styled.div`
position: absolute;
bottom: 5px;
width: 100%;
`;

const Text = styled.div`
    margin-left: 5%;
    margin-right: 5%;
`;
const Back = styled.div` 
    margin: 2%;
`;

const InputDiv = styled.div`
    /* margin: %; */
    /* text-align: center; */
    font-size: 18px;
    border-radius: 10px;
    margin-top: 0%;
    margin-bottom: 0%;
    padding: 5%;
    
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    
`;
const Input = styled.input`
    border: 0ch;
    color: black;
    font-size: 100%;
    text-align: left;
`;
const H3 = styled.h3`
margin-bottom: 10px;
`;
const H1 = styled.h1``;
const GameDiv = styled.div`
    position: absolute;
    transform: translate(-50%,-50%);
    top: 60%;
    
    left: 50%;
      
`;
const GameC = styled.div`
    width: 112.25px;
    height: 112.4px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    
    background-color: white;
  
    
    
    
`;    const GameB = styled.div`
        background-color: #efad1a;
        text-align: center;
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        height: 366px;
        width: 366px;
        border-color: white;
        padding: 0%;
`;  const GameA = styled.div`
        background-color: #efad1a;
        height: 90px;
        width: 366px;
        font-size: 200%;
        text-align: center;
        /* margin-bottom: 10px; */
`;


const PlayGame = () => {
    const location = useLocation();
    const move_Id = location.pathname.split("/")[2];
    const [isLoading, setLoading] = useState(true);
    const [turnf, setTurnf] = useState(1);
    const [gameId, setGameId] = useState("");
    const [turn, setTurn] = useState(1);
    const [win, setWin] = useState();
    const [reciver, setReciver] = useState("");
    const [lose, setLose] = useState();
    const [turnsec, setTurnsec] = useState(2);
    const [data, setData] = useState([]);
    const [moves, setMoves] = useState([0,0,0,0,0,0,0,0,0]);
    const user = useSelector(state=>state.user.currentUser);
    // const userid = useSelector(state=>state.user.currentUser.gmail);
    const socket = useRef();
    const scrollref = useRef();

    useEffect(() => {
        socket.current = io("ws://127.0.0.1:5000");
        socket.current.on("getMessage",(data)=>{

            setMoves(data.moves);
            setTurn(data.turn);

        }); 
    }, [])
    useEffect(() => {
        socket.current.emit("adduser",user);
        // socket.current.on("getUsers",users=>{
        //     // console.log(users);
        // })
    }, [user.email]);

    const getgame = async ()=>{

        try{
            const res = await axios.get("http://127.0.0.1:5000/api/game/findm/" + gameId);
            // console.log(res.data);
            if(res.data.user1===user.email)setReciver(res.data.user2);
            else(setReciver(res.data.user1))
            // console.log(reciver);
            // console.log(user.email);



        }catch(err){
            // console.log(err);
        }
    }

    

    const getmoves = async () => {
        try {
        const res = await axios.get("http://127.0.0.1:5000/api/moves/findm/" + move_Id);
          
             setMoves(res.data.moves);
             setGameId(res.data.gameId);
            
            setTurn(res.data.turn);
            if(user.email===res.data.user){
                // console.log("yess");
                setTurnf(1);
                setWin(3);
                setLose(4);
                setTurnsec(2);
            }else{
                // console.log("no");
                setTurnf(2);
                setWin(4);
                setLose(3);
                setTurnsec(1);
            }
            // console.log("yes");
           
            
            setLoading(false);
        } catch { }
    };
    
    
    
    getgame();
    
    
    useEffect(() => {
        
        
        getmoves();  
        // setTimeout(() => console.log('Initial timeout!'), 1000);
        // console.log(moves);
        
    }, [moves]);
    
    
    
    let sec=0;

 
        const putmoves = async(e)=>{
        
            try{
                const res = await axios.put("http://127.0.0.1:5000/api/moves/"+move_Id,{ moves:moves,turn:sec});
                // const ress = await axios.put("http://127.0.0.1:5000/api/moves/"+move_Id,{ turn:turn});

                // setData(res.data); 
                // setMoves(data.moves);
            }catch(err){
                console.log(err);
            }
        };

        const reset = async(e)=>{
            // console.log("yes");
            try{
                let m=[0,0,0,0,0,0,0,0,0];
                const res = await axios.put("http://127.0.0.1:5000/api/moves/"+move_Id,{ moves:m,turn:1});
                
            }catch(err){
                console.log(err);
            }

        }
       
        // console.log(turn,turnf);

    const handleClick = (e)=>{
        // console.log("yes");
        // console.log(moves[e.target.id],data.turn,turn,"yes");
        
        if(moves[e.target.id]===0 && turn===turnf){
            let arr=moves;
            arr[e.target.id]=turnf;
            setMoves(arr);
            // console.log(moves);
            // console.log(moves[e.target.id]);
            // console.log(turnsec);
            // console.log(turn);
            sec = turnsec;
            setTurn(sec);
            // console.log(turn);
            putmoves();
            // console.log(e.target.id);
        
        }

        if(moves[0]===turn && moves[1]===turn && moves[2]===turnf){
            setTurn(win);
            sec = win; putmoves();
        }else if(moves[0]===turnf && moves[3]===turnf && moves[6]===turnf){
            setTurn(win);sec = win; putmoves();
        }else if(moves[1]===turnf && moves[4]===turnf && moves[7]===turnf){         
            setTurn(win);sec = win; putmoves();
        }
        else if(moves[2]===turnf && moves[5]===turnf && moves[8]===turnf){
            setTurn(win);sec = win; putmoves();
        }else if(moves[0]===turnsec && moves[3]===turnsec && moves[6]===turnsec){
            setTurn(lose);sec = lose; putmoves();
        }else if(moves[1]===turnsec && moves[4]===turnsec && moves[7]===turnsec){
            setTurn(lose);sec = lose; putmoves();
        }else if(moves[2]===turnsec && moves[5]===turnsec && moves[8]===turnsec){
            setTurn(lose);sec = lose; putmoves();
        }
        
        
        
        
        
        else if(moves[3]===turnf && moves[4]===turnf && moves[5]===turnf){
            setTurn(win);sec = win; putmoves();
        }else if(moves[6]===turnf && moves[7]===turnf && moves[8]===turnf){         
            setTurn(win);sec = win; putmoves();
        }
        else if(moves[0]===turnf && moves[4]===turnf && moves[8]===turnf){
            setTurn(win);sec = win; putmoves();
        }else if(moves[2]===turnf && moves[4]===turnf && moves[6]===turnf){
            setTurn(win);sec = win; putmoves();
        }
        else if(moves[0]===turnsec && moves[1]===turnsec && moves[2]===turnsec){
            setTurn(lose);sec = lose; putmoves();
        }else if(moves[3]===turnsec && moves[4]===turnsec && moves[5]===turnsec){
            setTurn(lose);sec = lose; putmoves();
        }else if(moves[6]===turnsec && moves[7]===turnsec && moves[8]===turnsec){
            setTurn(lose);sec = lose; putmoves();
        }else if(moves[0]===turnsec && moves[4]===turnsec && moves[8]===turnsec){
            setTurn(lose);sec = lose; putmoves();
        }else if(moves[2]===turnsec && moves[4]===turnsec && moves[6]===turnsec){
            setTurn(lose);sec = lose; putmoves();
        }
        else if(moves[0]!==0 && moves[1]!==0 && moves[2]!==0 && moves[3]!==0 && moves[4]!==0 && moves[5]!==0 && moves[6]!==0 && moves[7]!==0 && moves[8]!==0){
            setTurn(5);sec = 5; putmoves();
        }
        socket.current.emit("sendMessage",{
            senderId:user.email,
            reciver,
            turn:sec,
            moves:moves,
        });

       

      };





// console.log(data.turn);
// console.log(turn);

 if (isLoading) {
    return <div className="App">Loading...</div>;
  }

 
  return (
    <div>
    <Link to="/dashboard">


    <Back>
      <IoIosArrowBack size={40}/>
    </Back>
    </Link>
    <Text>
      
        <H1>Whom do you want to play with?</H1>
        <H3>your piece</H3>
        <ImCross color="blue" size={80}/>
        {/* <BsFillRecordCircleFill color="red" size={40}/> */}
      

    
    </Text>

    <GameDiv>
    {turn === win ? <GameA>Win!</GameA> :<></>}
    {turn === lose ? <GameA>Loose!</GameA> :<></>}
    {turn === 5 ? <GameA>Tie!</GameA> :<></>}
    {turn === turnf ? <GameA>Your move</GameA> :<></>}
    {turn === turnsec ? <GameA>wait for Your move</GameA> :<></>}

    
    <GameB>


        <GameC id='0' onClick={handleClick} className="all left top">
        {moves[0]===turnf && <ImCross color="blue" size={80}/>}
        { moves[0]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

        <GameC id='1' onClick={handleClick} className="all  top">
        {moves[1]===turnf && <ImCross color="blue" size={80}/>}
        { moves[1]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

        <GameC id='2' onClick={handleClick} className="all right top">
        {moves[2]===turnf && <ImCross color="blue" size={80}/>}
        { moves[2]===turnsec && <BsFillRecordCircleFill color="red" size={80}/> } 
        </GameC>

        <GameC id='3' onClick={handleClick} className="all left ">
        {moves[3]===turnf && <ImCross color="blue" size={80}/>}
        { moves[3]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}   
        </GameC>

        <GameC id='4' onClick={handleClick} className="all ">
        {/* <ImCross color="blue" size={80}/> */}
        {moves[4]===turnf && <ImCross color="blue" size={80}/>}
        { moves[4]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

        <GameC id='5' onClick={handleClick} className="all right">
        {moves[5]===turnf && <ImCross color="blue" size={80}/>}
        { moves[5]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

        <GameC id='6' onClick={handleClick} className="all left down">
        {moves[6]===turnf && <ImCross color="blue" size={80}/>}
        { moves[6]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}   
        </GameC>

        <GameC id='7' onClick={handleClick} className="all down">
        {moves[7]===turnf && <ImCross color="blue" size={80}/>}
        { moves[7]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}   
        </GameC>

        <GameC id='8' onClick={handleClick} className="all right down">
        {moves[8]===turnf && <ImCross color="blue" size={80}/>}
        { moves[8]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

    </GameB>

    </GameDiv>
   
    <RegisterBOx onClick={reset}>
       
        <Button   color='#efad1a' text='reset game'/>
    </RegisterBOx>


    </div>
  )
}

export default PlayGame