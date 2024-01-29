import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as actions from "../../actions";

const Blog = (props) => {
    let { leagueId, blogId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        actions.getUserInfo(dispatch, localStorage.getItem("userId"));
        actions.getUsers(dispatch);

    }, [])

    const league = useSelector((state) => state.home.leagues).find(
        (league) => league.id == leagueId
    );
    
    const blog = [
        {
            id: 1,
            leagueId: 1,
            userId: 1,
            title: 'Slam Dunk Chronicles',
            description: "Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers. Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way, you can think things through before committing to an actual design project. But then I found a component library based on Tailwind CSS called Flowbite. It comes with the most commonly used UI components, such as buttons, navigation bars, cards, form elements, and more which are conveniently built with the utility classes from Tailwind CSS.",
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
            id: 4,
            leagueId: 1,
            userId: 3,
            title: "Net Navigators",
            description: "Navigate the intricate plays, tactical maneuvers, and statistical breakdowns with Net Navigators. This blog dives deep into the analytics, offering a strategic perspective on how teams are conquering the basketball league.",
            createdAt: "2024-01-04T15:30:47.000Z"
        },
        {
            id: 5,
            leagueId: 1,
            userId: 1,
            title: "Triple Threat Tribune",
            description: "Stay ahead of the game with Triple Threat Tribune, your go-to source for triple-doubles, MVP races, and rising stars. This blog covers the entire basketball league landscape, from rookies making waves to veterans rewriting records.",
            createdAt: "2024-01-27T15:30:47.000Z"
        },
    ].find(blog => blog.id == blogId);
    const user = useSelector(state => state.home.users).find(user => user.id == blog.userId);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };


    return (
        <div className="flex flex-col flex-grow">
            <p className="flex font-dark-gray my-3">
                <Link to="/" className="text-sky-500 hover:underline">
                    <span className="">My Leagues</span>
                </Link>

                <span className="">&nbsp; &gt; &nbsp;</span>
                <Link to={`/league/${leagueId}?tab=1`} className="hover:underline">
                    <span className="text-sky-500">{league?.name}</span>
                </Link>
                <span className="">&nbsp; &gt; &nbsp;</span>
                <p className="">{blog.title}</p>
            </p>
            <div className="flex flex-col flex-grow rounded-main dark:bg-slate bg-white overflow-auto p-default sm:mt-3">
                <article class="mx-auto w-full w-5/6 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header class="mb-4 lg:mb-6 not-format">
                        <address class="flex items-center mb-6 not-italic">
                            <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img class="mr-4 w-16 h-16 rounded-full" src={user?.avatar} alt="Jese Leos" />
                                <div>
                                    <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</a>
                                    <p class="text-base text-gray-500 dark:text-gray-400">{user?.email}</p>
                                    <p class="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">{new Date(blog.createdAt).toLocaleDateString('en-US', options)}</time></p>
                                </div>
                            </div>
                        </address>
                        <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog?.title}</h1>
                    </header>
                    <p className="text-black dark:text-white font-medium">{blog.description}</p>
                </article>
            </div>
        </div>
    )
}

export default Blog;