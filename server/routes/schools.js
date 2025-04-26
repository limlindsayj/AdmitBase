import { Router } from "express";
import { db } from "../db/db-supabase.js";

export const schoolRouter = Router();

schoolRouter.get('/', async (req, res) => {
    try {
        const { data, error } = await db
          .from('school')
          .select('name');
        
        if (error) {
          throw error;
        }
    
        res.status(200).json(data);
      } catch (err) {
        res.status(500).send(err.message);
      }
  });

  schoolRouter.get('/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const { data, error } = await db
        .from('school')
        .select('*')
        .eq('name', name);
      if (error) {
        throw error;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });