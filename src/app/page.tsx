"use client";
import { useEffect, useState } from "react";
import PostCard from "@/components/post-card";
import { GetAllPosts } from "@/services/post";

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
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await GetAllPosts();
        if (response) {
          setPosts(response);
        } else {
          setError("No se pudieron cargar los posts.");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Ocurrió un error al cargar los posts.");
        } else {
          setError("Ocurrió un error desconocido al cargar los posts.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mr-2"></div>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Cargando posts...
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

  return (
    <div className="w-full">
      {posts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          No hay posts disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              author={post.author}
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
