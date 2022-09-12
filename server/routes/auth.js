import { Router } from "express";

import {
  login,
  me,
  register,
  drop,
  all,
  getUserById,
} from "../controllers/auth.js";
import { isAuth } from "../middleware/isAuth.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuth, me);
router.get("/all", all);
router.get("/get/:id", getUserById);
// router.get("/drop", drop);

export default router;
