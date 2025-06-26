import React from 'react'
import Profilefeature from '../components/Profilefeature'
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const {logout} = useAuth();
  return (
    <div>
        Profile
        <Profilefeature/>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile