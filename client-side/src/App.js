import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VideoLists from './pages/VideoLists/VideoLists';
import Education from './pages/Education/Education';
import NoticeBoard from "./pages/Noticeboard/Noticeboard"
import Leaderboard from './pages/Leaderboard/Leaderboard';
import DashBoard from './pages/UserHome/UserHome';
import TeamMember from "./pages/Team/Team"
import Signup from "./pages/SignUp/signUp"
import VerifyEmail from "./pages/SignUp/verifyEmail"
import VerifyCfID from './pages/SignUp/verifyCfID';
import ContactUs from './pages/ContactUs/ContactUs';
import ProtectedRoute from './components/auth/ProtectRoute';
import Navbar from './components/NavBar/NavBar';
import Spinner from './components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice';

export default function App() {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (loading) {
        return <Spinner />
    }

    return (

        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={"/"} element={<LandingPage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/signUp"} element={<Signup />} />
                <Route path={"/verify-email"} element={<VerifyEmail />} />
                <Route path={"/verify-cf-id"} element={<VerifyCfID />} />
                <Route path={"/education/videos"} element={<VideoLists />} />
                <Route path={"/education"} element={<Education />} />
                <Route path={"/notice-board"} element={<NoticeBoard />} />
                <Route path={"/dashBoard"} element={<ProtectedRoute>
                    <DashBoard />
                </ProtectedRoute>} />
                <Route path={"/leader-board"} element={<Leaderboard />} />
                <Route path={"/team-member"} element={<TeamMember />} />
                <Route path={"/contact-us"} element={<ContactUs />} />
            </Routes>
        </BrowserRouter >

    )
}