import React, { useEffect, useState } from 'react';
import ModalInputField from '../modals/ModalInputField';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, db } from '@/firebase/firebaseApp';
import { doc, setDoc } from 'firebase/firestore';
import { getMessage } from '@/firebase/authErrors';
import GoogleAuthProviderButton from '../AuthProviders/GoogleAuthProviderButton';
import { ClipLoader } from 'react-spinners';
import { User, userConverter } from '@/firebase/models/User';

type SignUpFormProps = {
    
};

type SignUpFormData = {
    email: string,
    password: string,
    confirmPassword: string
}


const SignUpForm:React.FC<SignUpFormProps> = () => {

    const [createUserWithEmailAndPassword, user, loading, userError] = useCreateUserWithEmailAndPassword(auth);
    

    const [formData, setFormData] = useState<SignUpFormData>({
       email: "",
       password: "",
       confirmPassword: ""
    })

    const [formError, setFormError] = useState("");

    

    useEffect(()=>{
        if(userError){
            setFormError(getMessage(userError.code))
        }
    }, [userError])
        
    function onChangeHandler(e : React.ChangeEvent<HTMLInputElement>){
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    async function submitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(formData.confirmPassword !== formData.password){
            setFormError("Passwords do not match")
            return;
        }
        if(formError)
        setFormError("");
        const user = await createUserWithEmailAndPassword(formData.email, formData.password);
        if(user){
            const newUser = new User(user.user.uid, user.user.emailVerified, user.user.email!, user.user.displayName, user.user.photoURL);
            await setDoc(doc(db, "users", newUser.id), userConverter.toFirestore(newUser));
        }
    }
    
    
    return (
        <>
            <p className='text-xs mb-2 text-center'>Sign-Up options</p>
            <div>
                <GoogleAuthProviderButton setFormError={setFormError}></GoogleAuthProviderButton>
            </div>
            <div className='relative h-6 w-full'>
                <p className="before:inline-block before:w-full before:h-[0.1rem] before:bg-gray-200 before:content-[''] after:content-['OR'] after:absolute after:left-[40%] after:w-16 after:text-center after:top-1 after:bg-white"></p>
            </div>
            <div className='w-full'>
                <form onSubmit={submitHandler}>
                    <ModalInputField as='email' id='email' name='email' value={formData.email} label='Email' key="email" onChangeHandler={onChangeHandler} required={true}></ModalInputField>
                    <ModalInputField as='password' id='password' name='password' value={formData.password} label='Password' key="password" onChangeHandler={onChangeHandler} required={true}></ModalInputField>
                    <ModalInputField as='password' id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} label='Confirm Password' key="confirmPassword" onChangeHandler={onChangeHandler} required={true}></ModalInputField>
                    {formError && <p className='text-red-700 text-xs my-2'>*{formError}</p>}
                    <p className='font-normal text-xs m-8'>Forgot your username or password</p>
                    <div className='w-full h-max px-8'>
                        <button type='submit' className={`rd-btn-brand w-full ${loading && 'pointer-events-none opacity-50 relative'}`}><ClipLoader loading={loading} color='white' className='z-10 absolute top-0 bottom-0 right-1/4 my-auto'/>{loading ? 'Signing Up...': 'Sign Up'}</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default SignUpForm;