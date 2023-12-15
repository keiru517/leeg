import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

import Table from "./index";

const StandingTable = ({ teams, keyword }) => {
  console.log(keyword)
  const columns = [
    {
      label: "#",
      fixed: true,
    },
    {
      label: "Team",
      accessor: 'name',
      fixed: true,
      getValue: (row) => (
        <Typography
          variant="small"
          className="font-normal flex items-center sm:pl-8 space-x-3"
        >
          <Link to={`team/${row.id}`}>
            <img src={row.logo} alt="" className="h-8 w-8 mr-2 rounded-full" />
          </Link>
          <Link to={`team/${row.id}`} className="hover:underline">
            {row.name}
          </Link>
        </Typography>
      ),
    },
    {
      label: "Wins",
      accessor: 'win',
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.win}
        </Typography>
      ),
    },
    {
      label: "Losses",
      accessor: 'lose',
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.lose}
        </Typography>
      ),
    },
    {
      label: "Points Scored",
      accessor: 'pointScored',
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.pointScored}
        </Typography>
      ),
    },
    {
      label: "Points Against",
      accessor: 'pointAgainst',
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.pointAgainst}
        </Typography>
      ),
    },
    {
      label: "Differential",
      accessor: 'diff',
      getValue: (row) => (
        <Typography as="a" href="#" variant="small" className="font-normal">
          {row.diff}
        </Typography>
      ),
    },
  ];

  console.log(teams.filter(team=>team.name.toLowerCase().includes(keyword.toLowerCase())))
  return (
    <>
      <Table
        data={teams.filter(team=>team.name.toLowerCase().includes(keyword.toLowerCase())).sort((a, b) => b.win - a.win)}
        columns={columns}
        presentCheckBox={false}
        presentOptions={false}
      />
    </>
  );
};

export default StandingTable;
