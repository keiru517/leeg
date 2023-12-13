import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function DataTable() {
  let { leagueId } = useParams();

  const darkMode = useSelector((state) => state.home.dark_mode);
  const teams = useSelector((state) => state.home.teams).filter(
    (team) => team.leagueId == leagueId && team.isDeleted !== 1
  );

  const columns = [
    {
      field: "#",
      headerName: "#",
      width: 70,
      cellClassName: darkMode ? "text-white" : "text-black",
      headerClassName: darkMode ? "text-white" : "text-black",
      // valueGetter: (params) => params.row.name,
    },
    {
      field: "team",
      headerName: "Team",
      width: 130,
      cellClassName: darkMode ? "text-white" : "text-black",
      headerClassName: darkMode ? "text-white" : "text-black",
      valueGetter: (params) => params.row.name,
    },
    {
      field: "wins",
      headerName: "Wins",
      width: 90,
      cellClassName: darkMode ? "text-white" : "text-black",
      headerClassName: darkMode ? "text-white" : "text-black",
      valueGetter: (params) => `${params.row.win}`,
    },
    {
      field: "losses",
      headerName: "Losses",
      width: 90,
      cellClassName: darkMode ? "text-white" : "text-black",
      headerClassName: darkMode ? "text-white" : "text-black",
      valueGetter: (params) => `${params.row.lose}`,
    },
    {
      field: "ps",
      headerName: "Points Scored",
      // description: "This column has a value getter and is not sortable.",
      cellClassName: darkMode ? "text-white" : "text-black",
      headerClassName: darkMode ? "text-white" : "text-black",
      // sortable: false,
      width: 160,
      valueGetter: (params) => params.row.pointScored,
    },
    {
      field: "pa",
      headerName: "Points Against",
      // description: "This column has a value getter and is not sortable.",
      cellClassName: darkMode ? "text-white" : "text-black",
      headerClassName: darkMode ? "text-white" : "text-black",
      // sortable: false,
      width: 160,
      valueGetter: (params) => params.row.pointAgainst,
    },
    {
      field: "diff",
      headerName: "Differential",
      // description: "This column has a value getter and is not sortable.",
      cellClassName: darkMode ? "text-white" : "text-black",
      headerClassName: darkMode ? "text-white" : "text-black",
      // sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.diff}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={teams}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{
          boxShadow: 2,
          border: 2,
        }}
        // getRowClassName={(params) =>
        //   params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        // }
      />
    </div>
  );
}
