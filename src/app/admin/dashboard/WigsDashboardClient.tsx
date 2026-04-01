"use client";

import { useMemo, useState, useTransition } from "react";
import { Pencil, RefreshCw, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import EditWigModal from "@/components/admin/EditWigModal";
import { deleteWigAction, toggleWigStockAction } from "./wigs-actions";
import {
  CATEGORY_OPTIONS,
  type CategoryFilter,
  type StockFilter,
  type Wig,
} from "./types";

type WigsDashboardClientProps = {
  initialWigs: Wig[];
};

function getCategoryStyles(category: string): string {
  const map: Record<string, string> = {
    Straight: "bg-sky-100 text-sky-700",
    "Body Wave": "bg-purple-100 text-purple-700",
    "Deep Wave": "bg-indigo-100 text-indigo-700",
    Curly: "bg-pink-100 text-pink-700",
    Kinky: "bg-amber-100 text-amber-700",
    "Closure & Frontals": "bg-emerald-100 text-emerald-700",
  };

  return map[category] ?? "bg-gray-100 text-gray-700";
}

export default function WigsDashboardClient({
  initialWigs,
}: WigsDashboardClientProps) {
  const [wigs, setWigs] = useState<Wig[]>(initialWigs);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [editingWig, setEditingWig] = useState<Wig | null>(null);
  const [deletingWig, setDeletingWig] = useState<Wig | null>(null);
  const [busyWigId, setBusyWigId] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const stats = useMemo(() => {
    const total = wigs.length;
    const inStock = wigs.filter((wig) => wig.in_stock).length;
    const outOfStock = total - inStock;
    const categoryCount = new Set(wigs.map((wig) => wig.category)).size;

    return [
      { label: "Total Wigs", value: total },
      { label: "In Stock", value: inStock },
      { label: "Out of Stock", value: outOfStock },
      { label: "Total Categories", value: categoryCount },
    ];
  }, [wigs]);

  const filteredWigs = useMemo(() => {
    return wigs.filter((wig) => {
      const matchesSearch = wig.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || wig.category === categoryFilter;

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in_stock" && wig.in_stock) ||
        (stockFilter === "out_of_stock" && !wig.in_stock);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [wigs, query, categoryFilter, stockFilter]);

  const handleToggleStock = async (wig: Wig) => {
    setBusyWigId(wig.id);
    const result = await toggleWigStockAction(wig.id, !wig.in_stock);
    setBusyWigId(null);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    setWigs((prev) =>
      prev.map((item) => (item.id === wig.id ? result.data : item))
    );
    toast.success(result.message);
  };

  const handleDeleteConfirm = () => {
    if (!deletingWig) {
      return;
    }

    startDeleteTransition(async () => {
      const result = await deleteWigAction(deletingWig.id);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setWigs((prev) => prev.filter((wig) => wig.id !== deletingWig.id));
      setDeletingWig(null);
      toast.success(result.message);
    });
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-lg border border-gray-200 border-l-4 border-l-[#2AADA8] bg-white p-4 shadow-sm"
          >
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
          </article>
        ))}
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search wigs by name..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#2AADA8]"
          />

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value as CategoryFilter)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#2AADA8]"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            {[
              { label: "All", value: "all" as const },
              { label: "In Stock", value: "in_stock" as const },
              { label: "Out of Stock", value: "out_of_stock" as const },
            ].map((option) => {
              const active = stockFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStockFilter(option.value)}
                  className={`rounded-md px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    active
                      ? "bg-[#2AADA8] text-white"
                      : "border border-gray-300 bg-white text-gray-600 hover:border-[#2AADA8] hover:text-[#2AADA8]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Lengths</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWigs.map((wig) => {
                const isBusy = busyWigId === wig.id;
                return (
                  <tr key={wig.id} className="text-sm text-gray-700">
                    <td className="px-4 py-3">
                      <img
                        src={wig.image_url || "/logo.jpg"}
                        alt={wig.name}
                        className="h-[50px] w-[50px] rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {wig.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getCategoryStyles(
                          wig.category
                        )}`}
                      >
                        {wig.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {wig.lengths.map((length) => (
                          <span
                            key={`${wig.id}-${length}`}
                            className="rounded-full bg-[#2AADA8]/10 px-2 py-1 text-xs font-medium text-[#2AADA8]"
                          >
                            {length}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">{wig.price || "-"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          wig.in_stock
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {wig.in_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingWig(wig)}
                          className="rounded-md p-2 text-[#2AADA8] transition hover:bg-[#2AADA8]/10"
                          aria-label={`Edit ${wig.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStock(wig)}
                          disabled={isBusy}
                          className="rounded-md p-2 text-orange-500 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
                          aria-label={`Toggle stock for ${wig.name}`}
                        >
                          <RefreshCw
                            className={`h-4 w-4 ${isBusy ? "animate-spin" : ""}`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingWig(wig)}
                          className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
                          aria-label={`Delete ${wig.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        {filteredWigs.map((wig) => {
          const isBusy = busyWigId === wig.id;
          return (
            <article
              key={wig.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <img
                  src={wig.image_url || "/logo.jpg"}
                  alt={wig.name}
                  className="h-[50px] w-[50px] rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{wig.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getCategoryStyles(
                        wig.category
                      )}`}
                    >
                      {wig.category}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        wig.in_stock
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {wig.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {wig.lengths.map((length) => (
                  <span
                    key={`${wig.id}-mobile-${length}`}
                    className="rounded-full bg-[#2AADA8]/10 px-2 py-1 text-xs font-medium text-[#2AADA8]"
                  >
                    {length}
                  </span>
                ))}
              </div>

              <p className="mt-2 text-sm text-gray-600">
                Price: <span className="font-medium text-gray-900">{wig.price || "-"}</span>
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingWig(wig)}
                  className="rounded-md p-2 text-[#2AADA8] transition hover:bg-[#2AADA8]/10"
                  aria-label={`Edit ${wig.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleStock(wig)}
                  disabled={isBusy}
                  className="rounded-md p-2 text-orange-500 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label={`Toggle stock for ${wig.name}`}
                >
                  <RefreshCw className={`h-4 w-4 ${isBusy ? "animate-spin" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingWig(wig)}
                  className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
                  aria-label={`Delete ${wig.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {!filteredWigs.length ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          No wigs match your current filters.
        </div>
      ) : null}

      <EditWigModal
        wig={editingWig}
        onClose={() => setEditingWig(null)}
        onUpdated={(updated) =>
          setWigs((prev) =>
            prev.map((wig) => (wig.id === updated.id ? updated : wig))
          )
        }
      />

      {deletingWig ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">Delete Wig</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{deletingWig.name}</span>
              ? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingWig(null)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
