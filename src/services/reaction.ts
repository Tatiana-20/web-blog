export const CreateReaction = async (
  form: {
    postId: number;
    type: string;
  },
  token: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reactions`, {
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

export const GetAllReactions = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reactions`);
  const data = await response.json();
  return data;
};

export const GetReactionById = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reactions/${id}`
  );
  const data = await response.json();
  return data;
};

export const UpdateReaction = async (
  id: number,
  form: { type?: string },
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reactions/${id}`,
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

export const DeleteReaction = async (id: number, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reactions/${id}`,
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
