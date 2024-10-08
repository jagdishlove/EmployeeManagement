import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/login/login";
import Sidebar from "../components/sidebarMenu/sidebar";
import CreateNewPassword from "../pages/createNewPassword/createNewPassword";
import ForgotPassword from "../pages/forgotPassword/forgotPassword";

import { useSelector } from "react-redux";
import CreateProjectStepperOne from "../components/AdminConsole/projectsPage/createProjectStepper/createProjectStepperOne";
import ProjectPage from "../components/AdminConsole/projectsPage/projectPage";
import ResourceAllocationStepperTwo from "../components/AdminConsole/projectsPage/createProjectStepper/resourceAllocationStepperTwo";
import CreateUser from "../components/AdminConsole/usersPage/CreateUser";
import UserDetailsPage from "../components/AdminConsole/usersPage/userDetailsPage";
import User from "../components/AdminConsole/usersPage/userPage";
import Reports from "../pages/reports/reports";
import LeavePage from "../components/applyLeaves/LeavePage";
import ConditionalSidebar from "../components/bottomNavigation/conditionalSidebar";

import ErrorPage from "../pages/error/errorPage";
import History from "../pages/records/records";
import Timesheet from "../pages/timesheet/timesheet";
import CostAllocationStepperFinal from "../components/AdminConsole/projectsPage/createProjectStepper/costAllocationStepperFinal";
import MasterData from "../components/AdminConsole/masterDataPage/masterData";
import ProjectDetailPage from "../components/AdminConsole/projectsPage/projectDetails/projectDetailPage";
import AdminTimeSheet from "../components/AdminConsole/timesheetPage/adminTimeSheet";
import AdminLeaves from "../components/AdminConsole/AdminLeaves/adminLeaves";
import ProjectProgress from "../pages/projectProgress/projectProgress";
import WorkSpace from "../pages/workspace/workspace";
import MySpaceTab from "../components/admin/mySpaceTab";
import ReporteesTab from "../components/admin/reportees/reporteesTab";
import TimesheetTab from "../components/admin/approvalTimesheets/timesheetTab";
import ApprovalLeavesPage from "../components/admin/approvalLeaves/approvalLeavesPage";
import ApprovalTab from "../components/admin/approvalTab";
import MyProjectsTab from "../components/admin/myProjects/MyProjectsTab";

const Router = () => {
  const isAuthenticated = useSelector(
    (state) => state.persistData?.loginDetails?.data.jwtAccessToken
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <>
              <Sidebar />
              <Navigate to="/timesheet" replace />
            </> // Render the home page when authenticated
          ) : (
            <Login /> // Render the login page when not authenticated
          )
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/create-new-password" element={<CreateNewPassword />} />
      <Route
        path="/workspace/*"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <WorkSpace />
            </ConditionalSidebar>
          ) : (
            <>
              <Navigate to="/" />
              <Login />
            </>
          )
        }
      >
        <Route
          index
          element={
            isAuthenticated ? (
              <MySpaceTab />
            ) : (
              <>
                <Navigate to="/" />
                <Login />
              </>
            )
          }
        />
            <Route
          path="myProjects"
          element={
            isAuthenticated ? (
              <MyProjectsTab />
            ) : (
              <>
                <Navigate to="/" />
                <Login />
              </>
            )
          }
        />
        <Route
          path="reportees"
          element={
            isAuthenticated ? (
              <ReporteesTab />
            ) : (
              <>
                <Navigate to="/" />
                <Login />
              </>
            )
          }
        />
        <Route
          path="Approval/*"
          element={
            isAuthenticated ? (
              <ApprovalTab />
            ) : (
              <>
                <Navigate to="/" />
                <Login />
              </>
            )
          }
        >
          <Route
            index
            element={
              isAuthenticated ? (
                <TimesheetTab />
              ) : (
                <>
                  <Navigate to="/" />
                  <Login />
                </>
              )
            }
          />
          <Route
            path="leaves"
            element={
              isAuthenticated ? (
                <ApprovalLeavesPage />
              ) : (
                <>
                  <Navigate to="/" />
                  <Login />
                </>
              )
            }
          />
        </Route>
      </Route>
      <Route
        path="/projectProgress"
        exact
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <ProjectProgress />
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
        path="/reports"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              < Reports/>
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
        path="/editUser/:id"
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
        path="/EditForm/:id"
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
        path="/EditResourcesForm/:id"
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
        path="/EditCostForm/:id"
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
        path="/projectDetailPage/:id"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <ProjectDetailPage />
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
              <MasterData />
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
        path="/Admintimesheet"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <AdminTimeSheet />
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
        path="/adminLeaves"
        element={
          isAuthenticated ? (
            <ConditionalSidebar>
              <AdminLeaves />
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
