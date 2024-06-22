import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/Supabase";

const supabase = createClient<Database>(
  "https://ebewmigszlpbhizvkuob.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZXdtaWdzemxwYmhpenZrdW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwMTcyNTEsImV4cCI6MjAzNDU5MzI1MX0.gE9LpLnkXt2lFRIEty3QCMeZi6rTVgd-3PpeHOiRWFA"
);

export default supabase;
