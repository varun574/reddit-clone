"use client"
import React from 'react';
import ProfileDropdown from './ProfileDropdown'
import { useSetRecoilState } from 'recoil';
import { modalState, modals } from '@/atoms/modalAtom';
import {useAuth} from '@/hooks/useAuth';

type NavProfileProps = {

};

const NavProfile:React.FC<NavProfileProps> = () => {

  const [user, isLoggedIn] = useAuth();

  const setModalState = useSetRecoilState(modalState);

  function openModal(modalFor: modals){
    setModalState({
      show: true,
      for: modalFor
    })
  }
    
    return (
        <div className='flex gap-2 md:ml-auto fill-white'>
            {!isLoggedIn && <button className='hidden lg:inline-block rd-btn-brand-outline' onClick={()=>openModal(modals.LOGIN)}>Login</button>}
            {!isLoggedIn && <button className='hidden lg:inline-block rd-btn-brand' onClick={()=>openModal(modals.SIGNUP)}>Signup</button>}
            <ProfileDropdown></ProfileDropdown>
        </div>
        
    )
}
export default NavProfile;