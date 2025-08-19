import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/common/Navbar";
import Footer from "./component/common/Footer";
import HomePage from "./component/home/HomePage";
import LoginPage from "./component/auth/LoginPage";
import RegisterPage from "./component/auth/RegisterPage";
import AllRoomsPage from "./component/booking_rooms/AllRoomsPage";
import RoomDetailsPage from "./component/booking_rooms/RoomDetailsPage";
import AdminPage from "./component/admin/AdminPage";
import AddRoomPage from "./component/admin/AddRoomPage";
import ManageRoomPage from "./component/admin/ManageRoomPage";
import FindBookingPage from "./component/booking_rooms/FindBookingPage";
import ProfilePage from "./component/profile/ProfilePage";
import EditProfilePage from "./component/profile/EditProfilePage";
import ManageBookingsPage from "./component/admin/ManageBookingsPage";
import EditBookingPage from "./component/admin/EditBookingPage";
import EditRoomPage from "./component/admin/EditRoomPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/rooms" element={<AllRoomsPage />} />
          <Route path="/room/:id" element={<RoomDetailsPage />} />
          <Route path="/find-booking" element={<FindBookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add-room" element={<AddRoomPage />} />
          <Route path="/admin/manage-rooms" element={<ManageRoomPage />} />
          <Route
            path="/admin/manage-bookings"
            element={<ManageBookingsPage />}
          />
          <Route path="/admin/edit-booking/:id" element={<EditBookingPage />} />
          <Route path="/admin/edit-room/:id" element={<EditRoomPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
