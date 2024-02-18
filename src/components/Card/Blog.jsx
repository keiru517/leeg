import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Link, useNavigate } from "react-router-dom";
import editIconDark from "../../assets/img/dark_mode/edit-icon-dark.png";
import editIconLight from "../../assets/img/dark_mode/edit-icon-light.png";
import * as actions from "../../actions";
import draftToHtml from 'draftjs-to-html';

const BlogCard = (props) => {
    const { blog } = props;
    const isPublic = localStorage.getItem('token') ? false : true;
    const dispatch = useDispatch();

    const user = useSelector(state => state.home.user);
    const blogUser = useSelector(state => state.home.users).find(user => user.id == blog.userId);
    const darkMode = useSelector((state) => state.home.dark_mode);
    const admins = useSelector((state) => state.home.admins).filter(
        (admin) => admin.leagueId == blog.leagueId && admin.isDeleted !== 1
    );

    const isAdmin =
        admins.some((admin) => admin.userId == user?.id)

    const handleEdit = () => {
        dispatch({ type: actions.OPEN_EDIT_BLOG_DIALOG, payload: blog });
    };

    return (
        <article className="flex flex-col justify-between p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div>
                <div className="flex justify-between items-center mb-5 text-gray-500">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                        <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                        Blog
                        {
                            isAdmin ?
                                <img
                                    src={darkMode ? editIconDark : editIconLight}
                                    className="w-3.5 h-3.5 cursor-pointer ml-3"
                                    onClick={handleEdit}
                                ></img> : ""
                        }
                    </span>
                    <span className="text-sm">{formatDistanceToNow(new Date(blog.createdAt), {
                        addSuffix: true,
                        locale: enUS,
                    })}</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1"><a href="#">{blog.title}</a></h2>
                {/* <p className="mb-5 font-light text-gray-500 dark:text-gray-400 line-clamp-3">{blog.description}</p> */}
                <div className="mb-5 text-gray-500 dark:text-gray-400 line-clamp-3" dangerouslySetInnerHTML={{ __html: draftToHtml((JSON.parse(blog.description))) }} >
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img className="w-7 h-7 rounded-full border border-gray-500" src={blogUser?.avatar} alt="" />
                    <span className="font-medium dark:text-white">
                        {blogUser?.firstName} {blogUser?.lastName}
                    </span>
                </div>
                <Link to={`/${isPublic ? "public_league" : "league"}/${blog?.leagueId}/blog/${blog?.id}`} className="inline-flex items-center font-medium text-primary-600 dark:text-sky-500 hover:underline">
                    Read more
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>
            </div>
        </article>
    )
}

export default BlogCard;