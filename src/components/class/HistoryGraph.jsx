import React  from "react";
import PropTypes from 'prop-types';
import { VictoryChart,VictoryArea,VictoryContainer,VictoryAxis } from "victory";
const HistoryGraph = ({rankData,width}) => {
    const rankName=['U','D','C','B','A'];
        return(
            <div className="detail-graph pd-16-side">
            <div className="header">이 강의 지난 학기 평가</div>
            {
                rankData&&
            <VictoryChart 
                height={135}
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
            <VictoryArea
                domain={{y: [0, 5]}}
                categories={{
                    x: rankData.year,
                  }}
                style={{
                    data: { fill: "#3C95FF",opacity: 0.5 ,stroke:  "#3C95FF" },
                    parent: { border: "1px solid #ccc"},
                    }} data={rankData} x="year" y="ranking" labels={({datum})=>rankName[datum.ranking]}/>
            <VictoryAxis crossAxis={false}/>
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

