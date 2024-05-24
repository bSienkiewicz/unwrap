"use client";
import React, { useState, useEffect } from "react";

const Input = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <div className="relative flex h-auto gap-1 w-full">
      <input
        type="text"
        className="bg-transparent px-2 py-1 border-b-2 border-black flex-1 text-xl h-8 text-black focus:outline-none"
        value={props.defaultValue || value}
        placeholder={props.placeholder || ""}
        onChange={handleChange}
      />
      {props.children}
    </div>
  );
};

export default Input;
