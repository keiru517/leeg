import * as actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const Card = (props) => {
  const { league } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.home.user);
  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == league.id && admin.isDeleted !== 1
  );

  const users = useSelector((state) => state.home.users);
  const owner = users.find((user) => user.id == league.userId);

  const isAdmin =
    admins.some((admin) => admin.userId == user?.id) ||
    league.userId == user?.id;

  const player = useSelector((state) => state.home.players).find(
    (player) => player.userId == user?.id && player.leagueId == league.id
  );

  const handleClick = () => {
    dispatch({ type: actions.OPEN_LEAGUE_DETAIL_DIALOG, payload: league });
  };

  return (
    <div
      className={`rounded-default h-[170px] bg-light-charcoal dark:bg-charcoal p-default shadow dark:shadow-gray-600 hover:cursor-pointer hover:opacity-80`}
      onClick={handleClick}
    >
      <div className="">
        <div className="items-center justify-between">
          <div className="flex items-center">
            <img src={league.logo} className="w-10 h-10 rounded-lg"></img>
            <p className="dark:text-white text-sm ml-5 truncate max-w-full">
              {league.name}
              <br></br>
              <span className="text-xs text-gray-400"> {owner?.email}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <div>
          {player?.isAcceptedList === 1 &&
          player?.isDeleted !== 1 &&
          player?.teamId !== 0 ? (
            <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
              Player
            </span>
          ) : (
            ""
          )}
          {isAdmin ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              Admin
            </span>
          ) : (
            ""
          )}
          {league?.isAllowedFan ? (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
              Public
            </span>
          ) : (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
              Private
            </span>
          )}
        </div>
        {(player?.isWaitList === 1 || player?.isAcceptedList === 1) && (
          <div className="flex">
            {player?.isWaitList === 1 ? (
              <p className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                Pending
              </p>
            ) : (
              player?.isAcceptedList === 1 && (
                <p
                  className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400"
                >
                  Accepted
                </p>
              )
            )}
          </div>
        )}
      </div>
      <div className="h-[75px] mt-4">
        <p className="dark:text-gray-400 text-[10px] text-left">
          Start Date: {league.startDate} End Date: {league.endDate}
        </p>
        <p className="dark:text-[#c6c6c6] text-left text-xs h-[54px] mt-2 truncate max-w-full">
          {league.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
