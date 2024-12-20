import { BackgroundBeamsWithCollision } from "../../components/ui/background_beams_with_collision";
import Loader from "../../components/Spinner/Loader"
import { useState } from "react";
import { verifyEmail } from "../../redux/slices/authSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function VerifyEmail() {

    const [verificationCode, setVerificationCode] = useState("");
    const { error, loading } = useSelector((state) => state.auth);

    const [formError, setFormError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = location.state?.email;
    const cfID = location.state?.cfID;
    console.log(email)
    const handleVerify = async () => {
        if (!verificationCode.trim()) {
            setFormError("Please enter the verification code.");
            return;
        }

        const resultAction = await dispatch(verifyEmail({ email }))
        if (verifyEmail.fulfilled.match(resultAction)) {
            toast.success("Email verified successfully", {
                duration: 2000,
                className: "toast-success"
            })
            navigate("/verify-cf-id", { state: { email, cfID } });
        }
        else {
            toast.error(error, {
                duration: 2000,
                className: "toast-error"
            });
        }
    };

    return (
        <BackgroundBeamsWithCollision>
            <div className="w-screen h-screen flex justify-center items-center text-white">
                <div className="p-8 bg-[#0A0A2A] border-2 border-[#3E3E8E] rounded-lg shadow-lg text-center w-11/12 max-w-md">
                    {/* Title */}
                    <h1 className="text-2xl font-bold mb-4 text-[#D1D1FF]">
                        Verify Your Email
                    </h1>

                    {/* Input Box for Verification Code */}
                    <div className="mb-4">
                        <label
                            htmlFor="verificationCode"
                            className="block text-sm md:text-base font-semibold text-[#C5C5FF] mb-2"
                        >
                            Enter Verification Code
                        </label>
                        <input
                            type="text"
                            id="verificationCode"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Enter code here"
                            className="w-full p-2 md:p-3 rounded border focus:outline-none focus:border-blue-400 bg-[#121232] text-gray-300 placeholder-gray-500"
                        />
                        {formError && (
                            <p className="text-red-500 text-xs mt-1">{error}</p>
                        )}
                    </div>

                    {/* Verify Button */}
                    {loading ? (
                        <Loader />
                    ) : (
                        <button
                            onClick={handleVerify}
                            className="w-full bg-[#5B5BFF] hover:bg-[#4A4AFF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 mb-4"
                        >
                            Verify
                        </button>
                    )}

                    {/* Resend Verification */}
                    <p className="text-sm text-[#B3B3FF]">
                        Didn't receive the email?{" "}
                        <a
                            href="#"
                            className="text-[#5B5BFF] hover:underline hover:text-[#8F8FFF] transition duration-200"
                        >
                            Resend Verification Code
                        </a>
                    </p>
                </div>
                <Toaster />
            </div>
        </BackgroundBeamsWithCollision>
    );
}

export default VerifyEmail;
