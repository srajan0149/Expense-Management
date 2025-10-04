import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Expense Manager",
  description: "Expense approval and tracking dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-lightBg text-textMain min-h-screen">
        {/* Navbar */}
        <nav className="bg-card border-b border-borderColor shadow-soft py-3 px-8 flex justify-between items-center">
          <h1 className="font-semibold text-xl text-primary">
            Expense Manager
          </h1>
          <div className="space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link href="/login" className="hover:text-primary transition">
              Login
            </Link>
            <Link href="/signup" className="hover:text-primary transition">
              Signup
            </Link>
            <Link href="/admin" className="hover:text-primary transition">
              Admin
            </Link>
          </div>
        </nav>

        <main className="p-10">{children}</main>
      </body>
    </html>
  );
}
