import { useDispatch } from "react-redux";
import { allActions } from "../store/allActions";
import {bindActionCreators} from '@reduxjs/toolkit'

//Замыкание всех actions на диспетчер, чтобы просто вызывать их как функции.
export function useActions() {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}