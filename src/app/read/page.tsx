"use client";
import Alert from "@/components/errors/alert";
import Input from "@/components/ui/input";
import { CreatePost } from "@/services/post";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

interface FormData {
  title: string;
  content: string;
}

export default function CreatePostPage() {
  const { data: session, status } = useSession();
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
    if (
      status !== "authenticated" ||
      !session?.user?.id ||
      !session?.user?.accessToken
    ) {
      setError("Debes iniciar sesión para crear un post.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await CreatePost(
        {
          title: data.title,
          content: data.content,
          status: "PUBLISHED",
        },
        session.user.accessToken
      );

      if (response.id) {
        reset();
        setSuccess("Post creado con éxito.");
      } else {
        setError(
          response.message || "Ocurrió un error desconocido al crear el post."
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Ocurrió un error al crear el post.");
      } else {
        setError("Ocurrió un error desconocido al crear el post.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 w-full"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white col-span-full text-center">
          Crear Nuevo Post
        </h1>
        <div className="col-span-full">
          <Input
            label="Título"
            name="title"
            type="text"
            placeholder="Título de tu post"
            autoComplete="off"
            register={register}
            options={{
              required: "El título es requerido",
            }}
            error={errors.title?.message}
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Contenido
          </label>
          <textarea
            id="content"
            rows={10}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe el contenido de tu post aquí..."
            {...register("content", {
              required: "El contenido es requerido",
            })}
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full mb-2 cursor-pointer select-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading || status !== "authenticated"}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Publicando...
              </div>
            ) : (
              "Publicar Post"
            )}
          </button>
        </div>
        {error && (
          <div className="col-span-full flex gap-y-1 flex-col">
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
          <div className="col-span-full flex gap-y-1 flex-col">
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
