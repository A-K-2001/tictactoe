import styled from "styled-components";
import './Button.css';



 
const Div = styled.div`
margin: 2%;
text-align: center;
font-size: 18px;
border-radius: 10px;
margin-top: 7%;
margin-bottom: 2%;
padding: 1.5%;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

`;
const H3 = styled.h3`
text-decoration: none;
color: white;
`;
export default function Button({ color, text }) {
   
    return (
       
        
        <Div style={ {backgroundColor:color}}>
            <H3>{text}</H3>
        </Div>
    );
  }










    