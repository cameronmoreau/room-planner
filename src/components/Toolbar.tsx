import React from "react";
import { Action } from "../types";

interface ToolbarProps {
  onChange?: (action: Action) => void;
  value?: Action;
}

export const Toolbar: React.FC<ToolbarProps> = ({ value, onChange }) => {
  const options: Action[] = ["draw", "move", "select"];

  return (
    <div>
      {options.map((option) => (
        <>
          <input
            id={option}
            type="radio"
            onChange={() => onChange(option)}
            value={option}
            checked={option === value}
          />
          <label htmlFor={option}>{option}</label>
        </>
      ))}
    </div>
  );
};
