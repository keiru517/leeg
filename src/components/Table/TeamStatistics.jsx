import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "./index";

const TeamStatistics = () => {
  let { teamId } = useParams();

  const team = useSelector(state=>state.home.teams).find(team=>team.id == teamId);
  

  const columns = [
    {
        label: 'Wins',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.win}
            </Typography>
        )
    },
    {
        label: 'Losses',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.lose}
            </Typography>
        )
    },
    {
        label: 'Points Scored',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.pointScored}
            </Typography>
        )
    },
    {
        label: 'Points Against',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.pointAgainst}
            </Typography>
        )
    },
    {
        label: 'Differential',
        getValue: (row) => (
            <Typography
                as="a"
                href="#"
                variant="small"
                className="font-normal"
            >
                {row.diff}
            </Typography>
        )
    }
];

  return (
    <>
        <Table
          data={[team]}
          columns={columns}
          presentCheckBox={false}
          presentOptions={false}
      />
    </>
  )
};

export default TeamStatistics;
