import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Button  from '../components/Button';



const H1 = styled.h1`

font-size: 550%;

`;
const H3 = styled.h3`
font-size: 200%;
`;
const BoxT = styled.div`

text-align: center;
margin-top: 40%;
margin-bottom: 34%;

`;
const BoxL = styled.div`

`;
const BoxR = styled.div`

`;
export const Home = () => {


  return (
    <div>
        <BoxT>
          <H3>async</H3>
          <H1>tic tac</H1>
          <H1>toe</H1>
        </BoxT>
        <BoxL>
          <Link to="/login">
          <Button color='#efad1a' text='Login'/>
          </Link>
        </BoxL>
        <BoxR>
          <Link to="/register">
          <Button color='blue' text='Register'/>
          </Link> 
        </BoxR>


    </div>
  )
}
