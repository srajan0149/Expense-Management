"use client";
import { useState } from "react";
import Card from "@/components/Card";

interface Request {
  id: number;
  ref: string;
  employee: string;
  category: string;
  amount: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function AdminPage() {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      ref: "REF-001",
      employee: "Druvika Rajpara",
      category: "Travel",
      amount: 15.5,
      reason: "Taxi to client",
      status: "Pending",
    },
    {
      id: 2,
      ref: "REF-005",
      employee: "Rahul Sharma",
      category: "Meals",
      amount: 30.0,
      reason: "Team lunch",
      status: "Pending",
    },
  ]);

  const approveAll = () =>
    setRequests((prev) =>
      prev.map((r) => ({ ...r, status: "Approved" }))
    );

  const handleAction = (id: number, status: "Approved" | "Rejected") =>
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Table */}
      <Card
        title="Manager — Approvals"
        className="flex-1"
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-textMuted text-sm">
            Review expense submissions and approve / reject them.
          </p>
          <div className="flex gap-2">
            <button
              onClick={approveAll}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
            >
              👍 Approve all pending
            </button>
            <button className="border border-borderColor px-4 py-2 rounded-lg hover:bg-gray-100">
              📄 Export
            </button>
          </div>
        </div>

        <table className="w-full text-sm border-t border-borderColor">
          <thead>
            <tr className="text-left text-gray-500 border-b border-borderColor">
              <th className="p-2">DATE</th>
              <th className="p-2">REF</th>
              <th className="p-2">EMPLOYEE</th>
              <th className="p-2">CATEGORY</th>
              <th className="p-2">AMOUNT</th>
              <th className="p-2">STATUS</th>
              <th className="p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-borderColor">
                <td className="p-2">2025-09-28</td>
                <td className="p-2">{r.ref}</td>
                <td className="p-2">{r.employee}</td>
                <td className="p-2">{r.category}</td>
                <td className="p-2">₹{r.amount.toFixed(2)}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      r.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : r.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleAction(r.id, "Approved")}
                    className="bg-primary text-white px-3 py-1 rounded-lg text-sm hover:bg-emerald-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(r.id, "Rejected")}
                    className="bg-danger text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Right Details */}
      <Card title="Approvals" className="w-full lg:w-[400px]">
        <p className="text-sm text-textMuted mb-4">
          Click any row to view the full details.
        </p>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Ref</span>
            <span className="font-medium">REF-001</span>
          </div>
          <div className="flex justify-between">
            <span>Employee</span>
            <span className="font-medium">Druvika Rajpara</span>
          </div>
          <div className="flex justify-between">
            <span>Category</span>
            <span className="font-medium">Travel</span>
          </div>
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="font-medium">₹15.50</span>
          </div>

          <div className="mt-4">
            <p className="font-medium mb-1">Reason:</p>
            <textarea
              disabled
              className="w-full border border-borderColor rounded-lg p-2 text-gray-700 bg-gray-50 resize-none"
              rows={2}
              value="Taxi to client"
            />
          </div>

          <div className="flex justify-between mt-5">
            <button className="bg-primary text-white px-5 py-2 rounded-lg flex items-center gap-1 hover:bg-emerald-700">
              👍 Approve
            </button>
            <button className="bg-white border border-danger text-danger px-5 py-2 rounded-lg flex items-center gap-1 hover:bg-red-50">
              ❌ Reject
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Status: <span className="text-yellow-600 font-medium">Pending</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
