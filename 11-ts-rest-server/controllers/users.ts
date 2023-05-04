import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({
    users,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(400).json({
      msg: `User with ID: ${id} is not found`,
    });
  }

  res.json({
    user,
  });
};

const validateExist = async (email: String) => {
  const exist = await User.findOne({
    where: {
      email,
    },
  });

  return exist;
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const data = {
    name,
    email,
  };

  try {
    const isDuplicated = await validateExist(email);

    if (isDuplicated) {
      return res.status(400).json({
        msg: `The email: ${email} is already recorded with other user`,
      });
    }

    const user = await User.create(data);
    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error: ${error}`,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const data = {
    name,
    email,
  };

  try {
    const exist = await User.findByPk(id);

    if (!exist) {
      return res.status(400).json({
        msg: `User with ID: ${id} is not found`,
      });
    }

    const user = await User.update(data, {
      where: {
        id,
      },
    });

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error: ${error}`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await User.findByPk(id);

    if (!exist) {
      return res.status(400).json({
        msg: `User with ID: ${id} is not found`,
      });
    }

    const user = await User.update({ status: false }, {
      where: {
        id,
      },
    });

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error: ${error}`,
    });
  }
};