import { Router } from "express";
import { db } from "../db/db-supabase.js";

export const applicationRouter = Router();

applicationRouter.get('/school/:school', async (req, res) => {
    try {
        const { school } = req.params;

        const {data, error} = await db
            .from(`school`)
            .select(`application(*, student(name, gpa, additional_stats))`)
            .ilike('name', school);

        if (error) {
            throw error;
        }
        
        res.status(200).json(data);
      } catch (err) {
        res.status(500).send(err.message);
      }
  });

applicationRouter.get('/major/:major', async (req, res) => {
    try {
        const major = req.params.major;
        const { data, error } = await db
            .from('application') 
            .select(`*, student(name, gpa, additional_stats)`)
            .ilike('major', major);
        if (error) {
            throw error;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

applicationRouter.get('/all', async (req, res) => {
    try {
      const { data, error } = await db
        .from('application')
        .select('*, student(name, gpa, additional_stats)'); 
  
      if (error) throw error;
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });