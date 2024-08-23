import React, { Component } from "react";

const DropDown = ({ items, onItemSelect, selectedItem }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selectedItem ? selectedItem.name : <span>Select a Genre... </span>}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {items.map((item) => (
          <li
            key={item.id}
            className={
              item === selectedItem ? "dropdown-item active" : "dropdown-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item.name}
          </li>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
