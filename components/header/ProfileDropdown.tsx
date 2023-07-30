"use client"
import { Menu, Transition } from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import DefaultUserIcon from '../icons/DefaultUserIcon';
import { modalState, modals } from '@/atoms/modalAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ProfileDropdownMenuSection, { ProfileDropdownMenuSectionProps } from './ProfileDropdownMenuSection';
import SwitchItem from './SwitchItem';
import { SwitchStates } from '@/atoms/switchAtom';

import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseApp';
import {useAuth} from '@/hooks/useAuth';

type ProfileDropdownProps = {
};

export type MenuOption = {
    element: React.ReactElement
    onClickHandler: React.MouseEventHandler<HTMLButtonElement>
}

type ProfileOptions = {
    myStuff: MenuOption[],
    viewOptions: MenuOption[],
    other: MenuOption[]
}

const ProfileDropdown:React.FC<ProfileDropdownProps> = () => {

    const [user, isLoggedIn] = useAuth();

    const setModalState = useSetRecoilState(modalState);
    const [switchStates, setSwitchStates] = useRecoilState(SwitchStates);

    function openModal(modalFor: modals){
        setModalState({
            show: true,
            for: modalFor
        })
    }

    const offlineMenuOptions:MenuOption[] = [
        {
            element: (<button>Log In</button>),
            onClickHandler: ()=>openModal(modals.LOGIN),
        },
        {
            element: (<button>Sign Up</button>),
            onClickHandler: ()=>openModal(modals.SIGNUP),
        }
    ]

    const onlineMenuOptions: ProfileOptions = {
        myStuff: [
            {
                element: <SwitchItem enabled={switchStates.onlineStatus} setEnabled={()=>setSwitchStates((prev)=>({...prev, onlineStatus:!prev.onlineStatus}))} label='User Status'></SwitchItem>,
                onClickHandler: ()=>{}
            },
            {
                element: <button>Profile</button>,
                onClickHandler: ()=>{}
            },
            {
                element: <button>User Settings</button>,
                onClickHandler: ()=>{}
            }
        ],
        viewOptions: [
            {
                element: <SwitchItem enabled={switchStates.darkMode} setEnabled={()=>{document.documentElement.classList.toggle("dark"); return setSwitchStates((prev)=>({...prev, darkMode:!prev.darkMode}))}} label='Dark Mode'></SwitchItem>,
                onClickHandler: ()=>{}
            }
        ],
        other: [
            {
                element: <button>Log Out</button>,
                onClickHandler: ()=>{signOut(auth)}
            }
        ]
    }

    const menuOptions:React.ReactElement<ProfileDropdownMenuSectionProps>[] = [];
    if(isLoggedIn){
        menuOptions.push(<ProfileDropdownMenuSection key="my stuff" label='My Stuff' menuOptions={onlineMenuOptions.myStuff}></ProfileDropdownMenuSection>)
        menuOptions.push(<ProfileDropdownMenuSection key="view options" label='View Options' menuOptions={onlineMenuOptions.viewOptions}></ProfileDropdownMenuSection>)
        menuOptions.push(<ProfileDropdownMenuSection key="other" menuOptions={onlineMenuOptions.other}></ProfileDropdownMenuSection>)
    }
    else{
        menuOptions.push(<ProfileDropdownMenuSection key="offline options" menuOptions={offlineMenuOptions}></ProfileDropdownMenuSection>)
    }
    return (
        <Menu as="div" className='my-auto h-8 w-auto relative'>
            <Menu.Button className="inline-flex justify-between gap-2 hover:outline hover:outline-1 hover:outline-gray-200 hover:dark:outline-gray-500 rounded h-8 w-16 align-middle p-2">
                <DefaultUserIcon isStatusOnline={isLoggedIn && switchStates.onlineStatus}></DefaultUserIcon>
                <ChevronDownIcon className="self-center text-gray-500 h-4 inline"></ChevronDownIcon>
            </Menu.Button>
            <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute text-black dark:text-neutral-300 divide-y-[1px] dark:divide-gray-500 right-0 flex flex-col max-h-[36rem] overflow-y-auto w-56 mt-3 border dark:border-neutral-700 rounded bg-slate-50 ring-1 dark:bg-neutral-800 ring-black ring-opacity-5 shadow-lg">
                    {menuOptions}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
export default ProfileDropdown;