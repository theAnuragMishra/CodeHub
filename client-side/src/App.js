import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import ProtectedRoute from './components/auth/ProtectRoute';
import Navbar from './components/NavBar/NavBar';

export default function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
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
            </PersistGate>
        </Provider>
    )
}