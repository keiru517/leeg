import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router";
import close from "../../assets/img/dark_mode/close.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import MatchStatsTable from "../Table/MatchStats";
import Select from "../../components/Select";

const MatchStatsModal = (props) => {
  let { leagueId } = useParams();
  const dispatch = useDispatch();
  const options = [
    { id: 0, name: "Incomplete" },
    { id: 1, name: "Completed" },
  ];

  useEffect(() => {
    actions.getMatchups(dispatch);
    actions.getLogs(dispatch);
  }, [])
  const open = useSelector((state) => state.home.match_stats_dialog.open);
  const matchId = useSelector((state) => state.home.match_stats_dialog.matchId);
  const homeTeamId = useSelector((state) => state.home.match_stats_dialog.homeTeamId);
  const awayTeamId = useSelector((state) => state.home.match_stats_dialog.awayTeamId);

  const league = useSelector(state => state.home.leagues).find(league => league.id == leagueId);

  const homeTeamPlayers = useSelector((state) => state.home.matchups)
    .filter((matchup) => matchup.matchId == matchId && matchup.teamId == homeTeamId)
    .map(
      ({
        player,
        points,
        points3,
        points2,
        points1,
        attempts3,
        attempts2,
        attempts1,
        blocks,
        rebounds,
        assists,
        fouls,
        steals,
        turnovers,
        attendance
      }) => {
        return {
          ...player,
          points,
          points3,
          points2,
          points1,
          attempts3,
          attempts2,
          attempts1,
          blocks,
          rebounds,
          assists,
          fouls,
          steals,
          turnovers,
          attendance
        };
      }
    );

  const awayTeamPlayers = useSelector((state) => state.home.matchups)
    .filter((matchup) => matchup.matchId == matchId && matchup.teamId == awayTeamId)
    .map(
      ({
        player,
        points,
        points3,
        points2,
        points1,
        attempts3,
        attempts2,
        attempts1,
        blocks,
        rebounds,
        assists,
        fouls,
        steals,
        turnovers,
        attendance
      }) => {
        return {
          ...player,
          points,
          points3,
          points2,
          points1,
          attempts3,
          attempts2,
          attempts1,
          blocks,
          rebounds,
          assists,
          fouls,
          steals,
          turnovers,
          attendance
        };
      }
    );

  const closeDialog = () => {
    dispatch({ type: actions.CLOSE_MATCH_STATS_DIALOG });
  };
  const cancelButtonRef = useRef(null);

  const match = useSelector((state) => state.home.matches).find(
    (match) => match.id == matchId
  );
  const [status, setStatus] = useState(
    ""
  );
  useEffect(() => {
    setStatus(match?.isNew ? "Incomplete" : "Completed")
  }, [match])
  const handleStatus = (e) => {
    setStatus(e.name);
    if (e.id === 1) {
      actions.completeMatchup(dispatch, { matchId });
    } else {
      actions.incompleteMatchup(dispatch, { matchId });
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        initialFocus={cancelButtonRef}
        onClose={closeDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-main text-left shadow-xl transition-all sm:my-8 bg-white dark:bg-slate h-[709px] w-[400px] sm:w-[500px] md:w-[1480px] mx-3 flex flex-col">
                <div className="divide-y divide-solid divide-[#3A3A3A] flex flex-col flex-grow">
                  <div className="flex items-center text-left h-16 sm:h-[88px] justify-between px-default">
                    <p className="text-black dark:text-white font-bold sm:text-xl md:text-2xl">
                      Match Statistics
                    </p>
                    <div className="flex items-center space-x-3">
                      <Select
                        className="w-[115px] sm:w-[140px] rounded-lg text-xs h-button"
                        options={options}
                        handleClick={handleStatus}
                        value={status}
                      >
                        {status}
                      </Select>
                      <img
                        src={close}
                        onClick={closeDialog}
                        className="cursor-pointer hover:opacity-70"
                      ></img>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-default justify-between overflow-y-auto h-96">
                    <div>
                      <MatchStatsTable players={homeTeamPlayers} league={league} matchId={matchId} teamId={homeTeamId} playerKeyword={""} status={status}></MatchStatsTable>
                      <MatchStatsTable players={awayTeamPlayers} league={league} matchId={matchId} teamId={awayTeamId} playerKeyword={""} status={status}></MatchStatsTable>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MatchStatsModal;
