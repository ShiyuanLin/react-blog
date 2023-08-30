import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import { RowDataPacket } from 'mysql2';

export const register = (req: Request, res: Response) => {
  const query = 'SELECT * FROM users where email = ? or username = ?';

  db.query(query, [req.body.email, req.body.username], (err, data: RowDataPacket[]) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.status(409).json('User already exits!');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = 'INSERT INTO users(`username`, `email`, `password`) VALUES(?)';
    const values = [
      req.body.username,
      req.body.email,
      hash
    ];

    db.query(insertQuery, [values], (err) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created.');
    });
  });
};

export const login = (req: Request, res: Response) => {
  const query = 'SELECT * FROM users WHERE username = ?';

  db.query(query, [req.body.username], (err, data: RowDataPacket[]) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPasswordCorrect) return res.status(400).json('Wrong username or password');

    const token = jwt.sign({ id: data[0].id }, 'jwtkey');
    const { password, ...other } = data[0];

    console.log('login other info', other);

    res.cookie('access_token', token, {
      httpOnly: true
    }).status(200).json(other);
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token', {
    sameSite: 'none',
    secure: true
  }).status(200).json('User has been logged out.');
};
