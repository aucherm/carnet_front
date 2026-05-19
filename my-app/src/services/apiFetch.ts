const apiFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  return response;
};

export default apiFetch;