import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";
import { Tab } from "@headlessui/react";
import Select from "../../components/Select";
import line from "../../assets/img/dark_mode/point-line.png";
import * as actions from "../../actions";
import ProfileTable from "../../components/Table/PlayerMatchHistory";
import PlayerStatistics from "../../components/Table/PlayerStatistics";
import DefaultTeamLogo from "../../assets/img/dark_mode/default-team-logo.png";
import backIconDark from "../../assets/img/dark_mode/back-icon-dark.png";
import backIconLight from "../../assets/img/dark_mode/back-icon-light.png";
import Input from "../../components/Input";
import search from "../../assets/img/dark_mode/search.png";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.svg";
import ImageCropperModal from "../../components/Modal/ImageCropperModal";
import PublicNav from "../../components/publicNav";

const PublicPlayer = () => {
  let { leagueId, playerId } = useParams();
  const isPublic = localStorage.getItem('token') ? false : true;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const fileUploadRef = useRef();
  const [chosenFile, setChosenFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const darkMode = useSelector((state) => state.home.dark_mode);

  const league = useSelector((state) => state.home.leagues).find(
    (league) => league.id == leagueId
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    actions.getUserInfo(dispatch, localStorage.getItem("userId"));
    actions.getUsers(dispatch);
    actions.getLeagues(dispatch);
    // actions.getPlayers(dispatch);
    actions.getTeams(dispatch);
    actions.getMatches(dispatch);
    actions.getMatchups(dispatch);
  }, []);

  const categories = ["Match History", "Statistics"];

  const user = useSelector((state) => state.home.user);
  const admins = useSelector((state) => state.home.admins);
  const isAdmin = admins.some((admin) => admin.userId == user?.id);
  const player = useSelector((state) => state.home.players).find(
    (player) => player.id == playerId
  );
  console.log(player)
  // const player = useSelector((state) => state.home.players).find(
  //   (player) => player.userId == userId && player.leagueId == leagueId
  // );

  const team = useSelector((state) => state.home.teams).find(
    (team) => team.id == player?.teamId
  );

  const matches = useSelector((state) => state.home.matches).filter(
    (match) =>
      match.leagueId == leagueId &&
      (match.homeTeamId == player?.teamId ||
        match.awayTeamId == player?.teamId) &&
      !match.isNew
  );


  const handleFileUpload = () => {
    // setPreviewURL("")
    actions.uploadPlayerAvatar(dispatch, playerId, chosenFile);
  }

  const cancelFileUpload = () => {
    setPreviewURL("")
  }
  return (
    <div className="flex flex-col flex-grow">
      {
        isPublic ?
          <>
            <PublicNav />
            <p className="flex font-dark-gray my-3">

              <Link to={`/public_league/${league?.id}?tab=0`} className="hover:underline">
                <span className="text-sky-500">{league?.name}</span>
              </Link>
              <span className="">&nbsp; &gt; &nbsp;</span>

              {team && (
                <>
                  <span className="">
                    <Link to={`/public_league/${leagueId}/team/${team?.id}`} className="hover:underline text-sky-500">
                      {team?.name}
                    </Link>
                  </span>
                  <span className="">&nbsp; &gt; &nbsp;</span>

                </>
              )}
              <span className="">
                {player?.firstName} {player?.lastName}
              </span>
            </p>
          </> :
          <>
            <p className="flex font-dark-gray my-3">
              <Link to="/" className="text-sky-500 hover:underline">
                <span className="">My Leagues</span>
              </Link>

              <span className="">&nbsp; &gt; &nbsp;</span>
              <Link to={`/league/${league?.id}?tab=0`} className="hover:underline">
                <span className="text-sky-500">{league?.name}</span>
              </Link>
              <span className="">&nbsp; &gt; &nbsp;</span>

              {team && (
                <>
                  <span className="">
                    <Link to={`/league/${leagueId}/team/${team?.id}`} className="hover:underline text-sky-500">
                      {team?.name}
                    </Link>
                  </span>
                  <span className="">&nbsp; &gt; &nbsp;</span>

                </>
              )}
              <span className="">
                {player?.firstName} {player?.lastName}
              </span>
            </p>
          </>
      }

      <div className="flex flex-col flex-grow rounded-main bg-white dark:bg-slate overflow-auto p-default">
        <div className="page-title bg-white dark:bg-charcoal flex items-center justify-between p-3">
          <div className="flex items-center">
            <div
              className="w-6 h-6 sm:w-[34px] sm:h-[34px] bg-gray-300 dark:bg-primary items-center flex justify-center rounded-default cursor-pointer hover:opacity-70"
              onClick={() => navigate(-1)}
            >
              <img
                src={darkMode ? backIconDark : backIconLight}
                alt="back"
                className="w-[4px] h-[10px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
              />
            </div>
            <img
              src={previewURL ? previewURL : (player?.avatar ? player?.avatar : DefaultSubstituteAvatar)}
              alt={`${player?.firstName[0] + " " + player?.lastName[0]}`}
              className="w-10 h-10 sm:w-20 sm:h-20 mx-6 rounded-full border border-gray-500"
              onClick={() => {
                if (!player?.userId && !isPublic) {
                  setModalOpen(true)
                }
              }}
            />
            {
              (previewURL) &&
              <>
                <div
                  className="bg-primary h-button rounded-default text-black dark:text-white font-bold text-sm mr-3 w-32 hover:opacity-70 cursor-pointer flex justify-center items-center"
                  onClick={handleFileUpload}
                >
                  Save
                </div>
                <div
                  className="bg-danger h-button rounded-default text-black dark:text-white font-bold text-sm mr-3 w-32 hover:opacity-70 cursor-pointer flex justify-center items-center"
                  onClick={cancelFileUpload}
                >
                  Cancel
                </div>

              </>
            }
            <div className="text-sm sm:text-3xl text-white text-left font-black">
              <div className="flex items-center">
                <p className="text-lg sm:text-[28px] text-black dark:text-white">
                  {player?.firstName} {player?.lastName}{" "}
                </p>
                {isAdmin && (
                  <span className="text-[10px] sm:text-xs sm:mt-2 font-normal text-gray-400 sm:inline hidden">
                    / {player?.email}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src={team?.logo ? team.logo : DefaultTeamLogo}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-black dark:text-white text-xs font-medium">
                  {team?.name} | # {player?.jerseyNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-2 sm:px-0 h-full flex flex-col flex-grow mt-3">
          <Tab.Group>
            <Tab.List className="flex justify-start space-x-5 rounded-xl bg-transparent p-1 ">
              {categories.map((category, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    classNames(
                      "py-2.5 text-sm font-medium leading-5 text-gray-500 dark:text-gray-300 px-3",
                      " focus:outline-none ",
                      selected
                        ? "divide-[bg-sky-500] text-black dark:text-white border-b-2 border-sky-500"
                        : " rounded-lg hover:bg-white/[0.12]"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="flex-grow flex items-center ">
              {/* Match History */}
              <Tab.Panel
                key={0}
                className={classNames("rounded-xl flex flex-col w-full h-full")}
              >
                <hr className="h-px my-4 bg-charcoal border-0" />
                <div className="search flex justify-between space-x-3">
                  <Input
                    icon={search}
                    className="flex-grow rounded-lg text-xs h-[42px]"
                    placeholder="Search Leagues"
                  />
                  {/* <Select
                    className="w-[144px] rounded-lg text-xs"
                    options={options}
                    handleClick={(e) => setValue(e)}
                    value={value}
                  >
                    {value}
                  </Select> */}
                </div>
                {matches.length > 0 ? (
                  <ProfileTable playerId={playerId} leagueId={leagueId} />
                  // <ProfileTable userId={userId} leagueId={leagueId} />
                ) : (
                  <div className="flex flex-grow items-center ">
                    <p className="text-2xl text-white font-bold w-full text-center">
                      No Match History To Show!
                    </p>
                  </div>
                )}
              </Tab.Panel>

              {/* Statitics */}
              <Tab.Panel
                key={1}
                className={classNames(
                  "rounded-xl flex flex-col w-full h-full "
                )}
              >
                <hr className="h-px mt-4 bg-charcoal border-0" />

                <div className="text-black dark:text-white h-full w-full overflow-auto">
                  <PlayerStatistics playerId={playerId} leagueId={leagueId} />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <ImageCropperModal modalOpen={modalOpen} setModalOpen={setModalOpen} setPreviewURL={setPreviewURL} setChosenFile={setChosenFile} />
    </div>
  );
};

export default PublicPlayer;
