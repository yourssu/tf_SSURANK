import React from 'react';

const BANNER = {'file':'banner_1.JPEG','alt':'🐥\n\n새내기를 위한\n수강신청 가이드','link':'https://www.notion.so/92f4ae8c34ff497ca3b6f7e1a8a99d9d'}
export const Banner = ()=>{
    return(
        <div className="banner-box pd-16-top pd-16-side bs">
            <a href={BANNER.link} target="_blank" rel="noreferrer">
            <div className="banner bs">
                <span>🐥</span>
               <p>새내기를 위한<br/>수강신청 가이드</p>
            
            </div>
            </a>
        </div>
    )
}