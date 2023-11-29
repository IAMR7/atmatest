import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import { useSelector } from "react-redux";

import ProfilePage from "./pages/Profile/ProfilePage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UserPage from "./pages/User/UserPage";
import BookPage from "./pages/Book/BookPage";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/error/404" element={<NotFoundPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {/* START ADMIN ROUTE */}
      <Routes>
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <NotFoundPage />}
        />
        <Route
          path="/users"
          element={
            user && user.role === "admin" ? <UserPage /> : <NotFoundPage />
          }
        />
        <Route path="/books" element={user ? <BookPage /> : <NotFoundPage />} />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <NotFoundPage />}
        />
      </Routes>
      {/* END ADMIN ROUTE */}
    </BrowserRouter>
  );
}

export default App;
