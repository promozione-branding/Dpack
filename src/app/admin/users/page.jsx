"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Shield,
  Trash2,
} from "lucide-react";
import { adminAPI } from "@/lib/apiClient";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const limit = 20;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminAPI.listUsers({ page, limit });
      setUsers(res.users || []);
      setTotal(res.total);
    } catch (cause) {
      setError(cause.message || "Could not load users.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (user) => {
    if (
      !window.confirm(
        `Delete ${user.name || user.mobile}'s account? This cannot be undone. Their order history will be kept.`
      )
    ) {
      return;
    }

    setDeletingId(user._id);
    setError("");
    setNotice("");
    try {
      await adminAPI.deleteUser(user._id);
      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser._id !== user._id)
      );
      setTotal((currentTotal) => Math.max(0, currentTotal - 1));
      setNotice(`${user.name || "User"} was deleted.`);

      if (users.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      }
    } catch (cause) {
      setError(cause.message || "Could not delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">{total} registered users</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {notice}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <div className="divide-y divide-gray-50">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Users className="h-10 w-10 text-gray-300" />
            <p className="text-gray-500">
              {error ? "Could not load users" : "No users yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-4 py-3.5">Mobile</th>
                  <th className="px-4 py-3.5">Email</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">Joined</th>
                  <th className="px-4 py-3.5">Last Login</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50/60">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rust/10 text-sm font-bold text-rust">
                          {u.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <span className="font-medium text-gray-900">{u.name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-sm text-gray-700">{u.mobile}</td>
                    <td className="px-4 py-3.5 text-gray-500">{u.email || "—"}</td>
                    <td className="px-4 py-3.5">
                      {u.role === "admin" ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-rust/10 px-2.5 py-0.5 text-xs font-semibold text-rust">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          <UserCheck className="h-3 w-3" /> User
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">
                      {u.lastLoginAt
                        ? new Date(u.lastLoginAt).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(u)}
                        disabled={u.role === "admin" || deletingId !== null}
                        title={u.role === "admin" ? "Admin accounts cannot be deleted" : "Delete user"}
                        aria-label={`Delete ${u.name || u.mobile}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-700">{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
