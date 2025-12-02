import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";


export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


// // utils/supabase-browser.ts
// import { createBrowserClient } from "@supabase/ssr";
// import { Database } from "@/types/supabase";

// export function createClient() {
//   return createBrowserClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! // or ANON key if still using
//   );
// }

