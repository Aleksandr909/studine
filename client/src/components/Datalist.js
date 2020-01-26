import React from "react";
import { useDispatch } from "react-redux";
import { selectHandler } from "../store/actions/selectHandler";

export const Datalist = ({ selectedValue, options, text, name }) => {
  const dispatch = useDispatch();
  return (
    <div className="input-field col s12 m2">
      <input
        list={name}
        name={name}
        placeholder={selectedValue}
        onChange={event =>
          dispatch(selectHandler({ [`selected${name}`]: event.target.value }))
        }
      />
      <datalist id={name}>
        <option value={text} disabled />
        {options.map((elem, index) => (
          <option key={elem.name + index} value={elem.name} />
        ))}
      </datalist>
    </div>
  );
};
