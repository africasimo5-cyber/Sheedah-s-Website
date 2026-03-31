import { MessageCircle } from "lucide-react";

interface ProductCardProps {
  name: string;
  category: string;
  image: string;
  lengths: string[];
}

export default function ProductCard({ name, category, image, lengths }: ProductCardProps) {
  const whatsappMsg = `Hi Sheedah, I'm interested in ${name}. Can you send me pricing?`;
  const whatsappUrl = `https://wa.me/2347030599735?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-white border border-dark/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-t-[3px] hover:border-t-primary transition-all duration-300 flex flex-col group h-full">
      {/* Product Image */}
      <div className="relative aspect-[4/5] bg-lightbg overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
          {category}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-heading font-bold text-black mb-3">{name}</h3>
        
        <div className="mb-6 flex-grow">
          <p className="text-xs uppercase tracking-wider text-black/60 font-semibold mb-2">Available Lengths</p>
          <div className="flex flex-wrap gap-2">
            {lengths.map((len, idx) => (
              <span 
                key={idx}
                className="text-xs font-sans font-medium px-2 py-1 bg-primary/15 text-primary rounded-sm border border-primary/20"
              >
                {len}
              </span>
            ))}
          </div>
        </div>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-white font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-[#c9126a] transition-all cursor-pointer shadow-md"
        >
          <MessageCircle size={18} />
          <span>Order via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
