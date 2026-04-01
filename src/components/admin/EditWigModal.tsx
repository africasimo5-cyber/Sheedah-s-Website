"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import type { Wig } from "@/app/admin/dashboard/types";

type EditWigModalProps = {
  wig: Wig | null;
  onClose: () => void;
  onUpdated: (wig: Wig) => void;
};

const CATEGORY_OPTIONS = [
  "Straight",
  "Body Wave",
  "Deep Wave",
  "Curly",
  "Kinky",
  "Closure & Frontals",
] as const;

const LENGTH_OPTIONS = [
  '10"',
  '12"',
  '14"',
  '16"',
  '18"',
  '20"',
  '22"',
  '24"',
  '26"',
  '28"',
  '30"',
];

export default function EditWigModal({
  wig,
  onClose,
  onUpdated,
}: EditWigModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>(
    "Straight"
  );
  const [lengths, setLengths] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!wig) {
      return;
    }

    setName(wig.name);
    setCategory(
      CATEGORY_OPTIONS.includes(wig.category as (typeof CATEGORY_OPTIONS)[number])
        ? (wig.category as (typeof CATEGORY_OPTIONS)[number])
        : "Straight"
    );
    setLengths(wig.lengths);
    setPrice(wig.price ?? "");
    setDescription(wig.description ?? "");
    setInStock(wig.in_stock);
    setSelectedFile(null);
    setPreviewUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return null;
    });
  }, [wig]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  const canSubmit = useMemo(
    () => name.trim().length >= 3 && lengths.length > 0,
    [name, lengths]
  );

  const toggleLength = (value: string) => {
    setLengths((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!wig) {
      return;
    }
    if (name.trim().length < 3) {
      toast.error("Wig name must be at least 3 characters.");
      return;
    }
    if (!lengths.length) {
      toast.error("Select at least one available length.");
      return;
    }

    startTransition(async () => {
      const payload = new FormData();
      payload.append("name", name.trim());
      payload.append("category", category);
      payload.append("lengths", JSON.stringify(lengths));
      payload.append("price", price);
      payload.append("description", description);
      payload.append("inStock", String(inStock));
      payload.append("currentImageUrl", wig.image_url ?? "");
      if (selectedFile) {
        payload.append("imageFile", selectedFile);
      }

      const response = await fetch(`/api/admin/wigs/${wig.id}`, {
        method: "PUT",
        body: payload,
      });
      const result = await response.json();

      if (!result.success) {
        toast.error("Something went wrong. Try again.");
        return;
      }

      onUpdated(result.data);
      onClose();
      toast.success("Wig updated successfully!");
    });
  };

  return (
    <AnimatePresence>
      {wig ? (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-[60] h-screen w-full max-w-2xl overflow-y-auto bg-white p-5 shadow-2xl sm:p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Edit Wig</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close edit panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div {...getRootProps()} className="space-y-3">
                <input {...getInputProps()} />
                <p className="text-sm font-semibold text-gray-700">Image</p>
                <div className="rounded-lg border border-gray-200 p-3">
                  <img
                    src={previewUrl || wig.image_url || "/logo.jpg"}
                    alt={wig.name}
                    className="h-32 w-32 rounded-lg border border-gray-200 object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={open}
                  className="rounded-md border border-[#2AADA8] px-4 py-2 text-sm font-semibold text-[#2AADA8] transition hover:bg-[#2AADA8]/10"
                >
                  Replace Image
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#2AADA8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as (typeof CATEGORY_OPTIONS)[number])
                  }
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#2AADA8]"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">Lengths</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {LENGTH_OPTIONS.map((length) => {
                    const selected = lengths.includes(length);
                    return (
                      <button
                        key={length}
                        type="button"
                        onClick={() => toggleLength(length)}
                        className={`rounded-md border px-2 py-2 text-sm font-medium transition ${
                          selected
                            ? "border-[#2AADA8] bg-[#2AADA8] text-white"
                            : "border-[#2AADA8] bg-white text-[#2AADA8]"
                        }`}
                      >
                        {length}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#2AADA8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#2AADA8]"
                />
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-700">Stock Status</p>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={inStock}
                    onClick={() => setInStock((prev) => !prev)}
                    className={`relative h-7 w-14 rounded-full transition ${
                      inStock ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                        inStock ? "left-8" : "left-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-sm font-semibold ${
                      inStock ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending || !canSubmit}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#2AADA8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#24928e] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isPending ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </form>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
