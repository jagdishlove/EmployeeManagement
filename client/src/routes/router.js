import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/login/login";
import Sidebar from "../components/sidebarMenu/sidebar";
import CreateNewPassword from "../pages/createNewPassword/createNewPassword";
import ForgotPassword from "../pages/forgotPassword/forgotPassword";

import { useSelector } from "react-redux";
import MasterDataPage from "../components/AdminConsole/masterDataPage/masterDataPage";
import CreateProjectStepperOne from "../components/AdminConsole/projectsPage/createProjectStepper/createProjectStepperOne";
import ProjectPage from "../components/AdminConsole/projectsPage/projectPage";
import ResourceAllocationStepperTwo from "../components/AdminConsole/projectsPage/createProjectStepper/resourceAllocationStepperTwo";
import CreateUser from "../components/AdminConsole/usersPage/CreateUser";
import UserDetailsPage from "../components/AdminConsole/usersPage/userDetailsPage";
import User from "../components/AdminConsole/usersPage/userPage";
import LeavePage from "../components/applyLeaves/LeavePage";
import ConditionalSidebar from "../components/bottomNavigation/conditionalSidebar";
import Dashboard from "../pages/dashboard/dashboard";
import ErrorPage from "../pages/error/errorPage";
import History from "../pages/records/records";
import Timesheet from "../pages/timesheet/timesheet";
import CostAllocationStepperFinal from "../components/AdminConsole/projectsPage/createProjectStepper/costAllocationStepperFinal";

const Router = () => {
  const isAuthenticated = useSelector(
    (state) => state.persistData.data.jwtAccessToken
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Sidebar /> // Render the home page when authenticated
          ) : (
            <Login /> // Render the login page when not authenticated
          )
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/create-new-password" element={<CreateNewPassword />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <Dashboard />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/timesheet"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <Timesheet />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/history"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <History />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/leaves"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>{<LeavePage />}</ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/users"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <User />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/userForm"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <CreateUser />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/userDetailPage/:id"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <UserDetailsPage />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/projects"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <ProjectPage />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/projectForm"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <CreateProjectStepperOne />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route
        path="/resourceallocation"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <ResourceAllocationStepperTwo />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />

<Route
        path="/costallocation"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <CostAllocationStepperFinal />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />

      <Route
        path="/masterData"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <MasterDataPage />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
