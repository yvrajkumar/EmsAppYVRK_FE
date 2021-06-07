import React, { useState} from "react";
import classes from './profile.module.css';
import { useHistory} from "react-router-dom";
import Profile_Img from "../../Images/Profile.svg";
import axios from 'axios';

function Profile() {
  const [edit, setedit] = useState(false);
  let history = useHistory();
  const [userDetails, setuserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));
  const [profileDetails, setprofileDetails] = useState({
    name: userDetails.name,
    email: userDetails.email,
    password: userDetails.password,
    empcode: userDetails.empcode,
    address: userDetails.address,
    joiningdate: userDetails.joiningdate,

  });

  const onChangeHandler = (e) => {
    let user = profileDetails;
    user[e.target.name] = e.target.value;
    setprofileDetails(user);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setedit(false);
    axios.post(`https://ems-app-yvrk.herokuapp.com/UpdateProfile`, { profileDetails })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if(res.data.updated==="true")
        {
          console.log(res.data.updated);
          localStorage.setItem('userDetails', JSON.stringify(res.data));
          history.push('/profile')
          setprofileDetails(JSON.parse(localStorage.getItem('userDetails')));
        }
        if(res.data.updated==="null")
        {
          console.log(setuserDetails);
        }
      })


    return;        
  }

  const editHandler =async (e) => {
    e.preventDefault();
    setedit(true);
  }

  const signoutHandler = async (e) => {
    e.preventDefault();
    localStorage.removeItem('userDetails');
    history.push('/Home');
    return;
  }

  const deleteHandler = async (e) => {
    e.preventDefault();
    axios.post(`https://ems-app-yvrk.herokuapp.com/DeleteProfile`, {profileDetails})
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if(res.data.deleted==="true")
        {
          console.log(res.data.deleted);
          localStorage.removeItem('userDetails');
          history.push('/Home');
          
        }
      })
    return;
  } 

  if(edit)
  {
      return(
        <div className={classes.Profile}>
            <div className={classes.Profile_Image}>
                <img src={Profile_Img} alt="Profile" />
            </div>
            <div className={classes.Profile_Box}>
                <form onSubmit={onSubmitHandler}>
                <h1 className={classes.title_SU}>Profile</h1>
                <br></br>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={onChangeHandler}
                /><br></br>

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    disabled
                /><br></br>

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChangeHandler}
                /><br></br>

                <input
                type="text"
                placeholder="Emp-Code"
                name="empcode"
                onChange={onChangeHandler}
                /><br></br>

                <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={onChangeHandler}
                /><br></br>

                <input
                type="date"
                placeholder="Joining date"
                name="joiningdate"
                onChange={onChangeHandler}
                /><br></br>

                <input type="submit" value="SUBMIT" />
                <br></br><br></br>
                </form>
            </div>
        </div>
    );
  }
    return (
      <div className={classes.Profile}>
        <div className={classes.Profile_Image}>
          <img src={Profile_Img} alt="Profile" />
        </div>
        <div className={classes.Profile_Box}>
        <form onSubmit={onSubmitHandler}>
              <h1 className={classes.title_SU}>Profile <button onClick={editHandler}>Edit</button> &nbsp;<button onClick={signoutHandler}>Sign Out</button></h1>
              
              <br></br>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={profileDetails.name}
                disabled
              /><br></br>

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={profileDetails.email}
                disabled
              /><br></br>

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={profileDetails.password}
                disabled
              /><br></br>

              <input
                type="text"
                placeholder="Emp-Code"
                name="empcode"
                value={profileDetails.empcode}
                disabled
              /><br></br>

              <input
                type="text"
                placeholder="Address"
                name="address"
                value={profileDetails.address}
                disabled
              /><br></br>

              <input
                type="date"
                placeholder="Joining date"
                name="joiningdate"
                value={profileDetails.joiningdate}
                disabled
              /><br></br>
              <br></br><br></br>
              <button onClick={deleteHandler}>Delete Profile</button>
        </form>
        </div>
    </div>
    );
  }
  
  export default Profile;
