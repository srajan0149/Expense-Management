"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, FileText, Calendar, Tag, DollarSign, User } from "lucide-react";

type Expense = {
  id: string;
  date: string;
  ref: string;
  description: string;
  category: string;
  paidBy: string;
  amount: number;
  status: "Draft" | "Submitted" | "Approved" | "Rejected" | "Pending";
};

const initialExpenses: Expense[] = [
  {
    id: "e-001",
    date: "2025-09-28",
    ref: "REF-001",
    description: "Taxi to client site",
    category: "Travel",
    paidBy: "Employee",
    amount: 15.5,
    status: "Submitted",
  },
  {
    id: "e-002",
    date: "2025-09-26",
    ref: "REF-002",
    description: "Lunch with client",
    category: "Meals",
    paidBy: "Employee",
    amount: 28,
    status: "Approved",
  },
];

export default function EmployeePage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [form, setForm] = useState({
    description: "",
    category: "Travel",
    amount: "",
    paidBy: "Employee",
  });

  function openNew() {
    setEditing(null);
    setForm({ description: "", category: "Travel", amount: "", paidBy: "Employee" });
    setShowForm(true);
  }

  function openEdit(exp: Expense) {
    setEditing(exp);
    setForm({
      description: exp.description,
      category: exp.category,
      amount: String(exp.amount),
      paidBy: exp.paidBy,
    });
    setShowForm(true);
  }

  function submitForm() {
    if (!form.description || !form.amount) return;
    if (editing) {
      setExpenses((s) =>
        s.map((x) =>
          x.id === editing.id
            ? { ...x, description: form.description, category: form.category, amount: Number(form.amount), paidBy: form.paidBy, status: "Submitted" }
            : x
        )
      );
    } else {
      const newExp: Expense = {
        id: `e-${Math.random().toString(36).slice(2, 9)}`,
        date: new Date().toISOString().slice(0, 10),
        ref: `REF-${Math.floor(Math.random() * 900 + 100)}`,
        description: form.description,
        category: form.category,
        paidBy: form.paidBy,
        amount: Number(form.amount),
        status: "Submitted",
      };
      setExpenses((s) => [newExp, ...s]);
    }
    setShowForm(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        {/* Left: Table */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Employee — Expenses</h2>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                All your expense submissions and their current status.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openNew}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:brightness-95 transition"
                aria-label="Add expense"
              >
                <Plus className="w-4 h-4" />
                New Expense
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase">
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Ref</th>
                  <th className="pb-3 pr-4">Description</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Paid By</th>
                  <th className="pb-3 pr-4 text-right">Amount</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp.id} className="border-t last:border-b hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="py-3 pr-4 text-sm text-slate-700 dark:text-slate-200">{exp.date}</td>
                    <td className="py-3 pr-4 text-sm text-slate-700 dark:text-slate-200">{exp.ref}</td>
                    <td className="py-3 pr-4 text-sm text-slate-700 dark:text-slate-200">{exp.description}</td>
                    <td className="py-3 pr-4 text-sm text-slate-700 dark:text-slate-200">{exp.category}</td>
                    <td className="py-3 pr-4 text-sm text-slate-700 dark:text-slate-200">{exp.paidBy}</td>
                    <td className="py-3 pr-4 text-sm text-right text-slate-800 dark:text-white">₹{exp.amount.toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-sm rounded-full font-medium ${
                          exp.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : exp.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : exp.status === "Submitted"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(exp)}
                          className="text-sm px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            setExpenses((s) => s.map((x) => (x.id === exp.id ? { ...x, status: "Draft" } : x)))
                          }
                          className="text-sm px-3 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Revert
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {expenses.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-500">
                      No expenses yet. Click <strong>New Expense</strong> to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right: Detail / form panel */}
        <aside className="sticky top-8 self-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[420px] bg-white dark:bg-slate-800 rounded-2xl shadow p-6 border border-white/30 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">Submit a new expense or check recent ones.</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 mb-2">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Today</span>
                  <span className="text-slate-800 dark:text-white font-medium">₹{expenses.reduce((a, b) => a + b.amount, 0).toFixed(2)}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total submitted expenses</div>
              </div>

              <div className="flex gap-3">
                <button onClick={openNew} className="flex-1 inline-flex items-center justify-center gap-2 border rounded-lg px-4 py-2 bg-slate-900 text-white">
                  <Plus className="w-4 h-4" /> New
                </button>
                <button
                  onClick={() => {
                    // simple export csv example
                    const csv = ["Date,Ref,Description,Category,PaidBy,Amount,Status"]
                      .concat(expenses.map((e) => `${e.date},${e.ref},"${e.description}",${e.category},${e.paidBy},${e.amount},${e.status}`))
                      .join("\n");
                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "expenses.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200"
                >
                  Export
                </button>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <motion.form
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.14 }}
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-white/30 dark:border-slate-700"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{editing ? "Edit Expense" : "New Expense"}</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white">Close</button>
            </div>

            <div className="grid gap-3">
              <label className="text-sm">
                Description
                <input
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent border-slate-200 dark:border-slate-700"
                  required
                />
              </label>

              <div className="grid sm:grid-cols-3 gap-3">
                <label className="text-sm">
                  Category
                  <select
                    value={form.category}
                    onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent border-slate-200 dark:border-slate-700"
                  >
                    <option>Travel</option>
                    <option>Meals</option>
                    <option>Supplies</option>
                    <option>Accommodation</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="text-sm">
                  Paid By
                  <select
                    value={form.paidBy}
                    onChange={(e) => setForm((s) => ({ ...s, paidBy: e.target.value }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent border-slate-200 dark:border-slate-700"
                  >
                    <option>Employee</option>
                    <option>Company</option>
                  </select>
                </label>

                <label className="text-sm">
                  Amount
                  <input
                    value={form.amount}
                    onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))}
                    type="number"
                    step="0.01"
                    className="mt-1 w-full rounded-lg border px-3 py-2 bg-transparent border-slate-200 dark:border-slate-700"
                    required
                  />
                </label>
              </div>

              <div className="flex gap-3 mt-4">
                <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white">Submit</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setExpenses((s) => s.filter((x) => x.id !== (editing?.id ?? "")));
                      setShowForm(false);
                    }}
                    className="ml-auto text-sm px-3 py-2 rounded-lg border text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      )}
    </main>
  );
}
