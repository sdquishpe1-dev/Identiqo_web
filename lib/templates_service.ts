import { Template } from "../types/template";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function saveTemplate(template: Template): Promise<Template> {
  console.log(JSON.stringify(template));
  return await fetchWithAuth(`${API_URL}/templates`, {
    method: "POST",
    body: JSON.stringify(template),
  });

}

export async function getTemplates(): Promise<Template[]> {
  return await fetchWithAuth(`${API_URL}/templates/`, {
    method: "GET",
  });
}
