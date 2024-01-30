import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as actions from "../../actions";
import CommentCard from "../../components/Card/Comment";

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

    const comments = [
        {
            id:1,
            blogId:1,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            userId: 2,
            description: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
            likes: 0,
            dislikes:1,
            createdAt: "2024-01-04T15:30:47.000Z"
        },
        {
            id:2,    
            blogId:2,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            userId: 1,
            description: "The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.",
            likes: 0,
            dislikes:1,
            createdAt: "2024-01-14T15:30:47.000Z"
        },
        {
            id:3,     
            blogId:1,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            userId: 3,
            description: "Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.",
            likes: 0,
            dislikes:1,
            createdAt: "2024-01-24T15:30:47.000Z"
        },
    ]


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
                <article className="mx-auto w-full w-3/4 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <img className="mr-4 w-16 h-16 rounded-full" src={user?.avatar} alt="Jese Leos" />
                                <div>
                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</a>
                                    <p className="text-base text-gray-500 dark:text-gray-400">{user?.email}</p>
                                    <p className="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">{new Date(blog.createdAt).toLocaleDateString('en-US', options)}</time></p>
                                </div>
                            </div>
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog?.title}</h1>
                    </header>
                    <p className="text-black dark:text-white font-medium">{blog.description}</p>
                    <hr className="border border-gray-500 my-3"/>
                    <section className="not-format">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
                        </div>
                        <form className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label for="comment" className="sr-only">Your comment</label>
                                <textarea id="comment" rows="6"
                                    className="p-3 w-full text-sm text-gray-900 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    placeholder="Write a comment..." required></textarea>
                            </div>
                            <button type="submit"
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-opacity-70 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900">
                                Post comment
                            </button>
                        </form>
                        {
                            comments.filter(comment=>comment.blogId == blogId).map(comment=>(
                                <CommentCard comment={comment}/>
                            ))
                        }

                    </section>
                </article>
            </div>
        </div>
    )
}

export default Blog;