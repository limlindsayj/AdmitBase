import { Router } from "express";

// import { keysToCamel } from "../common/utils";
import { db } from "../db/db-supabase.js";

export const schoolRouter = Router();

schoolRouter.get("/", async (req, res) => {
    try {
        const { data, error } = await db
          .from('school')
          .select('*');
        
        if (error) {
          throw error;
        }
    
        res.status(200).json(data);
      } catch (err) {
        res.status(500).send(err.message);
      }
  });