import express from "express";
import { db } from "../db/db-supabase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const userId = req.cookies.session;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Please log in first." });
  }

  const {
    college,
    essay,
    major,
    gpa,
    status,
    yearApplied,
    additionalInfo,
    essayName,
  } = req.body;

  if (
    !college ||
    !essay ||
    !major ||
    !status ||
    !yearApplied ||
    !gpa ||
    !essayName
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  if (
    typeof yearApplied !== "number" ||
    yearApplied < 2000 ||
    yearApplied > 2100
  ) {
    return res.status(400).json({ message: "Invalid year applied." });
  }

  try {
    const { data: school, error: schoolError } = await db
      .from("school")
      .select("id")
      .ilike("name", college)
      .single();

    if (schoolError || !school) {
      console.error("School lookup error:", schoolError);
      return res.status(404).json({ message: "School not found." });
    }

    const { data: student, error: studentError } = await db
      .from("student")
      .select("id, additional_stats")
      .eq("id", userId)
      .single();

    if (studentError || !student) {
      console.error("Student lookup error:", studentError);
      return res.status(404).json({ message: "Student not found." });
    }

    const mergedAdditionalStats = `${additionalInfo || ""}`.trim();

    const { error: updateError } = await db
      .from("student")
      .update({
        gpa: gpa,
        additional_stats: mergedAdditionalStats,
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Student update error:", updateError);
      return res
        .status(500)
        .json({ message: "Failed to update student.", error: updateError });
    }

    const { data: application, error: applicationError } = await db
      .from("application")
      .insert([
        {
          student_id: userId,
          school_id: school.id,
          admit_status: status,
          major: major,
          year_applied: yearApplied,
          essay: essay,
          essay_name: essayName,
        },
      ])
      .select();

    if (applicationError) {
      console.error("Application insert error:", applicationError);
      return res.status(500).json({
        message: "Failed to submit application.",
        error: applicationError,
      });
    }

    res.status(201).json({
      message: "Application and Student information updated successfully!",
      application: application,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

export default router;
