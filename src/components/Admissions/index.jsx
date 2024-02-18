import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as actions from "../../actions";
import Input from "../Input";
import Select from "../Select";
import InvitePlayerModal from "../Modal/InvitePlayerModal";
import AddPlayerModal from "../Modal/AddPlayerModal";
import RosterTable from "../Table/Roster";
import searchIconDark from "../../assets/img/dark_mode/search-icon-dark.svg";
import searchIconLight from "../../assets/img/dark_mode/search-icon-light.svg";

const Admissions = () => {
  let { leagueId } = useParams();

    const dispatch = useDispatch();

    const darkMode = useSelector((state) => state.home.dark_mode);

    const [waitListKeyword, setWaitListKeyword] = useState("");
    const players = useSelector((state) => state.home.players).filter(
        (player) => player.leagueId == leagueId && player.isDeleted !== 1
    );
    // const [rosters, setRosters] = useState([]);
    
    const rosterOptions = [
        { id: 0, name: "Waitlisted" },
        { id: 1, name: "Accepted" },
    ];
    const [rosterValue, setRosterValue] = useState(rosterOptions[0].name);
    // useEffect(() => {
    //     var result = players?.filter((roster) => roster.isWaitList === 1);
    //     if (rosterValue == "Waitlisted") {
    //         result = players?.filter((roster) => roster.isWaitList === 1);
    //     } else {
    //         result = players?.filter((roster) => roster.isAcceptedList === 1);
    //     }
    //     setRosters(result);
    // }, [rosterValue]);
    
    const rosters = useMemo(()=>{
        var result = players?.filter((roster) => roster.isWaitList === 1);
        if (rosterValue == "Waitlisted") {
            result = players?.filter((roster) => roster.isWaitList === 1);
        } else {
            result = players?.filter((roster) => roster.isAcceptedList === 1);
        }
        return result
    }, [rosterValue, players])
    const handleInvitePlayer = () => {
        dispatch({ type: actions.OPEN_INVITE_PLAYER_DIALOG, payload: true });
    };

    // Add players
    const [isOpenAddPlayerModal, setIsOpenAddPlayerModal] = useState(false)
    const handleAddPlayer = () => {
        setIsOpenAddPlayerModal(true)
    }

    return (
        <>
            <hr className="h-px mb-4 bg-charcoal border-0" />
            <div className="h-full ">
                <div className="border border-dark-gray flex flex-col h-full min-h-[420px] p-default rounded-main">
                    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 w-full justify-between space-y-2 md:space-y-0 lg:space-y-0">
                        <div className="flex flex-grow space-x-3 md:col-span-3 lg:col-span-5">
                            <Input
                                className="flex flex-grow rounded-lg h-[38px] bg-transparent text-xs"
                                icon={darkMode ? searchIconDark : searchIconLight}
                                placeholder="Search"
                                value={waitListKeyword}
                                onChange={(e) => {
                                    setWaitListKeyword(e.target.value);
                                }}
                            />
                            <Select
                                className="h-[40px] w-[144px] rounded-lg text-xs"
                                options={rosterOptions}
                                handleClick={(e) => setRosterValue(e.name)}
                                value={rosterValue}
                            >
                                {rosterValue}
                            </Select>
                        </div>
                        <div className="flex md:ml-2 col-span-2 space-x-3">
                            <button
                                onClick={handleInvitePlayer}
                                className="w-full lg:col-span-1 h-10 bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold float-right "
                            >
                                Invite Player
                            </button>
                            <button
                                onClick={handleAddPlayer}
                                className="w-full lg:col-span-1 h-10 bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-sm font-bold float-right "
                            >
                                Add Player
                            </button>
                        </div>
                        <div className="md:ml-2 col-span-1">
                        </div>
                    </div>
                    <div className="overflow-y-scroll:auto h-4/6 flex flex-col flex-grow rounded-default">
                        {rosters.filter((roster) =>
                            (roster.firstName + roster.lastName)
                                .toLowerCase()
                                .includes(waitListKeyword.toLowerCase())
                        ).length > 0 ? (
                            <RosterTable
                                rosters={rosters.filter((roster) =>
                                    (roster.firstName + roster.lastName)
                                        .toLowerCase()
                                        .includes(waitListKeyword.toLowerCase())
                                )}
                                // rosterList={rosterValue}
                                rosterValue={rosterValue}
                            />
                        ) : (
                            <div className="flex items-center flex-grow">
                                <p className="text-2xl text-black dark:text-white w-full text-center">
                                    {rosterValue === "Waitlisted"
                                        ? "No Waitlist to show!"
                                        : "Now Accepted to show!"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <InvitePlayerModal />
            <AddPlayerModal isOpenAddPlayerModal={isOpenAddPlayerModal} setIsOpenAddPlayerModal={setIsOpenAddPlayerModal}/>

        </>
    )
}

export default Admissions;