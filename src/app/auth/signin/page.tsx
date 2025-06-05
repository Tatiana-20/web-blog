"use client";
import Alert from "@/components/errors/alert";
import Input from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const [error, setError] = useState<string | string[] | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      setSuccess(null);
    } else {
      reset();
      setError(null);
      setSuccess("Sesión iniciada con éxito.");
      router.push("/");
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
        setLoading(false);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  }, [error]);

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4"
      >
        <div className="col-span-2">
          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="tu@ejemplo.com"
            register={register}
            options={{
              required: "El correo electrónico es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo electrónico inválido",
              },
            }}
            error={errors.email?.message}
          />
        </div>
        <div className="col-span-2">
          <Input
            label="Contraseña"
            name="password"
            type="password"
            placeholder="********"
            register={register}
            error={errors.password?.message}
            options={{
              required: "La contraseña es requerida",
            }}
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full mb-2 cursor-pointer select-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Iniciando sesión...
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </div>
        {error && (
          <div className="col-span-2 flex gap-y-1 flex-col">
            {Array.isArray(error) ? (
              error.map((message, index) => (
                <Alert
                  key={index}
                  message={message}
                  type="alert"
                />
              ))
            ) : (
              <Alert
                message={error}
                type="alert"
              />
            )}
          </div>
        )}
        {success && (
          <div className="col-span-2 flex gap-y-1 flex-col">
            <Alert
              message={success}
              type="success"
              onClose
            />
          </div>
        )}
      </form>
    </div>
  );
}
