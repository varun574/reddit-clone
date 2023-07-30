import React from 'react';
import {MenuOption} from './ProfileDropdown'
import { Menu } from '@headlessui/react';

export type ProfileDropdownMenuSectionProps = {
    label?: string,
    menuOptions: MenuOption[]
};

const ProfileDropdownMenuSection:React.FC<ProfileDropdownMenuSectionProps> = ({label, menuOptions}) => {
    
    return (
        <div className='py-2'>
            {label && <p className='text-gray-500 py-2 px-6 font-medium'>{label}</p>}
            {menuOptions.map((menuOption, index)=>{            
               return   <Menu.Item key={index}>
                            <div className='h-10 w-full ui-active:bg-gray-100 dark:ui-active:bg-zinc-700 flex justify-around'>
                                <button className="h-full text-inherit w-full text-left pl-6 font-medium" onClick={menuOption.onClickHandler}>{menuOption.element}</button>
                            </div>
                        </Menu.Item>
            })}
        </div>
    )
}
export default ProfileDropdownMenuSection;