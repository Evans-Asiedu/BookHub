import React from "react";

const SearchBox = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      onKeyDown={(e) => onKeyDown(e)}
    />
  );
};

export default SearchBox;
