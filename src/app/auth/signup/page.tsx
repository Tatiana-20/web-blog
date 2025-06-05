"use client";
import Alert from "@/components/errors/alert";
import Input from "@/components/ui/input";
import { SignUp } from "@/services/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export default function Signup() {
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
    const response = await SignUp(data);
    if (response.statusCode === 201) {
      reset();
      setError(null);
      setSuccess(response.message);
      return;
    }
    setError(response.message || "Ocurrió un error desconocido.");
    setLoading(false);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
        setLoading(false);
        router.push("/auth/signin");
      }, 3000);
    }
  }, [success, router]);

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
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div className="col-span-2 flex gap-x-2">
          <Input
            label="Nombre"
            name="name"
            type="text"
            placeholder="John Doe"
            autoComplete="off"
            register={register}
            options={{
              required: "El nombre es requerido",
            }}
            error={errors.name?.message}
          />
          <Input
            label="Apellido"
            name="lastname"
            type="text"
            placeholder="Doe"
            autoComplete="off"
            register={register}
            options={{
              required: "El apellido es requerido",
            }}
            error={errors.lastname?.message}
          />
        </div>
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
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                message:
                  "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial",
              },
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
                Registrando...
              </div>
            ) : (
              "Registrarse"
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
