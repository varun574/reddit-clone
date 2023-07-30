import {atom} from "recoil"

export enum modals{
    LOGIN,
    SIGNUP
}

export type ModalState = {
    show: boolean,
    for: modals
}
const defaultModalState:ModalState = {
    show: false,
    for: modals.LOGIN
}
export const modalState = atom<ModalState>({
    key: 'modalState',
    default: defaultModalState
})