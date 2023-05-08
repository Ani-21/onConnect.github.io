import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import GuardContainer from "./components/GuardContainer";

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";

const WelcomePage = lazy(() => import("./pages/Welcome"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const FeedPage = lazy(() => import("./pages/Profile/Feed"));
const UserProfilePage = lazy(() => import("./pages/Profile/UserProfile"));
const SearchPage = lazy(() => import("./pages/Profile/Search"));
const FriendsPage = lazy(() => import("./pages/Profile/Friends"));

import { AppRoutes } from "./constants";
import { LinearProgress } from "@mui/material";

function App() {
  return (
    <Routes>
      {/* public */}
      <Route path={AppRoutes.welcomePageRoute} element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<LinearProgress />}>
              <WelcomePage />
            </Suspense>
          }
        />
      </Route>

      {/* protected */}
      <Route element={<AuthLayout />}>
        <Route element={<GuardContainer />}>
          <Route
            path={AppRoutes.profilePageRoute}
            element={
              <Suspense fallback={<LinearProgress />}>
                <ProfilePage />
              </Suspense>
            }
          >
            <Route index element={<FeedPage />} />
            <Route
              path={AppRoutes.userPageRoute}
              element={
                <Suspense fallback={<LinearProgress />}>
                  <UserProfilePage />
                </Suspense>
              }
            />
            <Route
              path={AppRoutes.friendsPageRoute}
              element={
                <Suspense fallback={<LinearProgress />}>
                  <FriendsPage />
                </Suspense>
              }
            />
            <Route
              path={AppRoutes.usersPageRoute}
              element={
                <Suspense fallback={<LinearProgress />}>
                  <SearchPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
