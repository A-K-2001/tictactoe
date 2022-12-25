import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Games from '../components/Games';
import { logout } from '../redux/userRedux';
import { publicRequest } from '../requestMethods';



const Div1 = styled.div`
margin-left: 4%;
`;
const Div2 = styled.div`
text-align: center;
margin-top: 55%;
`;


const H3 = styled.h3`
margin-bottom: 10px;
font-size: 180%;
font-weight: 700;
`;
const H1 = styled.h1`
font-size: 400%;
`;
const H2 = styled.h2`
font-size: 100%;
color: white;
margin-top: 5px;
`;

const New = styled.div`
background-color: black;
color: black;
position: fixed;
bottom: 10px;
z-index: 100;
right: 10px;
height: 35px;
width: 130px;


margin: 2%;
text-align: center;
font-size: 18px;
border-radius: 10px;
margin-top: 7%;
margin-bottom: 2%;
padding: 1.5%;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

`;

const Dashboard = () => {
  const dispatch = useDispatch();


  const handleClick = (e)=>{
    
    dispatch(logout());

    
  };

  
  const [games, setGames] = useState([]);

  const user = useSelector(state=>state.user.currentUser);
  // console.log(user.email);

  useEffect(() => {

    const getGames = async () => {
      try {
        const res = await publicRequest.get("/game/find/" + user.email);
        setGames(res.data);
      
      } catch(err) { }
    };
    getGames();
    
  }, [user])
  
  games.reverse();  // reverse to show accending order of create

  // console.log(games);




  return (
    <div>
        <Div1>
            <H3 onClick={ handleClick}>Your Games</H3>
        </Div1>
         {games.length === 0 && <div>
          <Div2>
            <H1>No Games found</H1>       
        </Div2>
        <Link to="/newgame">
        <Button  color='#efad1a' text='Start a new game'/>
        </Link>
        
        </div>
         }

        { games.map((item)=> <Games key={item?._id} gameId={item?._id} user1={item?.user1} user2={item?.user2} ></Games> ) }
       
        {/* <Games Name='Anil' ></Games>
        <Games Name='Anil' ></Games>
        <Games Name='Anil' ></Games> */}
        <Link to="/newgame">

        <New ><H2>+ New Game</H2></New>
        </Link>

    </div>
  )
}

export default Dashboard