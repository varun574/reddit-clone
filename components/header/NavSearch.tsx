
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import {CiSearch} from 'react-icons/ci'

type NavSearchProps = {
};

const NavSearch:React.FC<NavSearchProps> = () => {
    const [user, isLoggedIn] = useAuth();
    
    return (
        <div className={`relative ${isLoggedIn && 'md:ml-0' } md:basis-6/12 flex ml-auto`}>
            <CiSearch className="md:absolute text-slate-900 md:top-2 md:left-3 text-2xl my-auto cursor-pointer dark:text-gray-400"></CiSearch>
            <input type='text' name="search" placeholder='Search Reddit' className='hidden md:inline-block h-full w-full rounded-full pl-10 bg-gray-100 dark:bg-neutral-800 border-transparent hocus:border-gray-500 hocus:dark:border-gray-300 hocus:bg-white hocus:dark:bg-neutral-900 focus:ring-0 transition-all dark:text-gray-300 dark:placeholder:text-neutral-500' ></input>
        </div>
    )
}
export default NavSearch;