import { useSelector } from "react-redux";
import { AppStore } from "../store";
import {TypedUseSelectorHook} from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<AppStore> = useSelector