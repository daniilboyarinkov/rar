import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "wrong";

// Token Service?
const generateToken = (id, secret, expires = "30d") =>
  jwt.sign(
    {
      id,
    },
    secret,
    { expiresIn: "30d" }
  );

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const candidate = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (candidate) {
      if (candidate.email === email)
        throw createHttpError(
          400,
          `Пользователь с Email ${email} уже существует!`
        );
      if (candidate.name === username)
        throw createHttpError(
          400,
          `Пользователь с именем ${username} уже существует!`
        );
    }

    const salt = bcrypt.genSaltSync(7);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    const token = generateToken(newUser._id, JWT_SECRET);

    await newUser.save();

    return res.json({
      newUser,
      token,
      message: "Регистрация прошла успешна",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      throw createHttpError(400, `Пользователя ${email} не существует!`);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      throw createHttpError(400, `Неверный логин или пароль`);

    const token = generateToken(user._id, JWT_SECRET);

    return res.json({
      user,
      token,
      message: "Вход успешно завершен",
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) throw createHttpError(400, `Такого пользователя не существует!`);

    const token = generateToken(user._id, JWT_SECRET);

    return res.json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const all = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users.length) throw createHttpError(400, "Пользователей нет...");
    return res.json({
      length: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw createHttpError(400, "Такого пользователя нет");
    return res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const drop = async (req, res, next) => {
  try {
    await User.deleteMany({});

    return res.json({
      message: "ВСе пользователи успешно удалены!",
    });
  } catch (error) {
    next(error);
  }
};
