import { RequestHandler } from 'express';
import { Types } from '../types';
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
      where:{
        parentId: blog.id,
        isBlogComment: 1
      }
    });

    const commentTemp = [];
    for (const comment of comments) {
      const commentId = comment.dataValues.id;
      // find all reply comments based on the blog comment
      let replyComments = await Comment.findAll({
        where:{
          parentId: commentId,
          isBlogComment: 0
        }
      });
      commentTemp.push(comment.dataValues);
      replyComments.map(comment=>{
        commentTemp.push(comment.dataValues);
      });
    }
    blogTemp.push({...blog, comments: commentTemp})
  }
  return blogTemp
}

export const all: RequestHandler = async (req, res) => {
  const { leagueId } = req.body;
  try {
    const blogs = await getBlogs(leagueId);
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(400).json({ message: "Error occurred" });
  }
}

// POST SERVER_URL/api/blog/create
export const create: RequestHandler = async (req, res) => {
  const data: Types.T_Blog = req.body;
  try {
    await Blog.create(data);
    const blogs = await getBlogs(data.leagueId);
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(400).json({ message: "Error occurred!" });
  }
}

// POST SERVER_URL/api/blog/update
export const update: RequestHandler = async (req, res) => {
  const { id, leagueId, title, description } = req.body;
  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      blog.title = title;
      blog.description = description;
      await blog.save()
      const blogs = await getBlogs(leagueId);
      res.status(200).json({ blogs });
    } else {
      res.status(400).json({ message: "Blog not found!" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error occurred!" });
  }
}

// POST SERVER_URL/api/blog/remove
export const remove: RequestHandler = async (req, res) => {
  const { blogId, leagueId } = req.body;
  const blog = await Blog.findByPk(blogId);
  if (blog) {
    await blog.destroy();
    // remove comments
    const comments = await Comment.findAll({
      where:{
        parentId: blog.id,
        isBlogComment: 1
      }
    });
    for (const comment of comments) {
      if (comment) {
        // if comment is the blog comment
        if (comment.dataValues.isBlogComment) {
          const id = comment.dataValues.id;
          await comment.destroy()
          const replyComments = await Comment.findAll({
            where:{
              parentId: id,
              isBlogComment:0
            }
          });
          for (const replyComment of replyComments) {
            await replyComment.destroy();
          }
        }
      }
    }
    const blogs = await getBlogs(leagueId);
    res.status(200).json({ blogs });
  } else {
    res.status(400).json({ message: "Error occurred!" });
  }
}
