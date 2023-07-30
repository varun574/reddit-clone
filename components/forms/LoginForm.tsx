import React, { useEffect, useState } from 'react';
import ModalInputField from '../modals/ModalInputField';
import { getMessage } from '@/firebase/authErrors';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebaseApp';
import { useRouter } from 'next/navigation';
import GoogleAuthProviderButton from '../AuthProviders/GoogleAuthProviderButton';
import { ClipLoader } from 'react-spinners';

type LoginFormProps = {
    
};

type LoginFormData = {
    email: string,
    password: string
}

const LoginForm:React.FC<LoginFormProps> = () => {

    const router = useRouter();

    const [formError, setFormError] = useState("");
    
    const [signInWithEmailAndPassword, user, loading, userError] = useSignInWithEmailAndPassword(auth);    
    
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    })
    
    useEffect(()=>{
        if(userError){
            setFormError(getMessage(userError.code))
        }
    }, [userError])

    useEffect(()=>{
        if(user){
            router.push("/")
        }
    }, [user])

    function onChangeHandler(e : React.ChangeEvent<HTMLInputElement>){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    function submitHandler(e: React.FormEvent<HTMLFormElement>){
        
        e.preventDefault();
        signInWithEmailAndPassword(formData.email, formData.password);
    }
    
    return (
        <>
        <p className='text-xs mb-2 text-center'>Log-in Options</p>
                <div className='flex items-center justify-around'>
                    <GoogleAuthProviderButton setFormError={setFormError}></GoogleAuthProviderButton>
                </div>
                <div className='relative h-6 w-full'>
                    <p className="before:inline-block before:w-full before:h-[0.1rem] before:bg-gray-200 before:content-[''] after:content-['OR'] after:absolute after:left-[40%] after:w-16 after:text-center after:top-1 after:bg-white"></p>
                </div>
                <div className='w-full'>
                    <form onSubmit={submitHandler}>
                        <ModalInputField as='email' id='email' name='email' value={formData.email} label='Email' key="email" onChangeHandler={onChangeHandler} required={true}></ModalInputField>
                        <ModalInputField as='password' id='password' name='password' value={formData.password} label='Password' key="password" onChangeHandler={onChangeHandler} required={true}></ModalInputField>
                        <p className='font-normal text-xs m-8'>Forgot your username or password</p>
                        {formError && <p className='text-red-700 text-xs my-2'>*{formError}</p>}
                        <div className='w-full h-max px-8'>
                            <button type='submit' className={`rd-btn-brand w-full ${loading && 'pointer-events-none opacity-50 relative'}`}><ClipLoader loading={loading} color='white' className='z-10 absolute top-0 bottom-0 right-1/4 my-auto'/>{loading ? 'Logging in...': 'Login'}</button>
                        </div>
                    </form>
                </div>
        </>
    )
}
export default LoginForm;