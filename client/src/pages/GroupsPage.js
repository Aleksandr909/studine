import React, { useState } from "react";

export const GroupsPage = () => {
  const [groups, setGroups] = useState([]);

  const groupsNamesHandler = event => {
    let newGroupsArr = [...groups];
    const [name, num] = event.target["name"].split(" ");
    let selectedInputInState = newGroupsArr[num];
    let newData = { "": "" };
    if (name === "Name") {
      newData = {
        [event.target.value]: Object.values(selectedInputInState)[0]
      };
    } else if (name === "Date") {
      newData = {
        [Object.keys(selectedInputInState)[0]]: event.target.value
      };
    }
    newGroupsArr[num] = newData;

    setGroups(newGroupsArr);
  };
  const deleteRow = index => {
    const newGroupsArr = [...groups];
    newGroupsArr.splice(index, 1);
    setGroups(newGroupsArr);
  };
  return (
    <div>
      <p>Группы</p>
      <table>
        <thead>
          <tr>
            <td>№</td>
            <td>Имя группы</td>
            <td>Начало учебного семестра</td>
            <td>Удалить</td>
          </tr>
        </thead>
        <tbody id="group_table">
          {groups.map((elem, index) => (
            <tr key={`tr+${index}`}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name={`Name ${index}`}
                  value={Object.keys(elem)[0]}
                  onChange={event => groupsNamesHandler(event)}
                ></input>
              </td>
              <td>
                <input
                  type="date"
                  name={`Date ${index}`}
                  value={Object.values(elem)[0]}
                  onChange={event => groupsNamesHandler(event)}
                ></input>
              </td>
              <td onClick={() => deleteRow(index)}>-</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setGroups([...groups, { "": "" }])}
        className="btn"
        id="new_line"
        name="button"
      >
        +
      </button>
      <button
        onClick={() => console.log([groups])}
        className="btn"
        id="add"
        name="button"
      >
        Сохранить
      </button>
    </div>
  );
};
