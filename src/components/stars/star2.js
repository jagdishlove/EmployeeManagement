import React from 'react';
import { Rating } from 'react-simple-star-rating';

const Star2 = ({ rating, onChange, disabled }) => {
  return (
    <Rating
      initialValue={rating}
      onClick={!disabled ? onChange : undefined}
      fillColor="#FFC107" // Star color
      emptyColor="#E0E0E0" // Empty star color
      readonly={disabled}
      allowFraction
      size={24} // You can adjust the size as needed
    />
  );
};

export default Star2;
