"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/errors/alert";
import { ActivateAccount } from "@/services/auth";

export default function Activate({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | string[] | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const activate = async () => {
      if (!params.token) {
        setError("Token de activación no proporcionado.");
        setLoading(false);
        return;
      }

      try {
        const response = await ActivateAccount(params.token);
        if (response.statusCode === 200) {
          setSuccess(response.message);
        } else {
          setError(response.message || "Ocurrió un error desconocido.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Ocurrió un error al activar la cuenta.");
        } else {
          setError("Ocurrió un error desconocido al activar la cuenta.");
        }
      } finally {
        setLoading(false);
      }
    };

    activate();
  }, [params.token]);

  const handleRedirectToSignIn = () => {
    router.push("/auth/signin");
  };

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Activando cuenta...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="w-full">
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

        {!loading && success && (
          <div className="w-full flex flex-col items-center">
            <Alert
              message={success}
              type="success"
            />
            <button
              onClick={handleRedirectToSignIn}
              className="mt-4 w-full cursor-pointer select-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
