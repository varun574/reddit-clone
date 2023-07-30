import { modalState, modals } from '@/atoms/modalAtom';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

type ModalProps = {
    
};

const Modal:React.FC<ModalProps> = () => {

    const authModalState = useRecoilValue(modalState);
    
    return (
        <>
            {authModalState.for == modals.LOGIN && <LoginModal show={authModalState.show}></LoginModal>}
            {authModalState.for == modals.SIGNUP && <SignupModal show={authModalState.show}></SignupModal>}
        </>
    )
}
export default Modal;