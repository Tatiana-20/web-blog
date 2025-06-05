import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-t-slate-200 dark:border-t-slate-800 py-4">
      <div className="mx-auto text-center text-sm text-slate-500/60 dark:text-slate-500/70">
        <p>
          &copy; {new Date().getFullYear()} Tati Blog. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
