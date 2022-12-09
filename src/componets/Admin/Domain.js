import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";

function Domain() {
  const [domains, setDomains] = useState([]);

  const handleDelete = (id) => {
    console.log(id);
    db.collection("Domains").doc(id).delete();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Domain name", width: 130 },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <DeleteIcon color="error" onClick={() => handleDelete(params.row.ID)} />
      ),
    },
    // { field: 'lastName', headerName: 'Last name', width: 130 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
  ];

  useEffect(() => {
    db.collection("Domains").onSnapshot((snapshot) => {
      let i = 0;
      setDomains(
        snapshot.docs.map((doc) => ({
          id: i++,
          name: doc.data().name,
          ID: doc.id,
        }))
      );
    });
  }, []);

  return (
    <div style={{ height: 400, width: "100%", padding: "20px 10px 0" }}>
      <DataGrid
        rows={domains}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default Domain;
