import express,{Router} from "express";
import { webhookHandler } from "../controllers/webhookController.js";


const router = Router();
router.post("/:flowid", webhookHandler);
export default router;