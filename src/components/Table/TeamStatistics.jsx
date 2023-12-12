import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "./index";

const TeamStatistics = (props) => {
  let { leagueId, teamId } = useParams();
  const { matches } = props;
  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );
  const matchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.teamId == team.id
  );

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  const displayPosition = league?.displayPosition;
  const displayJerseyNumber = league?.displayJerseyNumber;
  const displayAttempts3 = league?.displayAttempts3;
  const displayAttempts2 = league?.displayAttempts2;
  const displayAttempts1 = league?.displayAttempts1;
  const displayBlocks = league?.displayBlocks;
  const displayRebounds = league?.displayRebounds;
  const displayAssists = league?.displayAssists;
  const displayFouls = league?.displayFouls;
  const displaySteals = league?.displaySteals;
  const displayTurnovers = league?.displayTurnovers;

  const data = {
    win: team.win,
    lose: team.lose,
    pointScored: team.pointScored,
    pointAgainst: team.pointAgainst,
    diff: team.diff,
    totalPoints: matchups.reduce((sum, item) => sum + item.points, 0),
    totalPoints1: matchups.reduce((sum, matchup) => sum + matchup.points1, 0),
    totalPoints2: matchups.reduce((sum, matchup) => sum + matchup.points2, 0),
    totalPoints3: matchups.reduce((sum, matchup) => sum + matchup.points3, 0),
    attempts1: matchups.reduce((sum, matchup) => sum + matchup.attempts1, 0),
    attempts2: matchups.reduce((sum, matchup) => sum + matchup.attempts2, 0),
    attempts3: matchups.reduce((sum, matchup) => sum + matchup.attempts3, 0),
    blocks: matchups.reduce((sum, matchup) => sum + matchup.blocks, 0),
    rebounds: matchups.reduce((sum, matchup) => sum + matchup.rebounds, 0),
    assists: matchups.reduce((sum, matchup) => sum + matchup.assists, 0),
    fouls: matchups.reduce((sum, matchup) => sum + matchup.fouls, 0),
    steals: matchups.reduce((sum, matchup) => sum + matchup.steals, 0),
    turnovers: matchups.reduce((sum, matchup) => sum + matchup.turnovers, 0),
  };

  const columns = [
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
      label: "Games Played",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.win + row.lose}
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
    {
      label: "3PM",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints3}
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3PA",
      condition: displayAttempts3,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts3}
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3P%",
      condition: displayAttempts3,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {isNaN((row.totalPoints3 / row.attempts3) * 100)
            ? 0
            : ((row.totalPoints3 / row.attempts3) * 100).toFixed(2)}
        </Typography>
      ),
    },
    {
      label: "FGM",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints2}
        </Typography>
      ),
    },
    displayAttempts2 && {
      label: "FGA",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts2}
        </Typography>
      ),
    },
    displayAttempts2 && {
      label: "FG%",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {isNaN((row.totalPoints2 / row.attempts2) * 100)
            ? 0
            : ((row.totalPoints2 / row.attempts2) * 100).toFixed(2)}
        </Typography>
      ),
    },
    {
      label: "FTM",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints1}
        </Typography>
      ),
    },
    displayAttempts1 && {
      label: "FTA",
      condition: displayAttempts1,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.attempts1}
        </Typography>
      ),
    },
    displayAttempts1 && {
      label: "FT%",
      condition: displayAttempts1,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {isNaN((row.totalPoints1 / row.attempts1) * 100)
            ? 0
            : ((row.totalPoints1 / row.attempts1) * 100).toFixed(2)}
        </Typography>
      ),
    },
    displayBlocks && {
      label: "BLK",
      condition: displayBlocks,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.blocks}
        </Typography>
      ),
    },
    displayRebounds && {
      label: "REB",
      condition: displayRebounds,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.rebounds}
        </Typography>
      ),
    },
    displayAssists && {
      label: "AST",
      condition: displayAssists,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.assists}
        </Typography>
      ),
    },
    displayFouls && {
      label: "PF",
      condition: displayFouls,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.fouls}
        </Typography>
      ),
    },
    displaySteals && {
      label: "STL",
      condition: displaySteals,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.steals}
        </Typography>
      ),
    },
    displayTurnovers && {
      label: "TOV",
      condition: displayTurnovers,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.turnovers}
        </Typography>
      ),
    },
  ].filter(Boolean);

  // const data = useMemo(
  //     ()=>matchups.filter(matchup=>matchup.match)
  // )

  return (
    <>
      <Table
        data={[data]}
        columns={columns}
        presentCheckBox={false}
        presentOptions={false}
      />
    </>
  );
};

export default TeamStatistics;
