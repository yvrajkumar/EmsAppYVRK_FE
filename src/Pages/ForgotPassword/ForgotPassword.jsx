import React, { useState } from "react";
import classes from './ForgotPassword.module.css';
import { useHistory} from "react-router-dom";
import ForgotPassword_Img from "../../Images/ForgotPassword.svg";
import axios from 'axios';

function ForgotPassword() {
    const [emailDetails, setemailDetails] = useState({
        email: "",
      });

      let history = useHistory();

      const onChangeHandler = (e) => {
        let user = emailDetails;
        user[e.target.name] = e.target.value;
        setemailDetails(user);
      };
    
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/SendMail`, { emailDetails })
            .then(res => {
              console.log(res);
              console.log(res.data);
              console.log(res.status);
              if(res.data.result==="Mail Sent")
              {
                localStorage.setItem('userDetails', JSON.stringify(res.data));
                history.push('/ResetPassword')
              }
              else
              {
                alert("Please enter valid mail.");
              }
            })
        return;        
      }
    
  return (
    <div className={classes.ForgotPassword}>
      <div className={classes.ForgotPassword_Image}>
          <img src={ForgotPassword_Img} alt="ForgotPassword" />
      </div>
      <div className={classes.ForgotPassword_Box}>
            <form onSubmit={onSubmitHandler}>
              <h3 className={classes.title_SU}>Enter email for password reset.</h3>
              <br></br>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={onChangeHandler}
              /><br></br>

              <input type="submit" value="SUBMIT" />
            </form>
        </div>
    </div>
  );
}

export default ForgotPassword;
