import { useSelector } from "react-redux";
import { AppStore } from "../store";
import { TypedUseSelectorHook } from 'react-redux'

//Типизация стора.
export const useTypedSelector: TypedUseSelectorHook<AppStore> = useSelector