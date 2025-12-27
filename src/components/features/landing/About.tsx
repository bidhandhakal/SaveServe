import Link from "next/link";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        About Page
        <Link href="/"> Go back home</Link>
      </h1>
    </div>
  );
}
