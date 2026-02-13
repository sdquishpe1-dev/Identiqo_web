import { Template } from './../types/template';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
 export async function saveTemplate(template:Template){
    const res= await fetch(
    `${API_URL}/template`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template }),
    }
  );
 }