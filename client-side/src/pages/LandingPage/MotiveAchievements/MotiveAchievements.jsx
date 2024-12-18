import React from 'react'
import "./MotiveAchievements.css"
// import { v4 as uuidv4 } from "uuid";

export default function MotiveAchievements() {

    // ACHIEVEMENTS TESTING DATA
    /* const achievmentsData = [{
        eventName: "Chicago State Event",
        date: "July, 2022",
        rank: "Rank 1"
    }, {
        eventName: "Art of Coding",
        date: "August, 2022",
        rank: "Rank 2"
    }, {
        eventName: "Australia Olympiad Event",
        date: "September, 2022",
        rank: "Rank 3"
    }, {
        eventName: "IIT Bombay Fest",
        date: "October, 2022",
        rank: "Rank 4"
    }, {
        eventName: "New York State Event",
        date: "November, 2022",
        rank: "Rank 5"
    }, {
        eventName: "Research for Life",
        date: "November, 2022",
        rank: "Rank 6"
    }, {
        eventName: "Trio Maniac",
        date: "November, 2022",
        rank: "Rank 7"
    }]; */


    return (
        <div id='motiveAchievementsMain'>
            <div id='motiveMain'>
                <div id='motiveTitleMain'>
                    Our Motive
                </div>
                <div id='motiveContentMain'>
                    <p>The objective of MNNIT’s Coding Club is to establish a thriving coding community
                    and foster a culture of collaboration, continuous learning, and personal
                    growth.Here in this club we aim to guide and create an environment where
                    individuals with a passion for coding come together to support and inspire each
                    other, ultimately helping everyone in the club to enhance their programming skills
                    and reach their full potential.</p>
                    <p>Our objectives </p>
                    <p>1. Building a Strong Coding Community: We strive to create a
                    close-knit community of like-minded individuals with honest mindset, who share a
                    passion for coding. Through regular meetings, workshops, and social events, we
                    encourage members to interact, collaborate, and forge meaningful connections,
                    fostering an inclusive and supportive coding culture.</p>
                    <p>2. Collaboration and Knowledge Sharing: We believe in the power
                    of teamwork and the benefits of sharing knowledge. Our club facilitate
                    opportunities for members to collaborate on coding projects, solve programming
                    challenges, and exchange ideas and expertise. We organize coding sessions,
                    provide programming exercises, and coding bootcamps to encourage
                    collaboration and foster a spirit of learning together.</p>
                    <p>3. Personal Growth and Skill Development: We are committed to
                    help our members grow and excel in their coding abilities. By organizing
                    workshops, seminars, and guest speaker sessions, we provide opportunities for
                    members to learn new programming languages, explore cutting-edge
                    technologies, and develop industry-relevant skills. Through mentorship programs
                    and peer-to-peer learning, we create an environment where everyone can enhance
                    their coding prowess.</p>
                    <p>4. Promotion of Competitive Programming: Recognizing the value
                    of competitive programming as a means to sharpen problem-solving skills and
                    improve algorithmic thinking, we actively promote this aspect within our club. We
                    organize coding competitions, encourage our member to participate in external
                    coding contests, and provide resources and guidance to help our members to
                    excel in competitive programming.</p>
                    <p>Through these objectives, Our Coding Club create a
                    vibrant coding community in the college that empowers its members to grow,
                    learn, and succeed together, while also making a meaningful contribution to the
                    broader coding community.</p>
                </div>
            </div>
            <div style={{ height : '50vh'}}></div>
            {/* <div id='achievementsMain'>
                <div id='achievementsTitleMain'>
                    Our Achievements
                </div>
                <div id='achievementsContentMain'>
                    <div className='achievementsBoxExtraMarginMain'>
                    </div>
                    {achievmentsData.map((achievment) => {
                        return (
                            <div key={uuidv4()} className="achievementBoxCoverMain">
                                <div className='achievementBoxContentMain'>
                                    <div className='achievementBoxEventName'>{achievment.eventName}</div>
                                    <div className='achievementBoxEventDate'>{achievment.date}</div>
                                    <div className='achievementBoxEventRank'>{achievment.rank}</div>
                                </div>
                            </div>
                        );
                    })}
                    <div className='achievementsBoxExtraMarginMain'>
                    </div>
                </div> */}
            {/* </div> */}
        </div>
    )
}