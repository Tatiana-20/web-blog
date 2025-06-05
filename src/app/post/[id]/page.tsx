"use client";
import React, { useEffect, useState } from "react";
import { GetPostById } from "@/services/post";
import { CreateReaction, DeleteReaction } from "@/services/reaction";
import { CreateComment } from "@/services/comment";
import { useSession } from "next-auth/react";
import { PostReaction } from "@/common/enum/post-reaction";
import Alert from "@/components/errors/alert";
import { useParams } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    lastname: string;
  };
  slug: string;
  reactions: {
    id: number;
    type: PostReaction;
    user: {
      id: number;
    };
  }[];
  comments: {
    id: number;
    content: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      lastname: string;
    };
  }[];
}

export default function PostDetail() {
  const params = useParams();
  const postId = parseInt(params.id as string);

  const { data: session, status } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);
  const [reactionError, setReactionError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (isNaN(postId)) {
        setError("ID de post inválido.");
        setLoading(false);
        return;
      }

      try {
        const response = await GetPostById(postId);
        if (response) {
          setPost(response);
        } else {
          setError("Post no encontrado.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Ocurrió un error al cargar el post.");
        } else {
          setError("Ocurrió un error desconocido al cargar el post.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleReaction = async (type: PostReaction) => {
    if (status !== "authenticated" || !session?.user?.id) {
      setReactionError("Debes iniciar sesión para reaccionar.");
      return;
    }

    setReactionError(null);
    try {
      const existingReaction = post?.reactions?.find(
        (r) => r.user.id === parseInt(session.user.id) && r.type === type
      );

      if (existingReaction) {
        await DeleteReaction(
          existingReaction.id,
          session.user.accessToken as string
        );
        setPost((prevPost) => {
          if (!prevPost) return null;
          return {
            ...prevPost,
            reactions: (prevPost.reactions || []).filter(
              (r) => r.id !== existingReaction.id
            ),
          };
        });
      } else {
        const response = await CreateReaction(
          { postId, type },
          session.user.accessToken as string
        );
        if (response) {
          setPost((prevPost) => {
            if (!prevPost) return null;
            return {
              ...prevPost,
              reactions: [...(prevPost.reactions || []), response],
            };
          });
        } else {
          setReactionError("Error al añadir la reacción.");
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setReactionError(err.message || "Error al procesar la reacción.");
      } else {
        setReactionError("Error desconocido al procesar la reacción.");
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "authenticated" || !session?.user?.id) {
      setCommentError("Debes iniciar sesión para comentar.");
      return;
    }
    if (!commentContent.trim()) {
      setCommentError("El comentario no puede estar vacío.");
      return;
    }

    setCommentError(null);
    try {
      const response = await CreateComment(
        {
          content: commentContent,
          postId,
        },
        session.user.accessToken as string
      );
      if (response) {
        setPost((prevPost) => {
          if (!prevPost) return null;
          return {
            ...prevPost,
            comments: [...prevPost.comments, response],
          };
        });
        setCommentContent("");
      } else {
        setCommentError("Error al añadir el comentario.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setCommentError(err.message || "Error al añadir el comentario.");
      } else {
        setCommentError("Error desconocido al añadir el comentario.");
      }
    }
  };

  const getReactionCounts = () => {
    const counts: Record<PostReaction, number> = {
      [PostReaction.LIKE]: 0,
      [PostReaction.LOVE]: 0,
      [PostReaction.HAHA]: 0,
      [PostReaction.WOW]: 0,
      [PostReaction.SAD]: 0,
      [PostReaction.ANGRY]: 0,
    };
    post?.reactions?.forEach((reaction) => {
      counts[reaction.type]++;
    });
    return counts;
  };

  const reactionCounts = getReactionCounts();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mr-2"></div>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Cargando post...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400 text-lg">
        Post no encontrado.
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {post.title}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Por {post.author.name} {post.author.lastname} el {formattedDate}
      </p>
      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>{post.content}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Reacciones
        </h3>
        {reactionError && (
          <Alert
            message={reactionError}
            type="alert"
          />
        )}
        <div className="flex gap-2 flex-wrap">
          {Object.values(PostReaction).map((type) => (
            <button
              key={type}
              onClick={() => handleReaction(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                post.reactions?.some(
                  (r) =>
                    r.user?.id === parseInt(session?.user?.id || "") &&
                    r.type === type
                ) || false
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
              disabled={status === "loading"}
            >
              {type} ({reactionCounts[type]})
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Comentarios
        </h3>
        {commentError && (
          <Alert
            message={commentError}
            type="alert"
          />
        )}
        {status === "authenticated" ? (
          <form
            onSubmit={handleCommentSubmit}
            className="mb-6"
          >
            <textarea
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Escribe tu comentario aquí..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={!commentContent.trim()}
            >
              Publicar Comentario
            </button>
          </form>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Inicia sesión para dejar un comentario.
          </p>
        )}

        {post.comments?.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No hay comentarios aún. Sé el primero en comentar.
          </p>
        ) : (
          <div className="space-y-4">
            {post.comments?.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {comment.user.name} {comment.user.lastname}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(comment.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
