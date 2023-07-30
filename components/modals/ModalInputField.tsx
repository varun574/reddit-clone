import React from 'react';

type ModalInputFieldProps = {
    name: string,
    id: string,
    value: string,
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
    as: React.HTMLInputTypeAttribute,
    label: string,
    required: boolean
};

const ModalInputField:React.FC<ModalInputFieldProps> = ({name, id, value, onChangeHandler, as, label, required}) => {
    
    const peerNames = {
        username: "peer/username",
        password: "peer/password",
        email: "peer/email",
        confirmPassword: "peer/confirmPassword"
    }

    const peerStyles = {
        username: "peer-focus/username:text-xs peer-focus/username:font-normal peer-focus/username:pl-4 peer-focus/username:pt-1 peer-focus/username:top-0 peer-hover/username:text-xs peer-hover/username:font-normal peer-hover/username:pl-4 peer-hover/username:pt-1 peer-hover/username:top-0",
        password: "peer-focus/password:text-xs peer-focus/password:font-normal peer-focus/password:pl-4 peer-focus/password:pt-1 peer-focus/password:top-0 peer-hover/password:text-xs peer-hover/password:font-normal peer-hover/password:pl-4 peer-hover/password:pt-1 peer-hover/password:top-0",
        email: "peer-focus/email:text-xs peer-focus/email:font-normal peer-focus/email:pl-4 peer-focus/email:pt-1 peer-focus/email:top-0 peer-hover/email:text-xs peer-hover/email:font-normal peer-hover/email:pl-4 peer-hover/email:pt-1 peer-hover/email:top-0",
        confirmPassword: "peer-focus/confirmPassword:text-xs peer-focus/confirmPassword:font-normal peer-focus/confirmPassword:pl-4 peer-focus/confirmPassword:pt-1 peer-focus/confirmPassword:top-0 peer-hover/confirmPassword:text-xs peer-hover/confirmPassword:font-normal peer-hover/confirmPassword:pl-4 peer-hover/confirmPassword:pt-1 peer-hover/confirmPassword:top-0"
    }

    return (
        <div className='relative m-2 h-12'>
            <input type={as} id={id} name={name} value={value} onChange={onChangeHandler} className={`form-input h-full w-full rounded-full pl-4 pt-6 bg-gray-100 border-transparent focus:border-gray-300 focus:ring-0 ${peerNames[id as keyof typeof peerNames]}`} required={required}></input>
            <label htmlFor={id}  className={`absolute left-0 pl-10 top-1/4 text-sm font-medium text-gray-500 ${peerStyles[id as keyof typeof peerStyles]} ${value.length>0 && 'text-xs pl-4 pt-1 !top-0 font-normal'} transition-all ease-linear`}>{label}</label>
        </div>
    )
}
export default ModalInputField;