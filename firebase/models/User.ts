import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class User{
    constructor(
        private readonly _id: string, 
        public readonly _emailVerified: boolean,
        public _email?: string | null,
        public _name?: string | null, 
        public _profileImage?: string | null,
    ){}

    public get id(){
        return this._id;
    }

    public get emailVerified(){
        return this._emailVerified;
    }
}

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore(user: User){
        return {
            id: user.id,
            name: user._name,
            email: user._email,
            emailVerified: user._emailVerified,
            profileImage: user._profileImage
        }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<User>, options?: SnapshotOptions | undefined){
        const data = snapshot.data(options);
        return new User(data.id, data._emailVerified, data._email, data._name, data._profileImage);
    }
}