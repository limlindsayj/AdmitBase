import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPA_URL, process.env.SUPA_KEY);

export const db = supabase;
