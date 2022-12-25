import { IoIosArrowBack } from "react-icons/io";
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from "../components/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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



const NewGame = () => {

    const [user2, setUser2] = useState("")
    const user = useSelector(state=>state.user.currentUser);
    // console.log(user.email);
    const user1 = user.email;
    
    const handleClick = async(e)=>{
        try{
            const res = await axios.post("http://127.0.0.1:5000/api/game",{user1,user2})
            // console.log(res);
        }catch(err){
            // console.log(err);
        }
    };


  return (
    <div>    
    <Link to="/dashboard">

    <Back>
      <IoIosArrowBack size={40}/>
    </Back>
    </Link>
    <Text>
        <H3>Start a new game</H3>
        <H1>Whom do you want to play with?</H1>
        <H3>Email</H3>
        <InputDiv>
            <Input onChange={(e)=> setUser2(e.target.value)} id="Name" placeholder="Type their email here"/>
        </InputDiv>
        

    
    </Text>
   
    <RegisterBOx>
       <div onClick={handleClick}>
        <Button  color='#efad1a' text='Start game'/>
       </div>
    </RegisterBOx>


    </div>
  )
}

export default NewGame