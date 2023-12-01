import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const { leagueId, userId } = props;

  const teams = useSelector((state) => state.home.teams);
  const player = useSelector((state) => state.home.players).find(
    (player) =>
      player.userId == userId &&
      player.leagueId == leagueId &&
      player?.teamId !== 0
  );

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );
  const matches = useSelector((state) => state.home.matches).filter(
    (match) => match.leagueId == leagueId
  );
  const displayPosition = league?.displayPosition;
  const displayAttempts3 = league?.displayAttempts3;
  const displayAttempts2 = league?.displayAttempts2;
  const displayAttempts1 = league?.displayAttempts1;
  const displayBlocks = league?.displayBlocks;
  const displayRebounds = league?.displayRebounds;
  const displayAssists = league?.displayAssists;
  const displayFouls = league?.displayFouls;
  const displaySteals = league?.displaySteals;
  const displayTurnovers = league?.displayTurnovers;

  const matchups = useSelector((state) => state.home.matchups)
    .filter((matchup) => {
      const match = matches.find((m) => m.id == matchup.matchId);
      console.log(match);
      return (
        matchup.userId == userId &&
        matchup.leagueId == leagueId &&
        match &&
        !match.isNew
      );
    })
    .map((matchup) => {
      const match = matches.find((m) => m.id == matchup.matchId);
      return { ...matchup, match };
    });
  console.log("matchups", matchups);
  // const matchups = useSelector((state) => state.home.matchups).filter(
  //   (matchup) => matchup.userId == userId && matchup.leagueId == leagueId
  // );

  return (
    <div className="text-black dark:text-white mt-5 w-full">
      <table className="table-auto text-left w-full">
        <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
          <tr>
            <th
              key={0}
              className="h-button text-center font-font-dark-gray font-normal  text-sm"
            >
              Game Date
            </th>
            <th
              key={1}
              className="h-button text-center font-font-dark-gray font-normal  text-sm"
            >
              Matchup
            </th>
            <th
              key={2}
              className="h-button text-center font-font-dark-gray font-normal text-sm w-[40px]"
            >
              Points
            </th>
            <th
              key={3}
              className="h-button text-center font-font-dark-gray font-normal  text-sm"
            >
              3 Points
            </th>
            <th
              key={4}
              className="h-button text-center font-font-dark-gray font-normal  text-sm"
            >
              2 Points
            </th>
            <th
              key={5}
              className="h-button text-center font-font-dark-gray font-normal  text-sm"
            >
              Free throws
            </th>
            {displayAttempts3 ? (
              <th
                key={6}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                3 Attempts
              </th>
            ) : (
              ""
            )}
            {displayAttempts2 ? (
              <th
                key={7}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                2 Attempts
              </th>
            ) : (
              ""
            )}
            {displayAttempts1 ? (
              <th
                key={8}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                1 Attempts
              </th>
            ) : (
              ""
            )}
            {displayBlocks ? (
              <th
                key={9}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                Blocks
              </th>
            ) : (
              ""
            )}
            {displayRebounds ? (
              <th
                key={10}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                Rebounds
              </th>
            ) : (
              ""
            )}
            {displayAssists ? (
              <th
                key={11}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                Assists
              </th>
            ) : (
              ""
            )}
            {displayFouls ? (
              <th
                key={12}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                Fouls
              </th>
            ) : (
              ""
            )}
            {displaySteals ? (
              <th
                key={13}
                className="h-button text-center font-font-dark-gray font-normal  text-sm"
              >
                Steals
              </th>
            ) : (
              ""
            )}
            {displayTurnovers ? (
              <th
                key={14}
                className="h-button text-center font-font-dark-gray font-normal text-sm"
              >
                Turnovers
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {matchups.map((matchup, index) => {
            return (
              <tr
                key={index}
                className="odd:bg-light-dark-gray dark:odd:bg-charcoal even:bg-light-charcoal dark:even:bg-dark-gray"
              >
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matchup.match?.date}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex items-center space-x-2 justify-center"
                  >
                    <img
                      src={
                        teams.find(
                          (team) => team.id == matchup.match?.homeTeamId
                        )?.logo
                      }
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <p
                      className={`underline ${
                        matchup.match.homeTeamPoints >
                        matchup.match.awayTeamPoints
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      <Link
                        to={`/league/${leagueId}/team/${matchup.match?.homeTeamId}`}
                      >
                        {
                          teams.find(
                            (team) => team.id == matchup.match?.homeTeamId
                          )?.name
                        }
                      </Link>
                    </p>
                    <p className="text-font-dark-gray">VS</p>
                    <img
                      src={
                        teams.find(
                          (team) => team.id == matchup.match?.awayTeamId
                        )?.logo
                      }
                      alt=""
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <p
                      className={`underline ${
                        matchup.match.awayTeamPoints >
                        matchup.match.homeTeamPoints
                          ? "font-bold"
                          : ""
                      }`}
                    >
                      <Link
                        to={`/league/${leagueId}/team/${matchup.match?.awayTeamId}`}
                      >
                        {
                          teams.find(
                            (team) => team.id == matchup.match?.awayTeamId
                          )?.name
                        }
                      </Link>
                    </p>
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matchup.points}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matchup.points3}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matchup.points2}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matchup.points1}
                  </Typography>
                </td>
                {displayAttempts3 ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.attempts3}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
                {displayAttempts2 ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.attempts2}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
                {displayAttempts1 ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.attempts1}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
                {displayBlocks ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.blocks}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
                {displayRebounds ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.rebounds}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
                {displayAssists ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.assists}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
                {displayFouls ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.fouls}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
                {displaySteals ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.steals}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
                {displayTurnovers ? (
                  <td className="">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {matchup.turnovers}
                    </Typography>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head, idx) => (
              <th
                key={idx}
                className="h-button text-center font-font-dark-gray"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {matchups.map((matchup, idx) => {
            const match = matches.find((match) => match.id == matchup.matchId);
            return (
              <tr
                key={idx}
                className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal h-[53px]"
              >
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {match?.date}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex items-center space-x-2 justify-center"
                  >
                    <img
                      src={
                        teams.find((team) => team.id == match?.homeTeamId)?.logo
                      }
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="underline">
                      <Link
                        to={`/league/${leagueId}/team/${match?.homeTeamId}`}
                      >
                        {
                          teams.find((team) => team.id == match?.homeTeamId)
                            ?.name
                        }
                      </Link>
                    </p>
                    <p className="text-font-dark-gray">VS</p>
                    <img
                      src={
                        teams.find((team) => team.id == match?.awayTeamId)?.logo
                      }
                      alt=""
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <p className="underline">
                      <Link
                        to={`/league/${leagueId}/team/${match?.awayTeamId}`}
                      >
                        {
                          teams.find((team) => team.id == match?.awayTeamId)
                            ?.name
                        }
                      </Link>
                    </p>
                  </Typography>
                </td>
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matchup.points}
                  </Typography>
                </td>
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {matchup.points3}
                  </Typography>
                </td>
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {match?.homeTeamPoints} : {match?.awayTeamPoints}
                  </Typography>
                </td>
              </tr>
            );
          })}
          {matches.map((match, idx) => {
            const points = matchups.find(
              (matchup) => matchup.playerId == player?.id && matchup.matchId == match.id
            )?.points;
            return (
              <tr
                key={idx}
                className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal h-[53px]"
              >
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {match?.date}
                  </Typography>
                </td>
                <td className="">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal flex items-center space-x-2 justify-center"
                  >
                    <img
                      src={
                        teams.find((team) => team.id == match?.homeTeamId)?.logo
                      }
                      alt=""
                      className="w-8 h-8 rounded-default"
                    />
                    <p className="underline">
                      <Link
                        to={`/league/${leagueId}/team/${match?.homeTeamId}`}
                      >
                        {
                          teams.find((team) => team.id == match?.homeTeamId)
                            ?.name
                        }
                      </Link>
                    </p>
                    <p className="text-font-dark-gray">VS</p>
                    <img
                      src={
                        teams.find((team) => team.id == match?.awayTeamId)?.logo
                      }
                      alt=""
                      className="w-8 h-8 mr-2 rounded-default"
                    />
                    <p className="underline">
                      <Link
                        to={`/league/${leagueId}/team/${match?.awayTeamId}`}
                      >
                        {
                          teams.find((team) => team.id == match?.awayTeamId)
                            ?.name
                        }
                      </Link>
                    </p>
                  </Typography>
                </td>
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {points?points:0}
                  </Typography>
                </td>
                <td className="w-1/5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {match?.homeTeamPoints} : {match?.awayTeamPoints}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};

export default Profile;
