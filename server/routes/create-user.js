import express from "express";
import { db } from "../db/db-supabase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const { data: existingUser, error: findError } = await db
      .from("student")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const { data: newUser, error: insertError } = await db
      .from("student")
      .insert([
        {
          name: name,
          email: email,
          password: password
        },
      ])
      .select();

    if (insertError) {
      console.error("Signup insert error:", insertError);
      return res
        .status(500)
        .json({ message: "Failed to create user.", error: insertError });
    }

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
      },
    });
  } catch (err) {
    console.error("Signup server error:", err);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

export default router;
