const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(email: string, password: string) {
  const res = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al registrar");
  }

  return data;
}


export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message ||"Credenciales inválidas");
  }

  return data;
}

export async function loginGoogle(response:any){
  const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: response.credential,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
    throw new Error(data.message ||"Error de Acceso con Google");
  }
return data;
}

