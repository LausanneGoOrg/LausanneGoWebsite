import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vjytomrpbvxefyiflxjn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqeXRvbXJwYnZ4ZWZ5aWZseGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzA4NjAsImV4cCI6MjA1NTY0Njg2MH0.NrWxaHFJELUaZpj3PTdZwwtXntSzI0kYTojUxMiHyCY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
