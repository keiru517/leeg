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
      valueGetter: (params) => (
        <div>
          <Typography
            variant="small"
            className="font-normal flex items-center sm:pl-8 space-x-3"
          >
            <Link to={`team/${params.row.id}`}>
              <img
                src={params.row.logo}
                alt=""
                className="h-8 w-8 mr-2 rounded-full"
              />
            </Link>
            <Link to={`team/${params.row.id}`} className="hover:underline">
              {params.row.name}
            </Link>
          </Typography>
        </div>
      ),
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
        sx={{
          boxShadow: 2,
          border: 2,
        }}
      />
    </div>
  );
}
