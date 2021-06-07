import React from "react";
import classes from './Home.module.css';
import { Link} from "react-router-dom";
import Home_Img from "../../Images/Home.svg";
import axios from 'axios';

function Home() {
  const onload = async (e) => {
    axios.get(`http://localhost:5000/`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    return;        
  }
    return (
    <div className={classes.Home}>
      <div className={classes.Home_Image}>
        <img src={Home_Img} alt="Home" />
      </div>
      <div className={classes.Nav_Box}>
              <div className={classes.bottomLinkWrapper}>
              <Link to="/SignIn" className={classes.BottomLinks} onClick={onload}>
                SIGN IN
              </Link>
              
              <Link to="/SignUp" className={classes.BottomLinks} onClick={onload}>
                SIGN UP
              </Link>
            </div>
        </div>
      
    </div>
  );
}

export default Home;
