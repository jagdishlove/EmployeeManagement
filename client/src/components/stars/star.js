import React from "react";
import { Rating } from "react-simple-star-rating";

const Star = ({ onClick, approval, value, data }) => {
  return (
    <div>
      <Rating
        size="33"
        transition
        initialValue={approval ? 5 : value ? value : 0}
        readonly={approval && data?.status === "SUBMITTED" ? false : true}
        onClick={onClick}
        allowFraction
      />
    </div>
  );
};

export default Star;
