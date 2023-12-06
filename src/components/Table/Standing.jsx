import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import Table from "./index";

const StandingTable = ({ teams }) => {
  const columns = [
    {
      label: "Position",
      fixed: true,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.id + 1}
        </Typography>
      ),
    },
    {
      label: "Team",
      fixed: true,
      getValue: (row) => (
        <Typography
          variant="small"
          className="font-normal flex items-center sm:pl-8 space-x-3"
        >
          <img src={row.logo} alt="" className="h-8 w-8 mr-2 rounded-full" />
          <Link to={`team/${row.id}`}>{row.name}</Link>
        </Typography>
      ),
    },
    {
      label: "Wins",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.win}
        </Typography>
      ),
    },
    {
      label: "Losses",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.lose}
        </Typography>
      ),
    },
    {
      label: "Points Scored",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.pointScored}
        </Typography>
      ),
    },
    {
      label: "Points Against",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.pointAgainst}
        </Typography>
      ),
    },
    {
      label: "Differential",
      getValue: (row) => (
        <Typography as="a" href="#" variant="small" className="font-normal">
          {row.diff}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Table
        data={teams.sort((a, b) => b.win - a.win)}
        columns={columns}
        presentCheckBox={false}
        presentOptions={false}
      />
    </>
  );
};

export default StandingTable;
