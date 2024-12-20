import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';


const ProtectedRoute = ({ children }) => {
    const { user, loading, error } = useSelector((state) => state.auth);
    const [initializing, setInitializing] = useState(user ? false : true);
    const dispatch = useDispatch();

    useEffect(() => {
        async function check() {
            if (!user && !loading) {
                const resultAction = await dispatch(checkAuth());
                setInitializing(false);
                // if (checkAuth.rejected.match(resultAction)) {
                //     toast.error(error, {
                //         duration: 2000,
                //         className: "toast-error"
                //     });
                // }
            }
            else {
                setInitializing(false);
            }
        }
        check();
    }, [dispatch, user]);

    if (initializing) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
