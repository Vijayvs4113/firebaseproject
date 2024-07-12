import React from 'react';
import { Link } from "react-router-dom";
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate()

  const signuserout = async () => {
    await signOut(auth)
    navigate("/")
  }

  return (
    <div className='navbar'>
      <div className="header">
        <h1>FeedForge</h1>
      </div>

      <div className="right-side-navbar">
        

        <div className='profile'>
          {user && (
            <>
              <p>{user?.displayName}</p>
              <img src={user?.photoURL || ""} width="40" height="40" />
              <button className='logoutbutton' onClick={signuserout}>Log Out</button>
            </>
          )}
        </div>

        <div className="links">
          <Link to='/' className='link'>Home</Link>
          {!user ? (
            <Link to='/login' className='link'>Login</Link>
          ) : (
            <Link to='/createpost' className='link'>Create Post</Link>)}
        </div>
      </div>


    </div>
  )
}
