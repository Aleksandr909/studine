import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "materialize-css/dist/css/materialize.min.css";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  useEffect(() => {
    const elem = document.querySelector(".sidenav");
    const instance = window.M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
    document.querySelector(".btn").addEventListener("click", () => {
      instance.close();
    });
  });

  return (
    <div>
      <ul id="slide-out" className="sidenav blue-grey darken-4">
        <Link to="/user" className="white-text">
          <div className="row user">
            <div className="col s4 circle" />
            <div className="col s8">
              <ul>
                <li>Учреждение</li>
                <li>Имя пользователя</li>
              </ul>
            </div>
          </div>
        </Link>
        <li>
          <Link to="/home" className="white-text">
            Главная
          </Link>
        </li>
        <li>
          <Link to="/groups" className="white-text active">
            Группы
          </Link>
        </li>
        <li>
          <Link to="/disciplines" className="white-text active">
            Дисциплины
          </Link>
        </li>
        <li>
          <Link to="/timetable" className="white-text active">
            Расписание
          </Link>
        </li>
        <li>
          <Link to="/news" className="white-text">
            Новости
          </Link>
        </li>
        <li>
          <Link to="/important" className="white-text active">
            Важные страницы
          </Link>
        </li>
        <li>
          <Link to="/calendar" className="white-text active">
            Календарь
          </Link>
        </li>
        <li>
          <Link
            className="waves-effect waves-light btn white-text"
            to="/"
            onClick={logoutHandler}
          >
            Выйти
          </Link>
        </li>
      </ul>
      <nav className="blue darken-1">
        <button
          data-target="slide-out"
          className="waves-effect waves-light sidenav-trigger btn blue darken-4"
        >
          <i className="material-icons">menu</i>
        </button>
      </nav>
    </div>
  );
};
