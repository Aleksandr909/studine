import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { GroupsPage } from "./pages/GroupsPage";
import { HomePage } from "./pages/HomePage";
import { NewsPage } from "./pages/NewsPage";
import { AuthPage } from "./pages/AuthPage";
import { CalendarPage } from "./pages/CalendarPage";
import { DisciplinesPage } from "./pages/DisciplinesPage";
import { ImportantPage } from "./pages/ImportantPage";
import { TimetablePage } from "./pages/TimetablePage";
import TeachersPage from "./pages/TeachersPage";
import { ClassroomsPage } from "./pages/ClassroomsPage";
import ChangesPage from "./pages/ChangesPage";
import { ClassroomsAllPage } from "./pages/ClassroomsAllPage";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/groups" exact>
          <GroupsPage />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/disciplines" exact>
          <DisciplinesPage />
        </Route>
        <Route path="/timetable" exact>
          <TimetablePage />
        </Route>
        <Route path="/news" exact>
          <NewsPage />
        </Route>
        <Route path="/important" exact>
          <ImportantPage />
        </Route>
        <Route path="/calendar" exact>
          <CalendarPage />
        </Route>
        <Route path="/teachers" exact>
          <TeachersPage />
        </Route>
        <Route path="/classrooms" exact>
          <ClassroomsPage />
        </Route>
        <Route path="/classrooms/all" exact>
          <ClassroomsAllPage />
        </Route>
        <Route path="/changes" exact>
          <ChangesPage />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
