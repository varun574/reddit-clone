import { SwitchState, SwitchStates } from '@/atoms/switchAtom';
import { Switch } from '@headlessui/react';
import React from 'react';
import { SetterOrUpdater, useRecoilValue } from 'recoil';

type SwitchItemProps = {
    label: string,
    enabled: boolean
    setEnabled : SetterOrUpdater<SwitchState> 
};


const SwitchItem:React.FC<SwitchItemProps> = ({label, enabled, setEnabled}) => {
    
    const switchStates= useRecoilValue(SwitchStates);

    return (
        <Switch.Group>
            <Switch.Label className="cursor-pointer">{label}</Switch.Label>
            <Switch
            checked={enabled}
            onChange={()=>setEnabled((switchStates))}
            className={`ui-checked:bg-sky-500  ui-not-checked:bg-gray-300  relative float-right mr-6 inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
            <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
        </Switch.Group>
    )
}
export default SwitchItem;