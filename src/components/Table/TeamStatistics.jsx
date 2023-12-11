import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "./index";

const TeamStatistics = (props) => {
  let { teamId } = useParams();
    const {matches} = props;
  const team = useSelector(state=>state.home.teams).find(team=>team.id == teamId);
  const matchups = useSelector(state=>state.home.matchups);

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
        label: 'Games Played',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.win + row.lose}
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

// const data = useMemo(
//     ()=>matchups.filter(matchup=>matchup.match)
// )
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
