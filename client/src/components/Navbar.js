import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "materialize-css/dist/css/materialize.min.css";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isFullScreen, SetIsFullScreen] = useState(null);

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
  document.addEventListener("fullscreenchange", event => {
    if (document.fullscreenElement) {
      SetIsFullScreen(true);
    } else {
      SetIsFullScreen(false);
    }
  });
  function fullScreen(element) {
    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitrequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullscreen) {
        element.mozRequestFullScreen();
      }
    } else {
      if (element.requestFullscreen) {
        document.exitFullscreen();
      } else if (element.webkitrequestFullscreen) {
        document.exitFullscreen();
      } else if (element.mozRequestFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  var html = document.documentElement;

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
          <Link to="/teachers" className="white-text active">
            Преподаватели
          </Link>
        </li>
        <li>
          <Link to="/classrooms" className="white-text active">
            Аудитории
          </Link>
        </li>
        <li>
          <Link to="/changes" className="white-text active">
            Изменения
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
      <div className="navbar-fixed">
        <nav className="blue darken-1">
          <div className="waves-effect waves-light ">
            <i
              data-target="slide-out"
              className="material-icons btn-flat sidenav-trigger"
            >
              menu
            </i>
          </div>

          <div
            className="waves-effect waves-light "
            onClick={() => {
              fullScreen(html);
            }}
          >
            <i className="material-icons btn-flat ">
              {!isFullScreen ? "fullscreen" : "fullscreen_exit"}
            </i>
          </div>
        </nav>
      </div>
    </div>
  );
};
