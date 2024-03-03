import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Select from "../Select";
import SelectPoints from "../Select/points";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useMemo } from "react";
import DefaultSubstituteAvatar from "../../assets/img/dark_mode/default-substitutue-avatar.svg";
import * as actions from "../../actions";
import BlogCard from "../Card/Blog";


const Dashboard = () => {
    let { leagueId } = useParams();
    const dispatch = useDispatch();
    const isPublic = localStorage.getItem('token') ? false : true;

    const teams = useSelector(state => state.home.teams);
    const matches = useSelector(state => state.home.matches).filter(match => match.leagueId == leagueId);
    const matchFilters = [
        { id: 0, name: "Upcoming" },
        { id: 1, name: "Past" },
    ];

    useEffect(() => {
        actions.getBlogs(dispatch, { leagueId })
    }, [])

    const [matchFilter, setMatchFilter] = useState(matchFilters[0].name)
    const [matchFilteredData, setMatchFilteredData] = useState([])

    useEffect(() => {
        setMatchFilteredData(matches.filter(match => match.isNew));
    }, [matches.length])

    const handleMatchFilter = (e) => {
        setMatchFilter(e.name);
        // Upcoming
        if (e.id === 0) {
            const upcomingMatches = matches.filter(match => match.isNew)
            setMatchFilteredData(upcomingMatches);
        }
        // Past
        else if (e.id === 1) {
            const pastMatches = matches.filter(match => !match.isNew)
            setMatchFilteredData(pastMatches);
        }
    }

    const playerFilters = [
        { id: 0, name: "Player" },
        { id: 1, name: "Team" },
    ];
    const pointsFilters = [
        { id: 0, name: "Points" },
        { id: 1, name: "3PM" },
        { id: 2, name: "3PA" },
        { id: 3, name: "3P%" },
        { id: 4, name: "FGM" },
        { id: 5, name: "FGA" },
        { id: 6, name: "FG%" },
        { id: 7, name: "FTM" },
        { id: 8, name: "FTA" },
        { id: 9, name: "FT%" },
        { id: 10, name: "Blocks" },
        { id: 11, name: "Rebounds" },
        { id: 12, name: "Assists" },
        { id: 13, name: "Fouls" },
        { id: 14, name: "Steals" },
    ]

    const [playerFilter, setPlayerFilter] = useState(playerFilters[0].name);
    const [pointsFilter, setPointsFilter] = useState(pointsFilters[0].name);
    const [filteredData, setFilteredData] = useState([])

    const players = useSelector(state => state.home.players).filter(player => player.leagueId == leagueId);
    const matchups = useSelector((state) => state.home.matchups);

    const league = useSelector(state => state.home.leagues).find(league => league.id == leagueId);
    const displaySubstitutes = league?.displaySubstitutes;

    const filterObject = {
        "Points": "totalPoints",
        "3PM": "totalPoints3",
        "3PA": "attempts3",
        "3P%": "3p%",
        "FGM": "totalPoints2",
        "FGA": "attempts2",
        "FG%": "fg%",
        "FTM": "totalPoints1",
        "FTA": "attempts1",
        "FT%": "ft%",
        "Blocks": "blocks",
        "Rebounds": "rebounds",
        "Assists": "assists",
        "Fouls": "fouls",
        "Steals": "steals"
    }

    const updatedPlayers = Object.values(
        players.reduce((acc, player) => {
            if (player.userId !== null) {
                const matchup = matchups.filter(
                    (matchup) =>
                        matchup.userId == player.userId && matchup.leagueId == league.id
                );
                const points = matchup.reduce((sum, item) => sum + item.points, 0);
                if (player.userId in acc) {
                    // If player already exists, add points to existing player
                    // acc[player.userId].points = points;
                    // overwrite the teamId if there is a player who is not deleted
                    console.log("substitute", player.id, player.isSubstitute);
                    if (player.teamId !== 0 && !player.isSubstitute) {
                        acc[player.userId].teamId = player.teamId;
                    }
                    // acc[player.userId].teamId = player.teamId !== 0 && player.isSubstitute !== 1? player.teamId : 0;
                    // overwrite the isDeleted if there is a player who is not deleted
                    acc[player.userId].isDeleted = player.isDeleted ? 1 : player.isDeleted;
                } else {
                    // If player doesn't exist, create a new entry
                    acc[player.userId] = { ...player };
                    // acc[player.userId] = { ...player, points: points };
                }
            } else {
                // acc[player.userId] = {...player}
                const nullUserIdKey = `nullUser_${Math.random()}`; // create a unique key
                acc[nullUserIdKey] = { ...player }; // use a
            }
            return acc;
        }, {})
    );


    const data = useMemo(() => {
        let mappedData = updatedPlayers
            .sort((a, b) => b.points - a.points)
            .map((player) => {
                const matchup = matchups.filter(
                    (matchup) =>
                        matchup.userId == player.userId &&
                        matchup.leagueId == league.id &&
                        !matchup.match?.isNew
                );
                return {
                    id: player.id,
                    totalPoints: matchup.reduce((sum, item) => sum + item.points, 0),
                    totalPoints1: matchup.reduce(
                        (sum, matchup) => sum + matchup.points1,
                        0
                    ),
                    totalPoints2: matchup.reduce(
                        (sum, matchup) => sum + matchup.points2,
                        0
                    ),
                    totalPoints3: matchup.reduce(
                        (sum, matchup) => sum + matchup.points3,
                        0
                    ),
                    attempts1: matchup.reduce(
                        (sum, matchup) => sum + matchup.attempts1,
                        0
                    ),
                    attempts2: matchup.reduce(
                        (sum, matchup) => sum + matchup.attempts2,
                        0
                    ),
                    attempts3: matchup.reduce(
                        (sum, matchup) => sum + matchup.attempts3,
                        0
                    ),
                    "3p%": isNaN(
                        (matchup.reduce((sum, matchup) => sum + matchup.points3, 0) /
                            matchup.reduce((sum, matchup) => sum + matchup.attempts3, 0)) *
                        100
                    )
                        ? 0
                        : (
                            (matchup.reduce((sum, matchup) => sum + matchup.points3, 0) /
                                matchup.reduce(
                                    (sum, matchup) => sum + matchup.attempts3,
                                    0
                                )) *
                            100
                        ).toFixed(2),
                    "fg%": isNaN(
                        (matchup.reduce((sum, matchup) => sum + matchup.points2, 0) /
                            matchup.reduce((sum, matchup) => sum + matchup.attempts2, 0)) *
                        100
                    )
                        ? 0
                        : (
                            (matchup.reduce((sum, matchup) => sum + matchup.points2, 0) /
                                matchup.reduce(
                                    (sum, matchup) => sum + matchup.attempts2,
                                    0
                                )) *
                            100
                        ).toFixed(2),
                    "ft%": isNaN(
                        (matchup.reduce((sum, matchup) => sum + matchup.points1, 0) /
                            matchup.reduce((sum, matchup) => sum + matchup.attempts1, 0)) *
                        100
                    )
                        ? 0
                        : (
                            (matchup.reduce((sum, matchup) => sum + matchup.points1, 0) /
                                matchup.reduce(
                                    (sum, matchup) => sum + matchup.attempts1,
                                    0
                                )) *
                            100
                        ).toFixed(2),
                    blocks: matchup.reduce((sum, matchup) => sum + matchup.blocks, 0),
                    rebounds: matchup.reduce((sum, matchup) => sum + matchup.rebounds, 0),
                    assists: matchup.reduce((sum, matchup) => sum + matchup.assists, 0),
                    fouls: matchup.reduce((sum, matchup) => sum + matchup.fouls, 0),
                    steals: matchup.reduce((sum, matchup) => sum + matchup.steals, 0),
                    turnovers: matchup.reduce(
                        (sum, matchup) => sum + matchup.turnovers,
                        0
                    ),
                    position: player.position,
                    userId: player.userId,
                    jerseyNumber: player.jerseyNumber,
                    firstName: player.firstName,
                    lastName: player.lastName,
                    avatar: player.avatar ? player.avatar : DefaultSubstituteAvatar,
                    isSubstitute: player.isSubstitute,
                    team: teams.find((team) => team.id == player.teamId),
                    teamName: teams.find((team) => team.id == player.teamId)?.name,
                    teamId: player.teamId,
                    gp: matchup.length,
                    ppg:
                        matchup.length === 0
                            ? 0
                            : matchup.reduce((sum, item) => sum + item.points, 0) /
                            matchup.length,
                };
            });

        return mappedData.sort((a, b) => b[filterObject[pointsFilter]] - a[filterObject[pointsFilter]])
    }, [updatedPlayers, displaySubstitutes, pointsFilter]);

    const teamData = useMemo(() => {
        let mappedData = teams.map(team => {
            let matchupsOfTeam = matchups.filter(
                (matchup) => matchup.teamId == team.id
            );
            return {
                id: team.id,
                name: team.name,
                logo: team.logo,
                win: team.win,
                lose: team.lose,
                pointScored: team.pointScored,
                pointAgainst: team.pointAgainst,
                diff: team.diff,
                totalPoints: matchupsOfTeam.reduce((sum, item) => sum + item.points, 0),
                totalPoints1: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points1, 0),
                totalPoints2: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points2, 0),
                totalPoints3: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points3, 0),
                "3p%": isNaN(
                    (matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points3, 0) /
                        matchupsOfTeam.reduce((sum, matchup) => sum + matchup.attempts3, 0)) *
                    100
                )
                    ? 0
                    : (
                        (matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points3, 0) /
                            matchupsOfTeam.reduce(
                                (sum, matchup) => sum + matchup.attempts3,
                                0
                            )) *
                        100
                    ).toFixed(2),
                "fg%": isNaN(
                    (matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points2, 0) /
                        matchupsOfTeam.reduce((sum, matchup) => sum + matchup.attempts2, 0)) *
                    100
                )
                    ? 0
                    : (
                        (matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points2, 0) /
                            matchupsOfTeam.reduce(
                                (sum, matchup) => sum + matchup.attempts2,
                                0
                            )) *
                        100
                    ).toFixed(2),
                "ft%": isNaN(
                    (matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points1, 0) /
                        matchupsOfTeam.reduce((sum, matchup) => sum + matchup.attempts1, 0)) *
                    100
                )
                    ? 0
                    : (
                        (matchupsOfTeam.reduce((sum, matchup) => sum + matchup.points1, 0) /
                            matchupsOfTeam.reduce(
                                (sum, matchup) => sum + matchup.attempts1,
                                0
                            )) *
                        100
                    ).toFixed(2),
                attempts1: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.attempts1, 0),
                attempts2: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.attempts2, 0),
                attempts3: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.attempts3, 0),
                blocks: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.blocks, 0),
                rebounds: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.rebounds, 0),
                assists: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.assists, 0),
                fouls: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.fouls, 0),
                steals: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.steals, 0),
                turnovers: matchupsOfTeam.reduce((sum, matchup) => sum + matchup.turnovers, 0),
                ppg: team.win + team.lose === 0 ? 0 : team.pointScored / (team.win + team.lose)
            };
        })

        return mappedData.sort((a, b) => b[filterObject[pointsFilter]] - a[filterObject[pointsFilter]])
    }, [teams, pointsFilter])

    const handlePlayerFilter = (e) => {
        setPlayerFilter(e.name);
        setPointsFilter("Points")
        // Upcoming
        if (e.id === 0) {
            setFilteredData(data)
        }
        // Past
        else if (e.id === 1) {
            setFilteredData(teamData)
        }
    }

    const handlePointsFilter = (e) => {
        setPointsFilter(e.name);
    }

    const blogs = useSelector(state => state.home.blogs).filter(blog => blog.leagueId == leagueId);


    return (
        <>
            <hr className="h-px mb-4 bg-charcoal border-0" />
            <div className="flex space-x-4">
                <div className="w-full flex flex-col">
                    <div
                        className={`items-center rounded-default`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {/* Matches */}
                            <div className="flex flex-col justify-between bg-light-charcoal dark:bg-charcoal h-[400px] rounded-lg text-black dark:text-white shadow-md">
                                <div className="flex flex-col divide-gray-300 overflow-y-auto shadow-sm h-full">
                                    <div className="flex justify-between h-10 p-default sticky top-0 z-10 bg-light-charcoal dark:bg-charcoal shadow-md items-center">
                                        <p className="font-inter text-sm sm:text-lg">Matches</p>
                                        <SelectPoints
                                            className="w-[120px] rounded-lg text-xs h-[30px]"
                                            options={matchFilters}
                                            value={matchFilter}
                                            handleClick={handleMatchFilter}
                                        ></SelectPoints>
                                    </div>
                                    {
                                        matchFilteredData.length > 0 ? (
                                            matchFilteredData.map(match => (
                                                <div className="flex flex-col p-default text-xs sm:text-sm border-b">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <img src={match.homeTeam.logo} alt="" className="h-10 w-10 mr-3 rounded-full border border-gray-500" />
                                                            {/* <Link to={`/league/${leagueId}/team/${match.homeTeamId}`} className="">{match.homeTeam.name}</Link> */}
                                                            <p className={`${match.homeTeamPoints > match.awayTeamPoints ? "font-bold" : ""}`}>{match.homeTeam.name}</p>
                                                        </div>
                                                        <p className="text-green-500 text-lg mx-2">VS</p>
                                                        <div className="flex items-center text-right">
                                                            <p className={`${match.homeTeamPoints < match.awayTeamPoints ? "font-bold" : ""}`}>{match.awayTeam.name}</p>
                                                            <img src={match.awayTeam.logo} alt="" className="h-10 w-10 ml-3 rounded-full border border-gray-500" />
                                                        </div>
                                                    </div>
                                                    <div className="mx-auto mt-3 text-xs sm:text-sm">
                                                        <p>{match.date ? match.date + " • " : ""}{match.time}{match.location ? " • " + match.location : ""}</p>
                                                    </div>

                                                </div>
                                            ))
                                        ) : (
                                            <p className="mx-auto text-sm mt-3 text-xs sm:text-sm">
                                                No {matchFilter} Matches To Show!
                                            </p>
                                        )
                                    }
                                </div>
                                <div className="mx-auto my-2">
                                    <Link to={`/league/${leagueId}?tab=3`} className="hover:underline text-sky-500 text-xs sm:text-sm">View More</Link>
                                </div>
                            </div>

                            {/* League Leaders */}
                            <div className="flex flex-col justify-between bg-light-charcoal dark:bg-charcoal h-[400px] rounded-lg text-black dark:text-white shadow-md">
                                <div className="flex flex-col  divide-gray-300 overflow-y-auto shadow-sm h-full">
                                    <div className="flex justify-between h-10 p-default sticky top-0 z-10 bg-light-charcoal dark:bg-charcoal shadow-md items-center">
                                        <p className="font-inter text-sm sm:text-lg">League Leaders</p>
                                        <div className="flex space-x-1 sm:space-x-3">
                                            <SelectPoints
                                                className="w-[87px] rounded-lg text-xs h-[30px]"
                                                options={playerFilters}
                                                value={playerFilter}
                                                handleClick={handlePlayerFilter}
                                            ></SelectPoints>
                                            <SelectPoints
                                                className="w-[87px] rounded-lg text-xs h-[30px]"
                                                options={pointsFilters}
                                                value={pointsFilter}
                                                handleClick={handlePointsFilter}
                                            ></SelectPoints>
                                        </div>
                                    </div>
                                    {
                                        playerFilter === "Player" && (
                                            data.length > 0 ? (
                                                data.map((player, idx) => (
                                                    <div className="flex flex-col p-default text-xs sm:text-sm" key={idx}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p className="mr-3">{idx + 1}.</p>
                                                                <Link to={`/${isPublic ? "public_league" : "league"}/${leagueId}/player/${player.id}`}>
                                                                    <img src={player.avatar} alt="" className="h-10 w-10 mr-3 rounded-full border border-gray-500" />
                                                                </Link>
                                                                <div>
                                                                    <Link
                                                                        to={`/${isPublic ? "public_league" : "league"}/${leagueId}/player/${player.id}`}
                                                                        className="hover:underline"
                                                                    >
                                                                        <p className="">{player.firstName} {player.lastName}</p>
                                                                    </Link>
                                                                    <Link to={`/${isPublic ? "public_league" : "league"}/${leagueId}/team/${player.teamId}`} className="hover:underline">
                                                                        <p className="text-xs">{player.teamName}</p>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <p className="text-green-500 text-lg">{player[filterObject[pointsFilter]]}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="mx-auto text-sm mt-3 text-xs sm:text-sm">
                                                    No Players To Show!
                                                </p>
                                            )
                                        )
                                    }
                                    {
                                        playerFilter === "Team" && (
                                            teamData.length > 0 ? (
                                                teamData.map((team, idx) => (
                                                    <div className="flex flex-col p-default text-xs sm:text-sm" key={idx}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p className="mr-3">{idx + 1}.</p>
                                                                <Link to={`/${isPublic ? "public_league" : "league"}/${leagueId}/team/${team.id}`} className="hover:underline">
                                                                    <img src={team.logo} alt="" className="h-10 w-10 mr-3 rounded-full border border-gray-500" />
                                                                </Link>
                                                                <div>
                                                                    <Link to={`/${isPublic ? "public_league" : "league"}/${leagueId}/team/${team.id}`} className="hover:underline">
                                                                        <p>{team.name}</p>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <p className="text-green-500 text-lg">{team[filterObject[pointsFilter]]}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="mx-auto text-sm mt-3 text-xs sm:text-sm">
                                                    No Teams To Show!
                                                </p>
                                            )
                                        )
                                    }
                                </div>
                                <div className="mx-auto my-2">
                                    <Link to={`/league/${leagueId}?tab=5`} className="hover:underline text-sky-500 text-xs sm:text-sm">View More</Link>
                                </div>
                            </div>

                            {/* News */}
                            <div className="flex flex-col justify-between bg-light-charcoal dark:bg-charcoal h-[400px] rounded-lg text-black dark:text-white shadow-md">
                                <div className="flex flex-col divide-gray-300 overflow-y-auto shadow-sm h-full">
                                    <div className="flex justify-between h-10 p-default sticky top-0 z-10 bg-light-charcoal dark:bg-charcoal shadow-md items-center">
                                        <p className="font-inter text-sm sm:text-lg">News</p>
                                    </div>
                                    <div className="flex flex-col px-default space-y-3">
                                        {
                                            blogs.length > 0 ? (
                                                blogs.map((blog, idx) => (
                                                    <BlogCard blog={blog} key={idx}></BlogCard>
                                                ))
                                            ) : (
                                                <p className="mx-auto text-sm mt-3 text-xs sm:text-sm">
                                                    No News To Show!
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="mx-auto my-2">
                                    <Link to={`/league/${leagueId}?tab=5`} className="hover:underline text-sky-500 text-xs sm:text-sm">View More</Link>
                                </div>
                            </div>

                            {/* <div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti consectetur nobis dolor, autem esse sequi, vel perspiciatis omnis exercitationem quod qui temporibus recusandae facere eligendi saepe repellat commodi iure aspernatur?</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;