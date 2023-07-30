import { auth, db } from '@/firebase/firebaseApp';
import { User, userConverter } from '@/firebase/models/User';
import { doc, getDoc } from 'firebase/firestore';
import { destroyCookie, setCookie } from 'nookies';
import React, { createContext, useEffect, useState } from 'react';

type authProps = {
    children: React.ReactNode[] | React.ReactNode
};

export type UserAuthContext = [User | null | undefined, boolean]

export const AuthContext = createContext<UserAuthContext>([null, false])

const AuthProvider:React.FC<authProps> = ({children}) => {
    
    const [user, setUser] = useState<User | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        setLoading(true);
        const unsubscribe =  auth.onIdTokenChanged( async (userObserver)=>{
            if(userObserver){
                const token = await userObserver.getIdToken();
                const docSnap = await getDoc(doc(db, "users", userObserver.uid).withConverter(userConverter));
                const user = docSnap.data();
                setUser(user);
                setCookie(null, 'token', token, {secure: true, maxAge: 24*60*60});
            }
            else{
                setUser(null)
                destroyCookie(null, 'token');
            }
            setLoading(false);
        })
        return ()=>unsubscribe();
    }, [])

    useEffect(()=>{
        const handle = setInterval(async ()=>{
            try{
                const user = auth.currentUser;
                if(user)
                await user.getIdToken(true);
            }
            catch(e){
                setUser(null)
            }
        }, 10*60*100)

        return ()=>clearInterval(handle)
    },[])

    return (
        <AuthContext.Provider value={[user, loading]}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;