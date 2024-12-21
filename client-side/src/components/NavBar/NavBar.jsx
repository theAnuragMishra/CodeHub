
import { useNavigate } from "react-router-dom";
import CodeHubLogo from "./Assets/Logos/CodeHubSmall.png";
import HamburgerMenu from "./HamburgerMenu";
import { useSelector } from "react-redux";
// import { Toaster } from "react-hot-toast";
// import logo from "../../assets/general/logo.webp";

function Navbar() {
    const auth = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    // console.log(auth);
    const handleLogoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate("/");
    };


    return (
        <>
            {/* Render for larger screens */}
            <div className="w-[100vw] bg-primary  custom1980:h-[92px] md:h-[60px] px-8 py-2 fixed bg-scheduleLargeText items-center justify-between z-50 md:flex hidden">
                <img
                    src={CodeHubLogo}
                    className="logo hover:cursor-pointer w-auto h-10 object-contain bg-transparent"
                    onClick={handleLogoClick}
                />

                <div className="text-white navlinks w-[67%] flex h-full items-center justify-between font-bebas md:text-[1.6vw]">
                    <h2
                        className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => navigate("/")}
                    >
                        HOME
                    </h2>
                    {/* <h1
                        className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => scroll("aboutUsMain")}
                    >
                        ABOUT US
                    </h1> */}
                    <h2
                        className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => navigate("/contact-us")}
                    >
                        Contact Us
                    </h2>
                    {/* <h1
                        className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => {
                            navigate("/team");
                        }}
                    >
                        MOTIVE
                    </h1> */}
                    {/* <h1
                        className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => {
                            navigate("/sponsors");
                        }}
                    >
                        EVENTS
                    </h1> */}
                    <h2
                        className="hover:text-accent tracking-widest transition-colors cursor-pointer duration-300"
                        onClick={() => {
                            navigate("/notice-board");
                        }}
                    >
                        NoticeBoard
                    </h2>
                </div>

                {auth ?
                    <button
                        onClick={() => {
                            navigate("/dashboard");
                        }}
                        className="auth rounded-lg w-[11vw] bg-[#008CFF] lg:w-[7.1vw] h-[47px] tracking-wider text-white items-center justify-center font-semibold font-bebas hover:text-primary hover:bg-accent transition-all duration-500"
                    >
                        <h1 className="lg:text-[1.3vw] md:text-[1.5vw] ">Profile</h1>
                    </button> :
                    <button
                        onClick={() => {
                            navigate("/login");
                        }}
                        className="auth rounded-lg w-[11vw] bg-[#008CFF] lg:w-[7.1vw] h-[47px] tracking-wider text-white items-center justify-center font-semibold font-bebas hover:text-primary hover:bg-accent transition-all duration-500"
                    >
                        <h1 className="lg:text-[1.3vw] md:text-[1.5vw] ">Login</h1>
                    </button>
                }

            </div>

            {/* Render for mobile screens */}
            <div className=" w-screen h-auto -top-[15px]  flex items-center justify-end z-50 md:hidden">
                <div className="bg-primary w-full h-24 absolute md:hidden"></div>
                <div className="z-30">
                    <img
                        src={CodeHubLogo}
                        className="logo absolute  left-2  logo hover:cursor-pointer w-auto h-10 "
                        onClick={handleLogoClick}
                    ></img>
                </div>
                <div>
                    <HamburgerMenu />
                </div>
            </div>
        </>
    );
}

export default Navbar;
