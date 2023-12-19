import React from "react";
import { Rating } from "react-simple-star-rating";

const Star = ({ onClick, approval, value }) => {
  return (
    <div>
      <Rating
        size = '33'
        transition
        initialValue={approval ? 0 : value ? value : 0}
        readonly={approval ? false : true}
        onClick={onClick}
        allowFraction
      />
    </div>
  );
};

export default Star;
