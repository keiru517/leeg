import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../Card/Blog";
import Input from "../../components/Input";
import searchIconDark from "../../assets/img/dark_mode/search-icon-dark.svg";
import searchIconLight from "../../assets/img/dark_mode/search-icon-light.svg";

const Blog = () => {
    const blogs = [
        {
            id: 1,
            leagueId: 1,
            userId: 1,
            title: 'Slam Dunk Chronicles',
            description: "Delve into the latest basketball league updates, player spotlights, and game analyses. Whether you're a die-hard fan or a casual observer, Slam Dunk Chronicles has your hoops fix covered.",
            createdAt: "2024-01-29T15:30:47.000Z"
        },
        {
            id: 2,
            leagueId: 1,
            userId: 2,
            title: "Hoops Hustle Hub",
            description: "From buzzer-beaters to trade rumors, Hoops Hustle Hub delivers a dynamic blend of basketball league insights. Join the discussion on game strategies, standout performances, and the race to the championship.",
            createdAt: "2024-01-16T15:30:47.000Z"
        },
        {
            id: 3,
            leagueId: 1,
            userId: 1,
            title: "Courtside Confidential",
            description: "Uncover the behind-the-scenes stories, locker room chatter, and exclusive interviews with players and coaches. Courtside Confidential takes you beyond the court for an intimate look at the basketball league's human side.",
            createdAt: "2024-01-18T15:30:47.000Z"
        },
        {
            id: 1,
            leagueId: 1,
            userId: 3,
            title: "Net Navigators",
            description: "Navigate the intricate plays, tactical maneuvers, and statistical breakdowns with Net Navigators. This blog dives deep into the analytics, offering a strategic perspective on how teams are conquering the basketball league.",
            createdAt: "2024-01-04T15:30:47.000Z"
        },
        {
            id: 2,
            leagueId: 1,
            userId: 1,
            title: "Triple Threat Tribune",
            description: "Stay ahead of the game with Triple Threat Tribune, your go-to source for triple-doubles, MVP races, and rising stars. This blog covers the entire basketball league landscape, from rookies making waves to veterans rewriting records.",
            createdAt: "2024-01-27T15:30:47.000Z"
        },

    ]

    let { leagueId } = useParams();

    const user = useSelector((state) => state.home.user);
    const darkMode = useSelector((state) => state.home.dark_mode);

    const admins = useSelector((state) => state.home.admins).filter(
        (admin) => admin.leagueId == leagueId && admin.isDeleted !== 1
    );

    const users = useSelector(state => state.home.users);

    const league = useSelector((state) => state.home.leagues).find(
        (league) => league.id == leagueId
    );

    const isAdmin =
        admins.some((admin) => admin.userId == user?.id) ||
        league?.userId == user?.id;

    const [blogKeyword, setBlogKeyword] = useState("");

    const handleCreateBlog = () => {
        console.log("Create blog")
    }
    return (
        <>
            <hr className="h-px mb-4 bg-charcoal border-0" />
            <div className="flex space-x-1 sm:space-x-3">
                <div className="flex-grow">
                    <Input
                        className="rounded-lg h-[42px] text-xs"
                        icon={darkMode ? searchIconDark : searchIconLight}
                        placeholder="Search Blogs"
                        value={blogKeyword}
                        onChange={(e) => setBlogKeyword(e.target.value)}
                    />
                </div>
                <div className="">
                    {isAdmin && (
                        <button
                            onClick={handleCreateBlog}
                            className="float-right lg:w-32 h-10 bg-primary hover:bg-opacity-70 rounded-default text-white focus:ring-2 text-xs sm:text-sm font-bold w-[100px]"
                        >
                            Create Blog
                        </button>
                    )}
                </div>
            </div>

            {blogs.filter((blog) => {
                const user = users.find(user => user.id == blog.userId);
                return (user.firstName.toLowerCase() + user.firstName.toLowerCase() + blog.title.toLowerCase() + blog.description.toLowerCase()).includes(blogKeyword.toLowerCase())
            }
            ).length > 0 ? (
                <>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogs
                            .filter((blog) => {
                                const user = users.find(user => user.id == blog.userId);
                                return (user.firstName.toLowerCase() + user.firstName.toLowerCase() + blog.title.toLowerCase() + blog.description.toLowerCase()).includes(blogKeyword.toLowerCase())
                            }
                            )
                            .map((blog, idx) => (
                                <BlogCard blog={blog} key={idx}></BlogCard>
                            ))}
                    </div>
                </>
            ) : (
                <div className="flex items-center flex-grow">
                    <p className="text-xl sm:text-2xl text-black dark:text-white w-full text-center mt-5">
                        No Blogs to show!
                    </p>
                </div>
            )}
        </>
    )
}

export default Blog;