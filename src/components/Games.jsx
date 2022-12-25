import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { publicRequest } from '../requestMethods';
import Button from './Button';


const Div1 = styled.div`
margin-left: 4%;
`;
const Div2 = styled.div`
  margin-left: 4%;
    margin-top: 7%;
   
`;
const H3 = styled.h3`
margin: 0%;
font-size: 100%;
font-weight: 700;
`;
const H1 = styled.h1`
    font-size: 180%;
    margin-top: 0%;
    /* margin-bottom: 0%; */
    `;

const Div = styled.div`
    border-radius: 10px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    height: 20%;
    padding:2%;
    margin: 2%;
`;

const H2 = styled.h2`
    color: white;  
    margin: 1%; 
`;

const Buttonn = styled.div`
    background-color: #efad1a;
    margin: 2%;
    text-align: center;
    font-size: 18px;
    border-radius: 10px;
    margin-top: 7%;
    margin-bottom: 2%;
    padding: 1.5%;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

`;



const Games = ({gameId , user1 , user2}) => {

    // console.log(gameId);
    // console.log(user1);
    // console.log(user2);
    const user = useSelector(state=>state.user.currentUser.email);
    // console.log(user);
    const [name, setname] = useState("");
    const [turnn, setTurnn] = useState(0);
    const [turn, setTurn] = useState(0);
    const [tursec, setTurnsec] = useState(0);
    const [win, setTwin] = useState(0);
    const [lose, setLose] = useState();


    const [moves, setMoves] = useState([]);

    
    

    useEffect(() => {
            const getuser1 = async () => {
                try {
                const res = await publicRequest.get("/auth/find/" + user2);
                setname(res.data.name);
                
                } catch { }
            };
            const getuser2 = async () => {
                try {
                const res = await publicRequest.get("/auth/find/" + user1);
                setname(res.data.name);
                } catch { }
            };
            const getmoves = async () => {
                try {
                const res = await publicRequest.get("/moves/find/" + gameId);
                setMoves(res.data);
                setTurn(res.data.turn);
                } catch { }
            };
            getmoves();
            // console.log(moves.turn);
            // console.log(user,user1);
            if(user===user1){
                    getuser1();
                    setTurnn(1);
                    setTwin(3);
                    setLose(4);
                    setTurnsec(2);
            }
            else{
                // console.log("yes");
                getuser2();
                setTurnn(2);
                setTwin(4);
                setLose(3);
                setTurnsec(1);
            }
    }, [gameId , user1 , user2])
    // console.log(turn,tursec);

    const navigate = useNavigate();
    
    const handleclick = () => {

        navigate(`/playgame/${moves._id}`)

    }

  return (

    <Div>
        <H1>Game with {name}</H1>
        <Div1>
        {turnn=== turn ? <H3>{name} just make their move!</H3> : <H3>You just make Your move!</H3>}
            
        {turnn=== turn ? <H3>It's your turn to play</H3> :<H3>It's {name} turn to play</H3> }
        </Div1>
        <Div2>
            <H3>{format(moves?.updatedAt)}</H3>
        </Div2>
        
        <div onClick={handleclick}>

        <Buttonn>
        {turn == win ? <H2>You win!</H2>:<></>}
        {turn == lose ? <H2>Your Lose!</H2>:<></>}
        {turn == 5 ? <H2>Tie!</H2>:<></>}
        {turn === turnn ? <H2>Your move</H2>:<></>}
        {turn === tursec ? <H2>{name} move</H2>:<></>}

        </Buttonn>
        </div>
        
        {/* <Button  color='#efad1a' text='Play!'/> */}
        


    </Div>
  )
}

export default Games