"use client";
import { motion } from "framer-motion";
import { Briefcase, FileText, CheckCircle } from "lucide-react";

export default function EmployeePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 font-sans">
      <motion.div
        className="max-w-5xl mx-auto bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/30 dark:border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          👨‍💼 Employee Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          Manage your daily expenses easily and efficiently.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <Briefcase className="h-10 w-10 mb-4 opacity-90" />
            <h2 className="text-xl font-semibold mb-2">Add New Expense</h2>
            <p className="opacity-90 text-sm">
              Submit a new expense with details and receipts.
            </p>
          </motion.div>

          <motion.div
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <FileText className="h-10 w-10 mb-4 opacity-90" />
            <h2 className="text-xl font-semibold mb-2">View Submissions</h2>
            <p className="opacity-90 text-sm">
              Check all your submitted expenses and their status.
            </p>
          </motion.div>

          <motion.div
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden sm:col-span-2 lg:col-span-1"
            whileHover={{ y: -5 }}
          >
            <CheckCircle className="h-10 w-10 mb-4 opacity-90" />
            <h2 className="text-xl font-semibold mb-2">Track Approvals</h2>
            <p className="opacity-90 text-sm">
              Monitor which expenses are approved or pending.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
