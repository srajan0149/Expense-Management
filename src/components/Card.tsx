import React from "react";

export default function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-card border border-borderColor rounded-xl shadow-soft p-6 ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-textMain">{title}</h2>
      )}
      {children}
    </div>
  );
}
