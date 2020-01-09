import React from "react";
import { groupsNamesHandler, deleteRow } from "../store/actions/groups";
import { useDispatch, useSelector } from "react-redux";

const GroupsAll = () => {
  const groups = useSelector(state => state.app.groups);
  console.log(groups);

  const dispatch = useDispatch();

  let groupsCounter = 0;

  for (let key in groups) {
    groupsCounter++;
    return (
      <tr key={`tr+${groupsCounter}`}>
        <td>{groupsCounter + 1}</td>
        <td>
          <input
            type="text"
            name={`Name ${groupsCounter}`}
            value={key}
            onChange={event => dispatch(groupsNamesHandler(event, groups))}
          ></input>
        </td>
        <td>
          <input
            type="date"
            name={`Date ${groupsCounter}`}
            value={groups[key].date}
            onChange={event => dispatch(groupsNamesHandler(event, groups))}
          ></input>
        </td>
        <td onClick={() => dispatch(deleteRow(key, groups))}>-</td>
      </tr>
    );
  }
};

export const GroupsTbody = () => {
  console.log("groups");
  return <tbody id="group_table">{GroupsAll()}</tbody>;
};
