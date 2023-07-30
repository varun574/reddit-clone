import { atom } from "recoil"

export type SwitchState = {
    onlineStatus : boolean,
    darkMode: boolean
}

const defaultState:SwitchState = {
    onlineStatus: true,
    darkMode: false
}

export const SwitchStates = atom<SwitchState>({
    key: 'SwitchStates',
    default: defaultState
})