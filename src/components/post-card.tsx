import Link from "next/link";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    lastname: string;
  };
  slug?: string;
}

export default function PostCard({
  id,
  title,
  content,
  createdAt,
  author,
}: PostCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const truncateContent = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Por {author.name} {author.lastname} el {formattedDate}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {truncateContent(content, 150)}
      </p>
      <Link
        href={`/post/${id}`}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Ver Post Completo
      </Link>
    </div>
  );
}
