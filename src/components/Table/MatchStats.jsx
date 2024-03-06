import { Typography } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import Table from "./index";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useParams } from "react-router";
import * as actions from "../../actions";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.svg";

const MatchStats = ({ players, league, matchId, teamId, playerKeyword, status }) => {
  let { leagueId } = useParams();
  const dispatch = useDispatch();

  const displaySubstitutes = league?.displaySubstitutes;
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

  const teams = useSelector((state) => state.home.teams);
  const logs = useSelector(state => state.home.logs).filter(log => log.matchId == matchId)

  // Same as handleAction
  const handlePlusAction = (teamId, playerId, event, isDirect, isSubstitute) => {
    if (status === "Completed") {
      alert("The matchup is completed!")
    } else {
      actions.createOneLog(dispatch, {
        leagueId,
        matchId,
        period: 1,
        teamId,
        playerId,
        event,
        time: "00:00",
        isDirect,
        isSubstitute,
      });
    }
  };

  const handleMinusAction = (teamId, playerId, event, isDirect, isSubstitute) => {
    if (status === "Completed") {
      alert("The matchup is completed!")
    } else {
      actions.minusLog(dispatch, { leagueId, matchId, teamId, playerId, event, isDirect })
    }
  };

  const playerColumns = [
    displayJerseyNumber && {
      label: "#",
      accessor: "jerseyNumber",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.jerseyNumber}
        </Typography>
      ),
    },
    {
      label: "Player",
      accessor: "firstName",
      fixed: true,
      getValue: (row) => (
        <div className="flex items-center">
          {
            row.isSubstitute == false ?
              <>
                <Link to={`/league/${leagueId}/player/${row.id}`}>
                  <img
                    src={row.avatar}
                    alt=""
                    className="h-8 w-8 mr-4 rounded-full border border-gray-500"
                  />
                </Link>
                <Link
                  to={`/league/${leagueId}/player/${row.userId}`}
                  className="hover:underline"
                >
                  {row.firstName} {row.lastName}
                </Link>
              </>
              :
              <>
                <img
                  src={DefaultSubstituteAvatar}
                  alt=""
                  className="h-8 w-8 mr-4 rounded-full border border-gray-500"
                />
                {row.firstName} {row.lastName}
              </>
          }
        </div>
      ),
    },
    displayPosition && {
      label: "Position",
      accessor: "position",
      condition: displayPosition,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.position}
        </Typography>
      ),
    },
    {
      label: "PTS",
      accessor: "totalPoints",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints}
        </Typography>
      ),
    },
    {
      label: "3PM",
      accessor: "totalPoints3",
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "+3 Pointer", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.totalPoints3}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "+3 Pointer", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3PA",
      accessor: "attempts3",
      condition: displayAttempts3,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "+3 Attempt", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.attempts3}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "+3 Attempt", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3P%",
      accessor: "3p%",
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
      accessor: "totalPoints2",
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "+2 Pointer", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.totalPoints2}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "+2 Pointer", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAttempts2 && {
      label: "FGA",
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "+2 Attempt", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.attempts2}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "+2 Attempt", 0, 0)}
          >

            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAttempts2 && {
      label: "FG%",
      accessor: "fg%",
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
      accessor: "totalPoints1",
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "+1 Pointer", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.totalPoints1}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "+1 Pointer", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAttempts1 && {
      label: "FTA",
      accessor: "attempts1",
      condition: displayAttempts1,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "+1 Attempt", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.attempts1}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "+1 Attempt", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
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
      accessor: "blocks",
      condition: displayBlocks,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "Block", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.blocks}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "Block", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayRebounds && {
      label: "REB",
      accessor: "rebounds",
      condition: displayRebounds,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "Rebound", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.rebounds}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "Rebound", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAssists && {
      label: "AST",
      accessor: "assists",
      condition: displayAssists,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "Assist", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.assists}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "Assist", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayFouls && {
      label: "PF",
      accessor: "fouls",
      condition: displayFouls,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "Foul", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.fouls}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "Foul", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displaySteals && {
      label: "STL",
      condition: displaySteals,
      accessor: "steals",
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "Steal", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.steals}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "Steal", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayTurnovers && {
      label: "TOV",
      accessor: "turnovers",
      condition: displayTurnovers,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, row.id, "Turnover", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.turnovers}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, row.id, "Turnover", 0, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    // {
    //   label: "GP",
    //   accessor: "gp",
    //   getValue: (row) => (
    //     <Typography variant="small" className="font-normal">
    //       {row.gp}
    //     </Typography>
    //   ),
    // },
    // {
    //   label: "PPG",
    //   accessor: "ppg",
    //   getValue: (row) => (
    //     <Typography variant="small" className="font-normal">
    //       {row.ppg}
    //     </Typography>
    //   ),
    // },
  ].filter(Boolean);

  const playerData = useMemo(() => {
    let mappedData = players
      .sort((a, b) => b.points - a.points)
      .map((player) => {
        let totalPoints = 0
        let totalPoints3 = 0
        let attempts3 = 0;
        let totalPoints2 = 0
        let attempts2 = 0;
        let totalPoints1 = 0
        let attempts1 = 0;
        let blocks = 0;
        let rebounds = 0;
        let assists = 0;
        let fouls = 0;
        let steals = 0;
        let turnovers = 0;

        for (const log of logs) {
          if (log.playerId == player.id) {
            switch (log.event) {
              case '+3 Pointer':
                totalPoints += 3;
                totalPoints3 += 1
                attempts3 += 1
                break;
              case '+2 Pointer':
                totalPoints += 2;
                totalPoints2 += 1
                attempts2 += 1
                break;
              case '+1 Pointer':
                totalPoints += 1;
                totalPoints1 += 1
                attempts1 += 1
                break;
              case '+3 Attempt':
                attempts3 += 1
                break;
              case '+2 Attempt':
                attempts2 += 1
                break;
              case '+1 Attempt':
                attempts1 += 1
                break;
              case 'Rebound':
                rebounds += 1
                break;
              case 'Turnover':
                turnovers += 1
                break;
              case 'Foul':
                fouls += 1
                break;
              case 'Block':
                blocks += 1
                break;
              case 'Assist':
                assists += 1
                break;
            }
          }
        }

        return {
          totalPoints: totalPoints,
          totalPoints1: totalPoints1,
          totalPoints2: totalPoints2,
          totalPoints3: totalPoints3,
          attempts1: attempts1,
          attempts2: attempts2,
          attempts3: attempts3,
          "3p%": isNaN(
            (totalPoints3 /
              attempts3) *
            100
          )
            ? 0
            : (
              (totalPoints3 /
                attempts3) *
              100
            ).toFixed(2),
          "fg%": isNaN(
            (totalPoints2 /
              attempts2) *
            100
          )
            ? 0
            : (
              (totalPoints2 /
                attempts2) *
              100
            ).toFixed(2),
          "ft%": isNaN(
            (totalPoints1 /
              attempts1) *
            100
          )
            ? 0
            : (
              (totalPoints1 /
                attempts1) *
              100
            ).toFixed(2),
          blocks: blocks,
          rebounds: rebounds,
          assists: assists,
          fouls: fouls,
          steals: steals,
          turnovers: turnovers,
          id: player.id,
          userId: player.userId,
          firstName: player.firstName,
          lastName: player.lastName,
          jerseyNumber: player.jerseyNumber,
          position: player.position,
          avatar: player.avatar ? player.avatar : DefaultSubstituteAvatar,
          isSubstitute: player.isSubstitute,
          team: teams.find((team) => team.id == player.teamId),
          teamName: teams.find((team) => team.id == player.teamId)?.name,
          teamId: player.teamId,
          gp: 0,
          ppg: 0,
        };
      });

    return mappedData.filter((data) => (
      data.firstName + data.lastName
    ).toLowerCase().includes(playerKeyword.toLowerCase()));
  }, [players, displaySubstitutes, logs]);

  const teamData = useMemo(() => {
    let totalPoints = 0
    let totalPoints3 = 0
    let attempts3 = 0;
    let totalPoints2 = 0
    let attempts2 = 0;
    let totalPoints1 = 0
    let attempts1 = 0;
    let blocks = 0;
    let rebounds = 0;
    let assists = 0;
    let fouls = 0;
    let steals = 0;
    let turnovers = 0;
    for (const log of logs) {
      if (log.matchId == matchId && log.teamId == teamId && log.playerId == null) {
        switch (log.event) {
          case '+3 Pointer':
            totalPoints += 3;
            totalPoints3 += 1
            attempts3 += 1
            break;
          case '+2 Pointer':
            totalPoints += 2;
            totalPoints2 += 1
            attempts2 += 1
            break;
          case '+1 Pointer':
            totalPoints += 1;
            totalPoints1 += 1
            attempts1 += 1
            break;
          case '+3 Attempt':
            attempts3 += 1
            break;
          case '+2 Attempt':
            attempts2 += 1
            break;
          case '+1 Attempt':
            attempts1 += 1
            break;
          case 'Rebound':
            rebounds += 1
            break;
          case 'Turnover':
            turnovers += 1
            break;
          case 'Foul':
            fouls += 1
            break;
          case 'Block':
            blocks += 1
            break;
          case 'Assist':
            assists += 1
            break;
          case 'Steal':
            steals += 1
            break;
        }
      }
    }
    return {
      totalPoints: totalPoints,
      totalPoints1: totalPoints1,
      totalPoints2: totalPoints2,
      totalPoints3: totalPoints3,
      attempts1: attempts1,
      attempts2: attempts2,
      attempts3: attempts3,
      "3p%": isNaN(
        (totalPoints3 /
          attempts3) *
        100
      )
        ? 0
        : (
          (totalPoints3 /
            attempts3) *
          100
        ).toFixed(2),
      "fg%": isNaN(
        (totalPoints2 /
          attempts2) *
        100
      )
        ? 0
        : (
          (totalPoints2 /
            attempts2) *
          100
        ).toFixed(2),
      "ft%": isNaN(
        (totalPoints1 /
          attempts1) *
        100
      )
        ? 0
        : (
          (totalPoints1 /
            attempts1) *
          100
        ).toFixed(2),
      blocks: blocks,
      rebounds: rebounds,
      assists: assists,
      fouls: fouls,
      steals: steals,
      turnovers: turnovers,
    };
  }, [matchId, teamId, logs]);

  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == teamId
  );
  const matchups = useSelector((state) => state.home.matchups).filter(
    (matchup) => matchup.teamId == team?.id
  );


  const totalColumns = [
    {
      label: "#",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {/* {row.id} */}
        </Typography>
      ),
    },
    {
      label: "Player",
      fixed: true,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {/* <div className="flex items-center">
            <Link to={`/league/${leagueId}/team/${row.id}`}>
              <img
                src={row.logo}
                alt=""
                className="w-8 h-8 mr-2 rounded-full border border-gray-500"
              />
            </Link>
            <Link to={`/league/${leagueId}/team/${row.id}`} className="hover:underline">
              {row.name}
            </Link>
          </div> */}
        </Typography>
      ),
    },
    {
      label: "Position",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">

        </Typography>
      ),
    },
    {
      label: "PTS",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints}
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

  const totalRow = {
    id: team?.id,
    name: team?.name,
    logo: team?.logo,
    position: "",
    win: team?.win,
    lose: team?.lose,
    pointScored: team?.pointScored,
    pointAgainst: team?.pointAgainst,
    diff: team?.diff,
    totalPoints: playerData.reduce((sum, item) => sum + item.totalPoints, 0) + teamData.totalPoints,
    // totalPoints: matchups.reduce((sum, item) => sum + item.points, 0),
    totalPoints1: playerData.reduce((sum, item) => sum + item.totalPoints1, 0) + teamData.totalPoints1,
    totalPoints2: playerData.reduce((sum, item) => sum + item.totalPoints2, 0) + teamData.totalPoints2,
    totalPoints3: playerData.reduce((sum, item) => sum + item.totalPoints3, 0) + teamData.totalPoints3,
    attempts1: playerData.reduce((sum, item) => sum + item.attempts1, 0) + teamData.attempts1,
    attempts2: playerData.reduce((sum, item) => sum + item.attempts2, 0) + teamData.attempts2,
    attempts3: playerData.reduce((sum, item) => sum + item.attempts3, 0) + teamData.attempts3,
    blocks: playerData.reduce((sum, item) => sum + item.blocks, 0) + teamData.blocks,
    rebounds: playerData.reduce((sum, item) => sum + item.rebounds, 0) + teamData.rebounds,
    assists: playerData.reduce((sum, item) => sum + item.assists, 0) + teamData.assists,
    fouls: playerData.reduce((sum, item) => sum + item.fouls, 0) + teamData.fouls,
    steals: playerData.reduce((sum, item) => sum + item.steals, 0) + teamData.steals,
    turnovers: playerData.reduce((sum, item) => sum + item.turnovers, 0) + teamData.turnovers,
    ppg: team?.win + team?.lose === 0 ? 0 : (team?.pointScored / (team?.win + team?.lose)).toFixed(2)
  }

  const teamColumns = [
    {
      label: "#",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.id}
        </Typography>
      ),
    },
    {
      label: "Player",
      fixed: true,
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          <div className="flex items-center">
            <Link to={`/league/${leagueId}/team/${row.id}`}>
              <img
                src={row.logo}
                alt=""
                className="w-8 h-8 mr-2 rounded-full border border-gray-500"
              />
            </Link>
            <Link to={`/league/${leagueId}/team/${row.id}`} className="hover:underline">
              {row.name}
            </Link>
          </div>
        </Typography>
      ),
    },
    {
      label: "Position",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">

        </Typography>
      ),
    },
    {
      label: "PTS",
      getValue: (row) => (
        <Typography variant="small" className="font-normal">
          {row.totalPoints}
        </Typography>
      ),
    },
    {
      label: "3PM",
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "+3 Pointer", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.totalPoints3}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "+3 Pointer", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAttempts3 && {
      label: "3PA",
      condition: displayAttempts3,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "+3 Attempt", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.attempts3}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "+3 Attempt", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
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
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "+2 Pointer", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.totalPoints2}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "+2 Pointer", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAttempts2 && {
      label: "FGA",
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "+2 Attempt", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.attempts2}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "+2 Attempt", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
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
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "+1 Pointer", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.totalPoints1}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "+1 Pointer", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAttempts1 && {
      label: "FTA",
      condition: displayAttempts1,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "+1 Attempt", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.attempts1}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "+1 Attempt", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
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
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "Block", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.blocks}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "Block", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayRebounds && {
      label: "REB",
      condition: displayRebounds,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "Rebound", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.rebounds}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "Rebound", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayAssists && {
      label: "AST",
      condition: displayAssists,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "Assist", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.assists}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "Assist", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayFouls && {
      label: "PF",
      condition: displayFouls,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "Foul", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.fouls}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "Foul", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displaySteals && {
      label: "STL",
      condition: displaySteals,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "Steal", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.steals}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "Steal", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
    displayTurnovers && {
      label: "TOV",
      condition: displayTurnovers,
      getValue: (row) => (
        <Typography variant="small" className="flex font-normal items-center">
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 mr-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handlePlusAction(teamId, null, "Turnover", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
          </svg>
          {row.turnovers}
          <svg class="w-3.5 h-3.5 text-black dark:text-white border border-gray-300 ml-3 hover:cursor-pointer hover:opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            onClick={() => handleMinusAction(teamId, null, "Turnover", 1, 0)}
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
          </svg>
        </Typography>
      ),
    },
  ].filter(Boolean);

  const teamRow = {
    id: team?.id,
    name: team?.name,
    logo: team?.logo,
    position: "",
    win: team?.win,
    lose: team?.lose,
    pointScored: team?.pointScored,
    pointAgainst: team?.pointAgainst,
    diff: team?.diff,
    totalPoints: teamData.totalPoints,
    totalPoints1: teamData.totalPoints1,
    totalPoints2: teamData.totalPoints2,
    totalPoints3: teamData.totalPoints3,
    attempts1: teamData.attempts1,
    attempts2: teamData.attempts2,
    attempts3: teamData.attempts3,
    blocks: teamData.blocks,
    rebounds: teamData.rebounds,
    assists: teamData.assists,
    fouls: teamData.fouls,
    steals: teamData.steals,
    turnovers: teamData.turnovers,
    ppg: team?.win + team?.lose === 0 ? 0 : (team?.pointScored / (team?.win + team?.lose)).toFixed(2)
  }

  return (
    <div className="text-black dark:text-white mt-5 w-full overflow-auto">
      <table>
        <thead>
          <tr className="text-center">
            {
              playerColumns.map((head, idx) => (
                <th
                  className="font-normal bg-white dark:bg-slate"
                  key={head.label}
                  style={
                    head.fixed ? {
                      position: "sticky",
                      left: 0,
                      zIndex: 1,
                      borderRight: "1px solid gray"
                    } : {}
                  }
                >
                  {head.label}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            {
              totalColumns.map((column, idx) => (
                <td
                  className="bg-white dark:bg-slate"
                  style={
                    column.fixed ? {
                      position: "sticky",
                      left: 0,
                      zIndex: 1,
                      borderRight: "1px solid gray"
                    } : {}
                  }
                >
                  {
                    column.getValue(totalRow)
                  }
                </td>
              ))
            }
          </tr>
          <tr>
            {
              teamColumns.map((column, idx) => (
                <td
                  className="bg-white dark:bg-slate"
                  style={
                    column.fixed ? {
                      position: "sticky",
                      left: 0,
                      zIndex: 1,
                      borderRight: "1px solid gray"
                    } : {}
                  }
                >
                  {
                    column.getValue(teamRow)
                  }
                </td>
              ))
            }
          </tr>
          {
            playerData.map((player, index) => (
              <tr
                key={index}
              >
                {
                  playerColumns.map((column, idx) => (
                    <td
                      className="bg-white dark:bg-slate"
                      style={
                        column.fixed ? {
                          position: "sticky",
                          left: 0,
                          zIndex: 1,
                          borderRight: "1px solid gray"
                        } : {}
                      }
                    >
                      {
                        column.getValue(player)
                      }
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* <Table data={data} columns={columns} /> */}
    </div>
  );
};

export default MatchStats;
