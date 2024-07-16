import React, { useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import Tooltip from "./Tooltip";

const Star = ({ onClick, approval, value, data }) => {

  useEffect(() => {
    // Remove the title attributes from all SVG elements when the component mounts
    const svgElements = document.querySelectorAll('.style-module_fillIcons__6---A svg');
    svgElements.forEach(svgElement => {
      svgElement.removeAttribute('title');
    });
  }, []);


  return (
    <Tooltip text={approval ? "Approved" : `Rating: ${value?.toFixed(2)}`}>
      <div>
        <Rating
          size="31"
          transition
          initialValue={approval ? 5 : value ? value : 0}
          readonly={approval && data?.status === "SUBMITTED" ? false : true}
          onClick={onClick}
          allowFraction
          showTooltip={false}
        />
      </div>
    </Tooltip>
  );
};

export default Star;
