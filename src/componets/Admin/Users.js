import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function Users() {
  const [users, setUsers] = useState([]);

  const handleDelete = (id) => {
    console.log(id);
    db.collection("Users").doc(id).delete();
  };

  const handleAdmin = (id) => {
    // alert(id);
    db.collection("Users").doc(id).update({ isAdmin: true });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "firstName", headerName: "First name", width: 115 },
    { field: "lastName", headerName: "Last name", width: 115 },
    {
      field: "email",
      headerName: "Email",
      width: 120,
    },
    {
      field: "alerts",
      headerName: "Alert",
      width: 60,
    },
    {
      field: "domain",
      headerName: "Domain",
      width: 130,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <DeleteIcon
            color="error"
            onClick={() => handleDelete(params.row.ID)}
          />
          <AdminPanelSettingsIcon
            color="info"
            onClick={() => handleAdmin(params.row.ID)}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    db.collection("Users").onSnapshot((snapshot) => {
      let i = 0;
      setUsers(
        snapshot.docs.map((doc) => ({
          id: i++,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          alerts: doc.data().alerts,
          domain: doc.data().domain,
          isAdmin: doc.data()?.isAdmin,
          ID: doc.id,
        }))
      );
    });
  }, []);

  return (
    <div style={{ height: 400, width: "100%", padding: "20px 10px 0" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}

export default Users;
