"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

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

export default function AddWigPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>(
    "Straight"
  );
  const [lengths, setLengths] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isPending) {
      return;
    }

    setProgress(8);
    const timer = window.setInterval(() => {
      setProgress((prev) => (prev < 88 ? prev + 6 : prev));
    }, 220);

    return () => window.clearInterval(timer);
  }, [isPending]);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  const canSubmit = useMemo(
    () => Boolean(selectedFile) && name.trim().length >= 3 && lengths.length > 0,
    [selectedFile, name, lengths]
  );

  const toggleLength = (value: string) => {
    setLengths((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload an image.");
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
      payload.append("imageFile", selectedFile);

      const response = await fetch("/api/admin/wigs", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();

      if (!result.success) {
        setProgress(100);
        toast.error("Something went wrong. Try again.");
        setTimeout(() => setProgress(0), 450);
        return;
      }

      setProgress(100);
      toast.success("Wig added successfully!");
      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 450);
    });
  };

  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700">
            Image Upload <span className="text-red-500">*</span>
          </p>
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-5 text-center transition ${
              isDragActive
                ? "border-[#2AADA8] bg-[#2AADA8]/10"
                : "border-gray-300 hover:border-[#2AADA8]"
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-sm text-gray-600">
              Drag and drop an image here, or click to select (JPG, JPEG, PNG,
              WEBP)
            </p>
          </div>

          {previewUrl ? (
            <div className="mt-3">
              <img
                src={previewUrl}
                alt="Wig preview"
                className="h-32 w-32 rounded-lg border border-gray-200 object-cover"
              />
            </div>
          ) : null}

          {isPending ? (
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-[#2AADA8] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Uploading image...</p>
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Wig Name <span className="text-red-500">*</span>
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Brazilian Body Wave"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#2AADA8]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Category <span className="text-red-500">*</span>
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
          <p className="mb-2 text-sm font-semibold text-gray-700">
            Available Lengths <span className="text-red-500">*</span>
          </p>
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
            placeholder="e.g. ₦45,000 or Contact for price"
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
            placeholder="Brief description of this wig..."
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
          {isPending ? "Adding..." : "Add Wig"}
        </button>

        <Link
          href="/admin/dashboard"
          className="block text-center text-sm font-medium text-gray-600 transition hover:text-[#2AADA8]"
        >
          Cancel
        </Link>
      </form>
    </section>
  );
}
