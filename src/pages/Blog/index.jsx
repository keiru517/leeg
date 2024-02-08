import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as actions from "../../actions";
import CommentCard from "../../components/Card/Comment";
import backIconDark from "../../assets/img/dark_mode/back-icon-dark.png";
import backIconLight from "../../assets/img/dark_mode/back-icon-light.png";
import editIconDark from "../../assets/img/dark_mode/edit-icon-dark.png";
import editIconLight from "../../assets/img/dark_mode/edit-icon-light.png";
import BlogModal from "../../components/Modal/BlogModal";
import draftToHtml from 'draftjs-to-html';

const Blog = (props) => {
    let { leagueId, blogId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.home.dark_mode);



    const league = useSelector((state) => state.home.leagues).find(
        (league) => league.id == leagueId
    );

    const blog = useSelector(state => state.home.blogs).find(blog => blog.id == blogId);
    const user = useSelector(state => state.home.user);
    const blogUser = useSelector(state => state.home.users).find(user => user.id == blog?.userId);

    const admins = useSelector((state) => state.home.admins).filter(
        (admin) => admin.leagueId == blog.leagueId && admin.isDeleted !== 1
    );
    const isAdmin =
        admins.some((admin) => admin.userId == user?.id) ||
        blog?.userId == user?.id;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    const [comment, setComment] = useState("")

    const handleSubmit = () => {
        if (comment == "") {
            alert("Please write a comment");
        } else {
            setComment("")
            actions.createComment(dispatch, { leagueId: leagueId, blogId: blogId, userId: user?.id, description: comment })
        }
    }
    const handleEdit = () => {
        dispatch({ type: actions.OPEN_EDIT_BLOG_DIALOG, payload: blog });
    };

    // const [content, setContent] = useState('{"blocks": [], "entityMap":{}}')
    useEffect(() => {
        console.log("component did mount")
        actions.getUserInfo(dispatch, localStorage.getItem("userId"));
        actions.getUsers(dispatch);
    }, [])


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
                {/* <span className="">&nbsp; &gt; &nbsp;</span>
                <p className="">{blog.title}</p> */}
            </p>
            <div className="flex flex-col flex-grow rounded-main dark:bg-slate bg-white overflow-auto p-default sm:mt-3">
                <div
                    className="w-6 h-6 sm:w-[34px] sm:h-[34px] bg-gray-300 dark:bg-primary items-center flex justify-center rounded-default cursor-pointer hover:opacity-70 mr-3"
                    onClick={() => navigate(-1)}
                >
                    <img
                        src={darkMode ? backIconDark : backIconLight}
                        alt=""
                        className="w-[4px] h-[10px] dark:hover:bg-middle-gray rounded-default cursor-pointer"
                    />
                </div>
                <article className="mx-auto w-full sm:w-3/4 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex justify-between items-center mb-6 not-italic">
                            <div className="flex  items-center mr-3 text-sm text-gray-900 dark:text-white">
                                <div className="flex items-center">
                                    <img className="mr-4 w-16 h-16 rounded-full" src={blogUser?.avatar} alt="Jese Leos" />
                                    <div>
                                        <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{blogUser?.firstName} {blogUser?.lastName}</a>
                                        <p className="text-base text-gray-500 dark:text-gray-400">{blogUser?.email}</p>
                                        <p className="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">{new Date(blog?.createdAt).toLocaleDateString('en-US', options)}</time></p>
                                    </div>

                                </div>
                            </div>
                            {
                                isAdmin ?
                                    <img
                                        src={darkMode ? editIconDark : editIconLight}
                                        className="w-6 h-6 cursor-pointer ml-3"
                                        onClick={handleEdit}
                                    ></img> : ""
                            }
                        </address>
                        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog?.title}</h1>
                    </header>
                    {/* <p className="text-black dark:text-white font-medium">{blog?.description}</p> */}
                    <div className="text-black dark:text-white" dangerouslySetInnerHTML={{ __html: draftToHtml((JSON.parse(blog?.description))) }} >
                    </div>
                    <hr className="border border-gray-500 my-3" />
                    <section className="not-format">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({blog?.comments.length})</h2>
                        </div>
                        <div className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label for="comment" className="sr-only">Your comment</label>
                                <textarea id="comment" rows="6"
                                    className="p-3 w-full text-sm text-gray-900 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment..." required
                                    value={comment}
                                />
                            </div>
                            <button type="button"
                                onClick={handleSubmit}
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-opacity-70 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900">
                                Post comment
                            </button>
                        </div>
                        {
                            blog?.comments.map(comment => (
                                <CommentCard comment={comment} leagueId={leagueId} />
                            ))

                        }

                    </section>
                </article>
                <BlogModal userId={user?.id} leagueId={leagueId} />

            </div>
        </div>
    )
}

export default Blog;