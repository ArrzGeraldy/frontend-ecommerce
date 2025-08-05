export const refresh = async (): Promise<string> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh failed");
  const json = await res.json();
  return json.data.access_token;
};
