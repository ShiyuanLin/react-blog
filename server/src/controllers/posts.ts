import { db } from '../db.js';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response } from 'express'
import { RowDataPacket } from 'mysql2';

// interface IUserInfo {
//   id: string,
// }

export const getPosts = (req: Request, res: Response) => {
  const query = req.query.category
    ? 'SELECT * FROM posts WHERE category=?'
    : 'SELECT * FROM posts';

  db.query(query, [req.query.category], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req: Request, res: Response) => {
  const query = 'SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImage, `category`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?';

  db.query(query, [req.params.id], (err, data: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err: VerifyErrors | null, userInfo: any) => {
    if (err) return res.status(403).json('Token is not valid!');

    const query = 'INSERT INTO posts(`title`, `description`, `img`, `category`, `date`, `uid`) VALUES (?)';

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.category,
      req.body.date,
      userInfo.id
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json('Post has been created');
    });
  });
  // res.json('post from controller');
};

export const deletePost = (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err: VerifyErrors | null, userInfo: any) => {
    if (err) return res.status(403).json('Token is not valid!');

    const postId = req.params.id;
    const query = 'DELETE FROM POSTS WHERE `id` = ? AND `uid` = ?';

    db.query(query, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json('You can delete only your post!');

      return res.json('Post has been deleted');
    });
  });
};

export const updatePost = (req: Request, res: Response) => {
  // res.json('post from controller');
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  jwt.verify(token, 'jwtkey', (err: VerifyErrors | null, userInfo: any) => {
    if (err) return res.status(403).json('Token is not valid!');

    const postId = req.params.id;

    const query = 'UPDATE posts SET `title`=?, `description`=?, `img`=?, `category`=? WHERE `id`=? AND `uid` = ?';

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.category
    ];

    db.query(query, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json('Post has been updated');
    });
  });
};

export const addPosts = (req: Request, res: Response) => {
  res.json('post from controller');
};
