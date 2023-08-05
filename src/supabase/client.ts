import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bsbyvpjvytmqwzcsukpa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzYnl2cGp2eXRtcXd6Y3N1a3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0OTU4OTcsImV4cCI6MjAwNjA3MTg5N30.eemGBraivpI5-R4zANcfn_-dSPecwBnuIvpUQQMmqbc"
);
