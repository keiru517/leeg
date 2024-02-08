import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../Card/Blog";
import Input from "../../components/Input";
import searchIconDark from "../../assets/img/dark_mode/search-icon-dark.svg";
import searchIconLight from "../../assets/img/dark_mode/search-icon-light.svg";
import BlogModal from "../Modal/BlogModal";
import * as actions from "../../actions";

const Blog = () => {
    let { leagueId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        actions.getBlogs(dispatch, {leagueId})
    }, [])

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

    const blogs = useSelector(state=>state.home.blogs);
    const [blogKeyword, setBlogKeyword] = useState("");

    const handleCreateBlog = () => {
        console.log("Create blog")
        dispatch({
            type: actions.OPEN_CREATE_BLOG_DIALOG
        })
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
            <BlogModal userId={user?.id} leagueId={leagueId}/>
        </>
    )
}

export default Blog;