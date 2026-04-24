import { createClient } from '@insforge/sdk';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const insforgeAnonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

const insforge = createClient({
  baseUrl: insforgeUrl || "",
  anonKey: insforgeAnonKey || ""
});

async function run() {
  const { data, error } = await insforge.database.from('entries').select('*').limit(1);
  console.log(data);
}
run();
