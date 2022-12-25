import { IoIosArrowBack } from "react-icons/io";
import React from 'react'
import styled from 'styled-components'
import Button from "../components/Button";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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
    outline: none;
    font-size: 100%;
    text-align: left;
`;
const H3 = styled.h3`
margin-bottom: 10px;
`;
const H1 = styled.h1``;

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const{ isFetching , error  } = useSelector((state)=>state.user);
    console.log(error );

    
    
    const handleClick = (e)=>{
        // console.log(username);
        // console.log(password);
        

        e.preventDefault();
        login(dispatch,{username,password});
        
    };

  


  return (
    <div>
    <Back>
    <Link to="/">
      <IoIosArrowBack size={40}/>
    </Link>
    </Back>
    <Text>
        <H3>Login</H3>
        <H1>Please enter your details</H1>
        
        <H3>Username</H3>
        <InputDiv>
            <Input onChange={(e)=> setUsername(e.target.value)} placeholder="Type your username here"/>
        </InputDiv>
        
        {/* <H3>Email</H3>
        <InputDiv>
            <Input id="Email" placeholder="Type your email here"/>
        </InputDiv> */}
        
        <H3>Password</H3>
        <InputDiv>
            <Input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Type your password here"/>
        </InputDiv>

    
    </Text>
   
    <RegisterBOx>
        {error===true && <Button color='red' text='Enter correct details'/>}
        <div  onClick={ handleClick}  disabled={ isFetching}>

        <Button color='#efad1a' text='Login'/>
        </div>
    </RegisterBOx>


    </div>
  )
}

export default Login