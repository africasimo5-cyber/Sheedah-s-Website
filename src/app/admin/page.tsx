import AdminLoginForm from "./AdminLoginForm";

type AdminLoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#1A1A1A] px-6 py-16">
      <div className="mx-auto max-w-md rounded-xl border border-gray-800 bg-[#222222] p-8 shadow-2xl">
        <p className="text-center font-serif text-3xl font-semibold text-[#2AADA8]">
          Sheedah&apos;s Hair World
        </p>
        <h1 className="mt-6 text-center text-2xl font-semibold text-white">
          Admin Login
        </h1>
        <div className="mt-8">
          <AdminLoginForm error={searchParams?.error} />
        </div>
      </div>
    </section>
  );
}
