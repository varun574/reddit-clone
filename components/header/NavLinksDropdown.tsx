import React from 'react';
import {AiFillHome} from 'react-icons/ai'

type NavLinksDropdownProps = {
    
};

const NavLinksDropdown:React.FC<NavLinksDropdownProps> = () => {
    
    return (
        <div className='flex gap-2 md:basis-2/12'>
            <AiFillHome className="text-2xl my-auto dark:text-white"></AiFillHome>
            <span className='text-sm my-auto font-medium hidden lg:inline-block dark:text-white'>Home</span>
        </div>
    )
}
export default NavLinksDropdown;