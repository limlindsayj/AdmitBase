import { Router } from "express";
import { db } from "../db/db-supabase.js";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export const applicationRouter = Router();

async function summarizeEssay(essay) {
  if (!essay) return "No essay provided.";

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: `Only give the five keywords in a sentence:\n${essay}` }] }],
  });

  return response?.text || "No summary generated.";
}

applicationRouter.get('/school/:school', async (req, res) => {
  try {
    const { school } = req.params;

    const { data, error } = await db
      .from('school')
      .select('application(*, student(name, gpa, additional_stats))')
      .ilike('name', school);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).send('No school found.');
    }

    const applications = data[0]?.application || [];

    // Summarize all essays
    const summaries = await Promise.all(
      applications.map(async (app) => {
        const summary = await summarizeEssay(app.essay);
        return { ...app, essay_summary: summary };
      })
    );

    res.status(200).json({
      school: data[0],
      applications: summaries
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

applicationRouter.get('/major/:major', async (req, res) => {
  try {
    const { major } = req.params;

    const { data, error } = await db
      .from('application')
      .select('*, student(name, gpa, additional_stats)')
      .ilike('major', major);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).send('No applications found.');
    }

    // Summarize all essays
    const summaries = await Promise.all(
      data.map(async (app) => {
        const summary = await summarizeEssay(app.essay);
        return { ...app, essay_summary: summary };
      })
    );

    res.status(200).json(summaries);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
