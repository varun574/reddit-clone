import { auth, db } from '@/firebase/firebaseApp';
import { User, userConverter } from '@/firebase/models/User';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { ClipLoader } from 'react-spinners';

type GoogleAuthProviderButtonProps = {
    setFormError: React.Dispatch<React.SetStateAction<string>>
};

const GoogleAuthProviderButton:React.FC<GoogleAuthProviderButtonProps> = ({setFormError}) => {

    const [signInWithGoogle, user, googleLoading, userError] = useSignInWithGoogle(auth);
    const [loading, setLoading] = useState<boolean>(false);

    async function createNewUser(){
        setLoading(true);
        const user = await signInWithGoogle();
        if(user){
            const ref = await getDoc(doc(db, "users", user.user.uid));
            if(!ref.exists()){
                const newUser = new User(user.user.uid, user.user.emailVerified, user.user.email!, user.user.displayName, user.user.photoURL);
                await setDoc(doc(db, "users", newUser.id), userConverter.toFirestore(newUser));
            }
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(userError){
            setFormError(userError.message);
        }
    }, [userError])

    
    
    return (
        <>
        
        <button className={`flex hover:bg-slate-100 rounded-full w-3/4 h-12 m-auto justify-center gap-4 border border-1 border-gray-200 transition-all ${(loading || googleLoading) && 'relative pointer-events-none opacity-50 border border-gray-500'}`} onClick={()=>{createNewUser()}}>
            <ClipLoader loading={loading || googleLoading} className='z-10 absolute top-0 bottom-0 my-auto' color='#FF4500'>
            </ClipLoader>
            <FcGoogle className='h-8 w-8 p-1 self-center'></FcGoogle>
            <p className='text-base self-center m-atuo'>{(loading || googleLoading) ? 'Siging in...' : 'Continue with Google'}</p>
        </button>
        </>
    )
}
export default GoogleAuthProviderButton;