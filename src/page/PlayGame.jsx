import { IoIosArrowBack} from "react-icons/io";
import { ImCross} from "react-icons/im";
import { BsFillRecordCircleFill } from "react-icons/bs";
import "./style.css";
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from "../components/Button";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import axios from "axios";
import { render } from "@testing-library/react";


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
    const [turn, setTurn] = useState(1);
    const [turnsec, setTurnsec] = useState(2);
    const [data, setData] = useState({moves:[]});
    const [moves, setMoves] = useState([0,0,0,0,0,0,0,0,0]);
    const user = useSelector(state=>state.user.currentUser);

    useEffect(() => {

        const getmoves = async () => {
            try {
            const res = await publicRequest.get("/moves/findm/" + move_Id);
                setData(res);
                // console.log(user.email);
                // console.log(data.moves);
                setMoves(data.data.moves);
                if(user.email===data.user){
                    // console.log("yess");
                    setTurn(1);
                    setTurnsec(2);
                }else{
                    // console.log("no");
                    setTurn(2);
                    setTurnsec(1);
                }
            } catch { }
            setLoading(false);
        };
        getmoves();   
    }, []);

 

 
        const putmoves = async(e)=>{
            const send ={
                gameId:data.data.gameId,
                user:data.data.user,
                moves:data.data.moves,
                turn:data.data.turn
            }
            try{
                const res = await axios.put("http://127.0.0.1:5000/moves/"+move_Id,send);
                setData(res.data); 
                setMoves(data.moves)
            }catch(err){
                console.log(err);
            }
        };
       
   
    

    const handleClick = (e)=>{
        console.log("yes");
        // console.log(moves[e.target.id],data.turn,turn,"yes");
    
        if(data.data.moves[e.target.id]===0 && data.data.turn===turn){
        // console.log("yes");
            
            data.data.moves[e.target.id]=turn;
            // console.log(moves[e.target.id]);
            moves[e.target.id]=turn;
            // console.log(moves[e.target.id]);

            data.data.turn=turnsec;
            console.log(e.target.id);
        
        }

        if(moves[0]===turn && moves[1]===turn && moves[1]===turn){
            data.data.turn=3;
        }else if(moves[1]===turn && moves[4]===turn && moves[5]===turn){
            data.data.turn=3;
        }else if(moves[6]===turn && moves[7]===turn && moves[8]===turn){
            data.data.turn=3;
        }else if(moves[0]===turn && moves[4]===turn && moves[8]===turn){
            data.data.turn=3;
        }else if(moves[2]===turn && moves[4]===turn && moves[6]===turn){
            data.data.turn=3;
        }
        else if(moves[0]===turnsec && moves[1]===turnsec && moves[1]===turnsec){
            data.data.turn=4;
        }else if(moves[1]===turnsec && moves[4]===turnsec && moves[5]===turnsec){
            data.data.turn=4;
        }else if(moves[6]===turnsec && moves[7]===turnsec && moves[8]===turnsec){
            data.data.turn=4;
        }else if(moves[0]===turnsec && moves[4]===turnsec && moves[8]===turnsec){
            data.data.turn=4;
        }else if(moves[2]===turnsec && moves[4]===turnsec && moves[6]===turnsec){
            data.data.turn=4;
        }
        else if(moves[0]!==0 && moves[1]!==0 && moves[2]!==0 && moves[3]!==0 && moves[4]!==0 && moves[5]!==0 && moves[6]!==0 && moves[7]!==0 && moves[8]!==0){
            data.data.turn=5;
        }
        
        putmoves();

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
    {data.data.turn == 3 ? <GameA>Win!</GameA> :<></>}
    {data.data.turn == 4 ? <GameA>Loose!</GameA> :<></>}
    {data.data.turn == 5 ? <GameA>Tie!</GameA> :<></>}
    {data.data.turn === turn ? <GameA>Your move</GameA> :<></>}
    {data.data.turn === setTurnsec ? <GameA>wait for Your move</GameA> :<></>}

    
    <GameB>


        <GameC id='0' onClick={handleClick} className="all left top">
        {moves[0]===turn && <ImCross color="blue" size={80}/>}
        { moves[0]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

        <GameC id='1' onClick={handleClick} className="all  top">
        {moves[1]===turn && <ImCross color="blue" size={80}/>}
        { moves[1]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

        <GameC id='2' onClick={handleClick} className="all right top">
        {moves[2]===turn && <ImCross color="blue" size={80}/>}
        { moves[2]===turnsec && <BsFillRecordCircleFill color="red" size={80}/> } 
        </GameC>

        <GameC id='3' onClick={handleClick} className="all left ">
        {moves[3]===turn && <ImCross color="blue" size={80}/>}
        { moves[3]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}   
        </GameC>

        <GameC id='4' onClick={handleClick} className="all ">
        {/* <ImCross color="blue" size={80}/> */}
        {moves[4]===turn && <ImCross color="blue" size={80}/>}
        { moves[4]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

        <GameC id='5' onClick={handleClick} className="all right">
        {moves[5]===turn && <ImCross color="blue" size={80}/>}
        { moves[5]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

        <GameC id='6' onClick={handleClick} className="all left down">
        {moves[6]===turn && <ImCross color="blue" size={80}/>}
        { moves[6]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}   
        </GameC>

        <GameC id='7' onClick={handleClick} className="all down">
        {moves[7]===turn && <ImCross color="blue" size={80}/>}
        { moves[7]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}   
        </GameC>

        <GameC id='8' onClick={handleClick} className="all right down">
        {moves[8]===turn && <ImCross color="blue" size={80}/>}
        { moves[8]===turnsec && <BsFillRecordCircleFill color="red" size={80}/>}
        </GameC>

    </GameB>

    </GameDiv>
   
    <RegisterBOx>
       
        <Button  color='#efad1a' text='Start game'/>
    </RegisterBOx>


    </div>
  )
}

export default PlayGame