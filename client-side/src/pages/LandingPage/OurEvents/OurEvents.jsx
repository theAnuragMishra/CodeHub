import React from 'react';
import { useRef } from 'react';
import "./OurEvents.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function OurEvents() {

    const navigate = useNavigate();
    const EventContainer = useRef();


    // EVENTS DEMO DATA
    const eventsData = [{
        eventName: "Insomnia",
        summary: "An ACM-ICPC styled team based competitive programming contest organised by Motilal Nehru National Institute of Technology Annually in its Technical fest Avhiskar",
        registrationStatus: false
    },{
        eventName: "Code Of The Day",
        summary: "An ACM-ICPC styled 7-days long solo competitive programming contest organised by Motilal Nehru National Institute of Technology Annually in its Technical fest Avhiskar",
        registrationStatus: false,
    },{
        eventName: "Hack-36",
        summary: "A 36 hours long Hackathon organised Annually by Motilal Nehru National Institute of Technology",
        registrationStatus: false
    },{
        eventName: "Code Sangam",
        summary: "A unified blend of development events based on all known tech stacks organised annually by Motilal Nehru National Institute of Technology",
        registrationStatus: false
    },];


    return (
        <div id='ourEventsMain'>
            <div id='ourEventsTitle'>
                Our Events
            </div>
            <div id='ourEventsContent' ref={EventContainer}>
                {eventsData.map((event) => {
                    return (
                        <div key={uuidv4()} className="eventBoxMain">
                            <div className='eventBoxContentMain'>
                                <div className='eventBoxEventName'>{event.eventName}</div>
                                <div className='eventBoxEventSummary'>{event.summary}</div>
                                {
                                    (event.registrationStatus)
                                        ?
                                        <>
                                            <div onClick={() => navigate("/demoLink")} className='eventBoxRegistrationOpen'>
                                                Register Now
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className='eventBoxRegistrationClosed'>
                                                Registration Closed
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}