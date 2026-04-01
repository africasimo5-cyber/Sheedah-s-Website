"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { adminLoginAction } from "./actions";

type AdminLoginFormProps = {
  error?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#2AADA8] px-4 py-3 font-semibold text-white transition hover:bg-[#24928e] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export default function AdminLoginForm({ error }: AdminLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error === "incorrect-password") {
      toast.error("Incorrect password");
    }
  }, [error]);

  return (
    <form action={adminLoginAction} className="space-y-5">
      <div>
        <label htmlFor="password" className="mb-2 block text-sm text-gray-300">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="w-full rounded-md border border-gray-700 bg-[#111111] px-4 py-3 pr-12 text-white outline-none transition focus:border-[#2AADA8]"
            placeholder="Enter admin password"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
