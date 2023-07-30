import { User } from '@/firebase/models/User';
import { AuthContext } from '@/lib/auth'
import React, { useContext, useEffect, useState } from 'react'


export const useAuth = (): [User | null | undefined, boolean, boolean] => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, loading] = useContext(AuthContext);
  useEffect(()=>{
    if(user){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
  }, [user])
  return [user, isLoggedIn, loading];
}