import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { auth, db } from "./firebase";
import Favourites from "./pages/Favourites";
import FilteredJobs from "./pages/FilteredJobs";
import Home from "./pages/Home";
import Job from "./pages/Job";
import Login from "./pages/Login";
import MessageWindow from "./pages/MessageWindow";
import SignUp from "./pages/SignUp";
import { useStateValue } from "./StateProvider";
import Admin from "./pages/Admin";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminMessagesWindow from "./pages/admin/AdminMessageWindow";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDomain from "./pages/admin/AdminDomain";
import EditJob from "./pages/admin/EditJob";
import Notifications from "./pages/Notifications";
import AdminNotifications from "./pages/admin/AdminNotifications";
import SearchListOther from "./componets/SearchListOther";

function App() {
  const [{ currentUser, searchListOther }, dispatch] = useStateValue();

  useEffect(() => {
    const cleanup = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        dispatch({
          type: "AUTH_USER",
          payload: {
            email: authUser.email,
            verified: authUser.emailVerified,
          },
        });

        db.collection("Users")
          .where("email", "==", authUser?.email)
          .get()
          .then((querySnapshot) => {
            let user;

            querySnapshot.forEach((doc) => {
              user = {
                userID: doc.id,
                data: doc.data(),
              };
            });

            dispatch({
              type: "LOG_IN",
              payload: user,
            });
          });
      }
      return () => cleanup();
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <SearchListOther searchList={searchListOther} />
      {/* <Navbar/> */}
      <Routes>
        <Route path="/job/:id" element={<Job />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/messages/:mid" element={<MessageWindow />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/:domain" element={<FilteredJobs />} />
        <Route path="/notifications" element={<Notifications />} />
        {currentUser?.data?.isAdmin ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/admin" element={<Home />} />
        )}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/domains" element={<AdminDomain />} />
        <Route path="/admin/edit-job/:jid" element={<EditJob />} />
        <Route path="/admin/messages/:amid" element={<AdminMessagesWindow />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
