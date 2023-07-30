import Link from 'next/link';
import React from 'react';
import BrandNameIcon from '../icons/BrandNameIcon'; 
import LogoIcon from '../icons/LogoIcon';

type NavBrandProps = {
    
};

const NavBrand:React.FC<NavBrandProps> = () => {
    
    return (
        <div className='flex gap-2 md:basis-1/12'>
            <Link href="/" className='w-8 h-8 my-auto'><LogoIcon></LogoIcon></Link>
            <Link href="/" className='w-14 h-auto my-auto hidden md:inline-block'><BrandNameIcon></BrandNameIcon></Link>
        </div>
    )
}
export default NavBrand;