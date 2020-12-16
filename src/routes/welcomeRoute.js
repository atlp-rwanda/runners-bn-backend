import { Router } from "express";
import { Response } from "../helpers/sendResponse";
const router = Router();

router.get("/", (_req, res) =>
  Response.success(res, 200, "Welcome to barefoot nomand")
);

export default router;
