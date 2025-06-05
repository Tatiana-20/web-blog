export const SignUp = async (form: {
  name: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );
  const data = await response.json();
  return data;
};

export const Login = async (form: { email: string; password: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );
  const data = await response.json();
  return data;
};

export const ActivateAccount = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/activate/${token}`
  );
  const data = await response.json();
  return data;
};

export const RequestPasswordRecovery = async (form: { email: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/password-recovery`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );
  const data = await response.json();
  return data;
};

export const ResetPassword = async (
  token: string,
  form: { password: string }
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/password-recovery/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );
  const data = await response.json();
  return data;
};

export const RefreshToken = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token/${token}`
  );
  const data = await response.json();
  return data;
};
