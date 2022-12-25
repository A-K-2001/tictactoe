import { IoIosArrowBack } from "react-icons/io";
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";


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




const Register = () => {
    const [name, setname] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email,setemail]  =useState("");
    const [status,setstatus] =useState("");
    const [error,seterror] =useState("");


    
  
    const handleClick = async(e)=>{
        try{
            const res = await axios.post("http://127.0.0.1:5000/api/auth/register",{name,username,email,password})
            // console.log(res.status);
            setemail(" ");
            setname(" ");
            setpassword(" ");
            setusername(" ");

            setstatus(res.status);
        }catch(err){
            // console.log(err);

            seterror(err);
        }
    };
    
  

  return (
    <div>
    <Back>
    <Link to="/">
      <IoIosArrowBack size={40}/>
    </Link>
    </Back>
    <Text>
        <H3>Create account</H3>
        <H1>Let's get to know you better!</H1>
        <H3>your name</H3>
        <InputDiv>
            <Input onChange={(e)=>setname(e.target.value)}
            id="Name" placeholder="Type your name here"/>
        </InputDiv>
        <H3>Username</H3>
        <InputDiv>
            <Input  onChange={(e)=>setusername(e.target.value)}
            id="Username" placeholder="Type your username here"/>
        </InputDiv>
        
        <H3>Email</H3>
        <InputDiv>
            <Input onChange={(e)=>setemail(e.target.value)}
            id="Email" placeholder="Type your email here"/>
        </InputDiv>
        
        <H3>Password</H3>
        <InputDiv>
            <Input onChange={(e)=>setpassword(e.target.value)}
            id="password" placeholder="Type your password here"/>
        </InputDiv>

    
    </Text>
   
    <RegisterBOx>
    {error &&  status!==201 && <Button color='red' text='Enter correct details'/>}
        { status===201 && <Button color='green' text='Congratulations!!! Account created.'/>}
        <div onClick={ handleClick}  >
        <Button  color='#efad1a' text='Regiter'/>
        </div>
    </RegisterBOx>


    </div>
  )
}

export default Register