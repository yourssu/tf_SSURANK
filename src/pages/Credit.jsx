import React from 'react';
import Divider from '../components/Divider';
const Credit = () => {
    const contributor=[
        {
            part:'🌐 Web FE Developer',
            member:[{name:'Margarets',link:'https://github.com/Margarets00'}]
        },
        {
            part:'📊 Backend Developer',
            member:[{name:'Reno',link:'https://github.com/NotableDeveloper'},{name:'Mike',link:'https://github.com/mornings9047'},{name:'Maru',link:'https://github.com/always0ne'}]
        },
        {
            part:'🍎 iOS Developer',
            member:[{name:'Andrew',link:'https://github.com/escapeanaemia'}]
        },
        {
            part:'🤖 Android Developer',
            member:[{name:'Ace',link:'https://github.com/acious'},{name:'Jiho',link:'https://github.com/jiho1996'}]
        },
        {
            part:'📆 Product Owner & 🎨 Designer',
            member:[{name:'Gyuni',link:'https://github.com/Gyuni'}]
        }
    ]
    return(
        <div className="credit" style={{fontSize:"14px"}}>
            <div className="pd-16-side pd-12-bt pd-16-top bs">
                <span><span className="color">SSU Rank</span> at YOURSSU</span>
                <p>만든사람들</p>
            </div>
            <Divider/>
            <div style={{fontSize:"13px"}} className="pd-16-side pd-16-top pd-16-bt bs">
                {contributor.map((index,key)=>{
                    return(
                        <>
                            <span key={key}>{index.part}</span>
                            <ul>
                                {index.member.map((sub,key2)=>(
                                    <li key={key2}>{sub.name}<a href={sub.link} target="_blank" rel="noreferrer"> 🔗</a></li>
                                ))}
                            </ul>
                        </>
                    )
                })}
                <span><img style={{width:"30px"}} className="icon sm" src="/img/YourssuLogo.png"/> Yourssu</span>
                <ul>
                    <li>About us <a href="https://intro.yourssu.com" target="_blank" rel="noreferrer"> 🔗</a></li>
                    <li>Tech Blog <a href="https://blog.yourssu.com" target="_blank" rel="noreferrer"> 🔗</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Credit