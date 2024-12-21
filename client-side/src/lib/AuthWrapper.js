import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../redux/slices/authSlice";

export function AuthWrapper({ children }) {
    const dispatch = useDispatch();
    const authChecked = useRef(false);

    useEffect(() => {
        if (!authChecked.current) {
            dispatch(checkAuth());
            authChecked.current = true;
        }
    }, [dispatch]);

    return children;
}
