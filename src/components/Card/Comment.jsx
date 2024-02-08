import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Option from "../Option";
import * as actions from "../../actions";
import CommentModal from "../Modal/CommentModal";

const CommentCard = (props) => {
    const { comment, leagueId } = props;
    const dispatch = useDispatch();

    const user = useSelector(state => state.home.user);
    const commentUser = useSelector(state => state.home.users).find(user => user.id === comment.userId)
    const admins = useSelector((state) => state.home.admins).filter(
        (admin) => admin.leagueId == leagueId && admin.isDeleted !== 1
    );

    const isAdmin =
        admins.some((admin) => admin.userId == user?.id);
    const isCommentUser = user.id == comment.userId ? true : false

    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const adminOptions = [
        { id: 1, name: "Remove" },
    ];
    const commentUserOptions = [
        { id: 0, name: "Edit" },
        { id: 1, name: "Remove" },
        // { id: 2, name: "Report" },
    ];

    const handleOption = (idx) => {
        // edit comment
        if (idx === 0) {
            setIsOpenCommentModal(true);
        }
        // remove comment
        else {
            actions.deleteComment(dispatch, { comment, leagueId })
        }
    }

    const [isOpenCommentModal, setIsOpenCommentModal] = useState(false)

    return (
        <article className={`${comment.isBlogComment ? "" : "ml-6 lg:ml-12"} p-6 mb-6 text-base bg-transparent border-t border-gray-200 dark:border-gray-700 text-black dark:text-white`}>
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={commentUser?.avatar}
                            alt="Michael Gough" />{commentUser?.firstName}{commentUser?.lastName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">{new Date(comment.createdAt).toLocaleDateString('en-US', dateOptions)}</time></p>
                </div>
                {
                    (isAdmin || isCommentUser) ?
                        <Option
                            className="z-10 w-36 rounded divide-y bg-light-charcoal divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 "
                            options={isAdmin ? adminOptions : commentUserOptions}
                            handleClick={(idx, event) =>
                                handleOption(idx, event)
                            }
                        ></Option> :
                        ""
                }
            </footer>
            <p>{comment.description}</p>
            {/* <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                    className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                    <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                    </svg>
                    Reply
                </button>
            </div> */}
            <CommentModal comment={comment} isOpenCommentModal={isOpenCommentModal} setIsOpenCommentModal={setIsOpenCommentModal} leagueId={leagueId} />
        </article>
    )
}

export default CommentCard;