export const CreatePost = async (
  form: {
    title: string;
    content: string;
    status: string;
  },
  token: string
) => {
  console.log(form);
  console.log(token);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });
  const data = await response.json();
  return data;
};

export const GetAllPosts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const data = await response.json();
  return data;
};

export const GetPostById = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
  );
  const data = await response.json();
  return data;
};

export const UpdatePost = async (
  id: number,
  form: { title?: string; content?: string; status?: string },
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    }
  );
  const data = await response.json();
  return data;
};

export const DeletePost = async (id: number, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
