import React from "react";
import PropTypes from 'prop-types';
const Header = ({detailData}) =>{
      return(
        <div className="detail-box pd-16-side pd-16-bt pd-16-top">
            <div className="detail-rank-logo"><img className={"rank-img "+ "none"} src={"/img/"+detailData.ranking.substring(0,1) +".png"}/></div>
            <div className="detail-info">
                <span>{detailData.name}</span>
                
                <p>{detailData.department}·{detailData.position}</p>
            </div>
        </div>
      );
  }
Header.propTypes = {
  detailData:PropTypes.shape({
    ranking:PropTypes.string.isRequired,
    position:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    department:PropTypes.string.isRequired,
    professorId:PropTypes.number.isRequired
  })
}
export default Header;