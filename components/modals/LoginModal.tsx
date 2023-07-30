"use client"
import { ModalState, modalState, modals } from '@/atoms/modalAtom';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import LoginForm from '../forms/LoginForm';


type LoginModalProps = {
    show: boolean
};


const LoginModal:React.FC<LoginModalProps> = ({show}) => {

    const router = useRouter();

    const [user, isLoggedIn] = useAuth();
    useEffect(()=>{
        if(isLoggedIn){
            closeModal();
            router.push("/");
        }
    }, [isLoggedIn])
    
    

    const setModalState = useSetRecoilState<ModalState>(modalState);

    

    function closeModal(){
        setModalState((prev)=>({
            ...prev,
            show: false
        }))
    }

    function switchModal(){
        setModalState((prev)=>({
            ...prev,
            for: modals.SIGNUP
        }))
    }

    
    
    return (
    <>
    <Transition appear show={show} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
                >
                Log In
                </Dialog.Title>
                <div className="mt-2 mb-8">
                <p className="text-sm text-gray-500">
                By continuing, you are setting up a Reddit account and agree to our User Agreement and Privacy Policy.
                </p>
                </div>
                <LoginForm></LoginForm>
                <div className="mt-8">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={switchModal}
                >
                    New to reddit signup!
                </button>
                </div>
            </Dialog.Panel>
            </Transition.Child>
        </div>
        </div>
    </Dialog>
    </Transition>
    </>
    )
}
export default LoginModal;