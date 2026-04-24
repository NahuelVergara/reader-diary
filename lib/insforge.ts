import { createClient } from '@insforge/sdk';

const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const insforgeAnonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

if (!insforgeUrl || !insforgeAnonKey) {
  console.warn("Faltan las variables de entorno de InsForge.");
}

export const insforge = createClient({
  baseUrl: insforgeUrl || "",
  anonKey: insforgeAnonKey || ""
});
