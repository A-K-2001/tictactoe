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
    const user = useSelector(state=>state.user.currentUser);

    const [name, setname] = useState("");
    const [turnn, setTurn] = useState(0);
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
                const res = await publicRequest.get("/game/find/" + user1);
                setname(res.data.name);
                } catch { }
            };
            const getmoves = async () => {
                try {
                const res = await publicRequest.get("/moves/find/" + gameId);
                setMoves(res.data);
                } catch { }
            };
            getmoves();
            // console.log(moves.turn);

            if(user.email==user1){
                    getuser1();
                    setTurn(0);
            }
            else{
                getuser2();
                setTurn(1);
            }
    }, [gameId , user1 , user2])
    // console.log(moves);

    const navigate = useNavigate();
    
    const handleclick = () => {

        navigate(`/playgame/${moves._id}`)

    }

  return (

    <Div>
        <H1>Game with {name}</H1>
        <Div1>
        {turnn=== moves?.turn ? <H3>Tanmay just make their move!</H3> : <H3>You just make Your move!</H3>}
            
            {turnn=== moves?.turn ? <H3>It's your turn to play</H3> :<H3>It's {name} turn to play</H3> }
        </Div1>
        <Div2>
            <H3>{format(moves?.createdAt)}</H3>
        </Div2>
        
        <div onClick={handleclick}>

        <Buttonn>
        {moves.turn == 3 ? <H2>Your move</H2>:<></>}
        {moves.turn == 4 ? <H2>Your move</H2>:<></>}
        {moves.turn == 5 ? <H2>Your move</H2>:<></>}
        {moves.turn == 1 ? <H2>Your move</H2>:<></>}
        {moves.turn == 2 ? <H2>Your move</H2>:<></>}

        </Buttonn>
        </div>
        
        {/* <Button  color='#efad1a' text='Play!'/> */}
        


    </Div>
  )
}

export default Games