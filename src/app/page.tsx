import { Metadata } from "next";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import HomeClient from "./HomeClient";

type HomeCategory = {
  name: string;
  image: string;
};

type Testimonial = {
  text: string;
  author: string;
};

const categoryPlaceholders: HomeCategory[] = [
  { name: "Straight", image: "/wigs/straight-hair-1.jpg" },
  { name: "Body Wave", image: "/wigs/body-wave-1.jpg" },
  { name: "Deep Wave", image: "/wigs/body-wave-3.jpg" },
  { name: "Curly", image: "/wigs/curly-hair-1.jpg" },
  { name: "Kinky", image: "/wigs/curly-hair-3.jpg" },
  { name: "Closure & Frontals", image: "/wigs/straight-hair-4.jpg" },
];

const fallbackTestimonials: Testimonial[] = [
  {
    text: "Sheedah's hair is absolutely premium. I've been a loyal customer for 2 years!",
    author: "Amaka T., Abuja",
  },
  {
    text: "Best wholesale supplier in Lagos. Fast delivery and great prices every time.",
    author: "Beauty by Zara, Port Harcourt",
  },
  {
    text: "I ordered from the UK and got my package in 5 days. Incredible service!",
    author: "Titi M., London",
  },
];

async function getCategoryCards(): Promise<HomeCategory[]> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return categoryPlaceholders;
  }

  const updated = await Promise.all(
    categoryPlaceholders.map(async (category) => {
      const { data } = await supabase
        .from("wigs")
        .select("image_url")
        .eq("category", category.name)
        .eq("in_stock", true)
        .order("created_at", { ascending: false })
        .limit(1);

      const image = data?.[0]?.image_url || category.image;

      return { ...category, image };
    })
  );

  return updated;
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      return fallbackTestimonials;
    }

    const { data, error } = await supabase
      .from("testimonials")
      .select("text, author")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error || !data?.length) {
      return fallbackTestimonials;
    }

    return data as Testimonial[];
  } catch {
    return fallbackTestimonials;
  }
}

export const metadata: Metadata = {
  title: "Sheedah's Hair World | Home",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, testimonials] = await Promise.all([
    getCategoryCards(),
    getTestimonials(),
  ]);

  return <HomeClient categories={categories} testimonials={testimonials} />;
}
