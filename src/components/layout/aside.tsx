"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IoNewspaper } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

export default function Aside() {
  const { data: session, status } = useSession();

  return (
    <aside className="w-2/12 md:w-3/12 lg:w-1/4 px-2">
      <div className="bg-white dark:bg-slate-900 h-full rounded-xl shadow-md flex flex-col items-center py-4 px-2">
        {status === "loading" ? (
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-2"></div>
          </div>
        ) : status === "authenticated" ? (
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/user.png"
              alt="User"
              width={100}
              height={100}
              className="w-auto h-6 md:h-12 lg:h-24 rounded-full mb-2"
            />
            <h2 className="text-lg hidden md:block font-semibold text-gray-900 dark:text-white">
              {session?.user?.name}
            </h2>
            <p className="text-sm hidden md:block text-gray-600 dark:text-gray-400">
              {session?.user?.email}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 mt-4">
              <Link
                href="/write"
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-xs md:text-md"
              >
                <IoNewspaper className="inline-block mr-2" />
                <span className="hidden md:block">Escribir</span>
              </Link>
              <button
                className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded text-xs md:text-md"
                onClick={() => signOut()}
              >
                <IoLogOut className="inline-block mr-2" />
                <span className="hidden md:block">Cerrar sesión</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/logo.svg"
              alt="User"
              width={100}
              height={100}
              className="w-auto h-6 md:h-14 lg:h-24 rounded-full mb-4"
            />
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/auth/signin"
                className="cursor-pointer border border-slate-200 shadow-sm dark:border-0 bg-white dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 font-semibold py-2 px-4 rounded w-full"
              >
                Inicia sesión
              </Link>
              <span>o</span>
              <Link
                href="/auth/signup"
                className="cursor-pointer border border-slate-200 shadow-sm dark:border-0 bg-white dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 font-semibold py-2 px-4 rounded w-full"
              >
                Registrate
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
