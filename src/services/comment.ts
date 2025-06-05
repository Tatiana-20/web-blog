export const CreateComment = async (
  form: {
    content: string;
    postId: number;
  },
  token: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
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

export const GetAllComments = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`);
  const data = await response.json();
  return data;
};

export const GetCommentById = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`
  );
  const data = await response.json();
  return data;
};

export const UpdateComment = async (
  id: number,
  form: { content?: string },
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
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

export const DeleteComment = async (id: number, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
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
