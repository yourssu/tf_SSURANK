import React  from "react";
import PropTypes from 'prop-types';
import { VictoryChart,VictoryBar,VictoryArea,VictoryContainer,VictoryScatter,VictoryAxis } from "victory";
const HistoryGraph = ({rankData,width}) => {
    const rankName=['','D','C','B','A'];
        return(
            <div className="detail-graph pd-16-side">
                {console.log(rankData.length)}
            <div className="header">이 강의 지난 학기 평가</div>
            {   
                rankData&&
            <VictoryChart 
                height={150}
                width={width}
                padding={30}
                responsive={false}  
                containerComponent={
                    <VictoryContainer
                        style={{
                            pointerEvents: "auto",
                            userSelect: "auto",
                            touchAction: "auto"
                        }}
                    />}>
                    {
                        rankData.length > 1 ?
                            <VictoryArea
                                domain={{y: [0.5, 5]}}
                                categories={{
                                    x: rankData.year,
                                }}
                                style={{
                                    data: { fill: "#3C95FF",opacity: 0.5 ,stroke:  "#3C95FF" },
                                    parent: { border: "1px solid #ccc"},
                                    }} 
                                data={rankData} x="year" y="ranking"/>
                            :
                            <VictoryBar
                            cornerRadius={5}
                            style={{ 
                                data: { fill: "#3C95FF",opacity: 0.5 ,stroke:  "#3C95FF",width: 20 },
                                parent: { border: "1px solid #ccc"}, 
                                
                            }}
                            data={rankData}
                            x="year" y="ranking" 
                            />
                    }
            <VictoryScatter
                labels={({datum})=>rankName[datum.ranking]}
                data={rankData}
                x="year" y="ranking" 
                style={{ 
                    labels:{
                    fontSize: 14,
                        fill:"#3C95FF"
                    },
                    data: { fill: "#3C95FF" } }}
                size={2}
            />
            <VictoryAxis crossAxis={false} style={{
                axis: {stroke:"none"},
                tickLabels:{
                    fill:"#868E96",
                    fontSize:11
                }
            }}/>
           
            </VictoryChart>
            }
        </div>
        )
}
HistoryGraph.propTypes={
    rankData: PropTypes.array.isRequired,
    width:PropTypes.number.isRequired
}
export default HistoryGraph;

