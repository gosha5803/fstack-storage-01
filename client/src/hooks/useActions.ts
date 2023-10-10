import { useDispatch } from "react-redux";
import { allActions } from "../store/allActions";
import {bindActionCreators} from '@reduxjs/toolkit'

export function useActions() {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}