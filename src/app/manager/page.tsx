"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, ThumbsUp, XCircle, FileSpreadsheet } from "lucide-react";

type Approval = {
  id: string;
  date: string;
  ref: string;
  employee: string;
  category: string;
  amount: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
};

const sampleApprovals: Approval[] = [
  {
    id: "a-001",
    date: "2025-09-28",
    ref: "REF-001",
    employee: "Druvika Rajpara",
    category: "Travel",
    amount: 15.5,
    reason: "Taxi to client",
    status: "Pending",
  },
  {
    id: "a-002",
    date: "2025-09-25",
    ref: "REF-005",
    employee: "Rahul Sharma",
    category: "Meals",
    amount: 30.0,
    reason: "Client lunch",
    status: "Pending",
  },
];

export default function ManagerPage() {
  const [items, setItems] = useState<Approval[]>(sampleApprovals);
  const [selected, setSelected] = useState<Approval | null>(null);

  function handleDecision(id: string, decision: "Approved" | "Rejected") {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, status: decision } : it)));
    if (selected?.id === id) setSelected((s) => (s ? { ...s, status: decision } : s));
  }

  function approveAllVisible() {
    setItems((s) => s.map((it) => (it.status === "Pending" ? { ...it, status: "Approved" } : it)));
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Manager — Approvals</h2>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Review expense submissions and approve / reject them.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={approveAllVisible}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-lg"
              >
                <ThumbsUp className="w-4 h-4" /> Approve all pending
              </button>
              <button
                onClick={() => {
                  const csv = ["Date,Ref,Employee,Category,Amount,Status"]
                    .concat(items.map((r) => `${r.date},${r.ref},${r.employee},${r.category},${r.amount},${r.status}`))
                    .join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "approvals.csv";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
              >
                <FileSpreadsheet className="w-4 h-4" /> Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase">
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Ref</th>
                  <th className="pb-3 pr-4">Employee</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4 text-right">Amount</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr key={row.id} className="border-t last:border-b hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="py-3 pr-4 text-sm">{row.date}</td>
                    <td className="py-3 pr-4 text-sm">{row.ref}</td>
                    <td className="py-3 pr-4 text-sm">{row.employee}</td>
                    <td className="py-3 pr-4 text-sm">{row.category}</td>
                    <td className="py-3 pr-4 text-sm text-right">₹{row.amount.toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-sm rounded-full font-medium ${
                          row.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : row.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelected(row)}
                          className="px-3 py-1 rounded-lg border text-sm"
                        >
                          View
                        </button>

                        {row.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleDecision(row.id, "Approved")}
                              className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDecision(row.id, "Rejected")}
                              className="px-3 py-1 rounded-lg border text-sm text-red-600"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {row.status !== "Pending" && (
                          <button
                            onClick={() => setItems((s) => s.map((it) => (it.id === row.id ? { ...it, status: "Pending" } : it)))}
                            className="px-3 py-1 rounded-lg border text-sm"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-500">
                      No approvals in queue.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right: Selected detail panel */}
        <aside className="sticky top-8 self-start">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[420px] bg-white dark:bg-slate-800 rounded-2xl shadow p-6 border border-white/30 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Approvals</h4>
                <p className="text-sm text-slate-500 dark:text-slate-300">Click any row to view the full details.</p>
              </div>
            </div>

            {selected ? (
              <div className="space-y-3">
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="font-medium">Ref</span>
                    <span>{selected.ref}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Employee</span>
                    <span>{selected.employee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Category</span>
                    <span>{selected.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Amount</span>
                    <span>₹{selected.amount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="rounded-lg p-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm">
                  <strong>Reason:</strong>
                  <p className="mt-2 text-slate-700 dark:text-slate-300">{selected.reason}</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => handleDecision(selected.id, "Approved")} className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg">
                    <ThumbsUp className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => handleDecision(selected.id, "Rejected")} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-red-600">
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>

                <div className="text-xs text-slate-500">Status: <span className="font-medium">{selected.status}</span></div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">
                Select an item to view details. Use Approve / Reject to update status.
              </div>
            )}
          </motion.div>
        </aside>
      </div>
    </main>
  );
}
