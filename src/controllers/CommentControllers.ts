import { RequestHandler } from 'express';
import Blog from '../models/Blog';
import Comment from '../models/Comment';

// GET SERVER_URL/api/blog/all
const getBlogs = async (leagueId: number) => {
  const blogs = await Blog.findAll({
    where: {
      leagueId
    }
  });
  const blogsData = blogs.map(blog => blog.dataValues);

  const blogTemp: any = [];
  for (const blog of blogsData) {
    // find all blog comments
    const comments = await Comment.findAll({
      where: {
        parentId: blog.id,
        isBlogComment: 1
      }
    });

    const commentTemp = [];
    for (const comment of comments) {
      const commentId = comment.dataValues.id;
      // find all reply comments based on the blog comment
      let replyComments = await Comment.findAll({
        where: {
          parentId: commentId,
          isBlogComment: 0
        }
      });
      commentTemp.push(comment.dataValues);
      replyComments.map(comment => {
        commentTemp.push(comment.dataValues);
      });
    }
    blogTemp.push({ ...blog, comments: commentTemp })
  }
  return blogTemp
}

// export const all: RequestHandler = async (req, res) => {
//   const { leagueId } = req.body;
//   try {
//     const blogs = await getBlogs(leagueId);
//     res.status(200).json({ blogs });
//   } catch (error) {
//     res.status(400).json({ message: "Error occurred" });
//   }
// }

// POST SERVER_URL/api/comment/create
export const create: RequestHandler = async (req, res) => {
  const { leagueId, blogId, userId, description } = req.body;
  try {
    await Comment.create({
      parentId: blogId,
      userId: userId,
      isBlogComment: true,
      description: description,
      likes: 0,
      dislikes: 0
    });
    const blogs = await getBlogs(leagueId);
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(400).json({ message: "Error occurred!" });
  }
}

// POST SERVER_URL/api/comment/update
export const update: RequestHandler = async (req, res) => {
  const { comment,description, leagueId } = req.body;
  try {
      const foundComment = await Comment.findByPk(comment.id);
      if(foundComment) {
        foundComment.description = description;
        await foundComment.save();
      } else {
        res.status(400).json({ message: "Comment not found!" });

      }
      const blogs = await getBlogs(leagueId);
      res.status(200).json({ blogs });
  } catch (error) {
    res.status(400).json({ message: "Error occurred!" });
  }
}

// POST SERVER_URL/api/blog/remove
export const remove: RequestHandler = async (req, res) => {
  const { comment, leagueId } = req.body;
  try {
    const foundComment = await Comment.findByPk(comment.id);
    if (foundComment) {
      // check if the comment is the blog comment or not
      // if the comment is the blog comment, need to remove all replies of this comment
      if (foundComment.dataValues.isBlogComment) {
        let commentId = foundComment.dataValues.id;
        const replyComments = await Comment.findAll({
          where:{
            parentId: commentId,
            isBlogComment: 0
          }
        });
        for (let replyComment of replyComments) {
          await replyComment.destroy()
        }
      }
      await foundComment.destroy()

      const blogs = await getBlogs(leagueId);
      res.status(200).json({ blogs });
    }
  } catch (error) {

  }
}
