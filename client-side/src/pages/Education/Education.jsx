import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages.css';
import './Education.css';
import Spinner from '../../components/Spinner/Spinner';
import NavSpace from '../../components/NavSpace';
import Alert from '../../components/Alert/Alert';
import axios from 'axios';
import NavBarSecond from '../../components/NavBar/NavBarSecond';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';

function EduSection(props) {
    const _id = props._id;
    return (
        <div>
            <div className="super-box" onClick={()=>props.redirectToVideos(props.title)}>
                <div className="edu-box">
                    <div className="edu-title">{props.title}</div>
                </div>
            </div>
        </div>
    );
}



export default function Education() {
    
    const navigate = useNavigate();
    const {user}= useSelector((state)=> state.auth);
    const [PageHtml, setPageHtml] = useState(<>
        <NavSpace />
        <Spinner />
    </>);

    const redirectToVideos = (category) => {
        navigate(`/education/videos?category=${category}`);
    }

    const updatePageHtml = async () => {

        try {
            // const user = await JSON.parse(localStorage.getItem(process.env.CODETOGETHER_APP_LOCALHOST_KEY));
            const EducationAPIresponse = await axios.post(process.env.REACT_APP_SERVER_BASE_URL + '/education', { cfID: user.cfID }, { withCredentials: true });
            const EducationInfo = EducationAPIresponse.data.data;
            const EducationComponent = EducationInfo.map((category, index) => <EduSection key={index} title={category.title} _id={category._id} redirectToVideos={redirectToVideos}/>)

            setPageHtml(<>
                <div className="background-pink-blue">
                    <div id='navBarLandingPageContainer'>   
                        <NavBarSecond />
                    </div>
                    <NavSpace />
                    <div className='education-heading'>Education</div>
                    <div className='EducationOuterContainer'>
                        <div className='EducationInnerContainer'>
                            {EducationComponent}
                        </div>
                    </div>
                </div>
                <Footer />
            </>);
        } catch (err) {
            setPageHtml(
                <>
                    <div id='navBarLandingPageContainer'>
                        <NavBarSecond />
                    </div>
                    <NavSpace />
                    <div className="background-pink-blue" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Alert heading={"Couldn't fetch data"} body={"Check your internet connection and try again.."} />
                    </div>
                </>
            );
        }
    }


    useEffect(() => {
        updatePageHtml();
    }, []);


    return (
        <>
            {PageHtml}
        </>
    );
}