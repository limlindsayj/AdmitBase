import express from 'express';
import { db } from "../db/db-supabase.js";

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log('Request body:', req.body);

  try {
    const { data: user, error } = await db
      .from('student')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error', error });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.cookie('session', user.id, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 
    });

    res.json({
      message: 'Login successful!',
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
