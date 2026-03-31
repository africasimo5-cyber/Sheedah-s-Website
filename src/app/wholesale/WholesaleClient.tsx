"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Truck, HeartHandshake, ShieldCheck, ChevronDown } from "lucide-react";

export default function Wholesale() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    phoneNumber: "",
    hairType: "",
    quantity: ""
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Sheedah's Hair World! I would like to make a wholesale inquiry.\n\n*Full Name:* ${formData.fullName}\n*Business Name:* ${formData.businessName || 'N/A'}\n*Phone:* ${formData.phoneNumber}\n*Hair Type Needed:* ${formData.hairType}\n*Quantity Needed:* ${formData.quantity}`;
    const url = `https://wa.me/2347030599735?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-secondary" />,
      title: "Competitive Pricing",
      desc: "Best bulk prices maximizing your profit margins."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
      title: "Consistent Quality",
      desc: "Zero shedding. Zero tangling. Top grade hair in every single order."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-secondary" />,
      title: "Dedicated Support",
      desc: "Priority customer service scaling alongside your business."
    },
    {
      icon: <Truck className="w-8 h-8 text-secondary" />,
      title: "Fast Shipping",
      desc: "Expedited nationwide & tracked international delivery."
    }
  ];

  const faqs = [
    {
      q: "What is the minimum order quantity?",
      a: "Our Wholesale MOQ starts at just 10 bundles or 3 wigs, making it highly accessible for both new startups and established salons."
    },
    {
      q: "Do you offer payment on delivery?",
      a: "For bulk wholesale orders, we require payment clearance upfront due to the volume of the supplies. We accept Bank Transfers, Western Union, and WorldRemit."
    },
    {
      q: "How long does delivery take?",
      a: "Nationwide orders in Nigeria arrive within 1-3 business days. International wholesale shipments take 4-7 business days globally via DHL or FedEx."
    },
    {
      q: "Can I mix different textures in one order?",
      a: "Absolutely! You can mix and match various lengths, textures, and frontal types to hit your 10-bundle or 3-wig MOQ requirement."
    },
    {
      q: "Do you ship internationally for wholesale orders?",
      a: "Yes, we ship worldwide. We partner with reliable couriers to ensure fast, secure, and fully tracked customs-cleared delivery to your country."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Section 1 — Hero */}
      <section className="bg-primary pt-32 pb-24 px-4 text-center border-b border-white/10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-heading font-bold text-white mb-6"
        >
          Buy in Bulk, <span className="italic">Save More</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/90 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Join hundreds of hair business owners who trust Sheedah&apos;s for their reliable, premium wholesale supply.
        </motion.p>
      </section>

      {/* Section 2 — Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border-l-4 border-l-secondary p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group"
            >
              <div className="bg-secondary/10 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-heading font-bold text-dark mb-3">{item.title}</h3>
              <p className="text-dark/70 font-sans text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-lightbg py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Section 3 — Inquiry Form */}
        <section>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-primary/20 p-8 md:p-12 rounded-xl shadow-sm"
          >
            <h2 className="text-3xl font-heading font-bold text-dark mb-2">Make a Wholesale Enquiry</h2>
            <p className="text-dark/60 font-sans text-sm mb-8">Fill out the details below and we&apos;ll get back to you immediately.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-dark uppercase tracking-wider">Full Name *</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-lightbg/50 border border-primary/30 rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors font-sans text-dark" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-dark uppercase tracking-wider">Business Name</label>
                  <input name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full bg-lightbg/50 border border-primary/30 rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors font-sans text-dark" placeholder="Jane's Luxury Hairs" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-dark uppercase tracking-wider">Phone Number *</label>
                <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full bg-lightbg/50 border border-primary/30 rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors font-sans text-dark" placeholder="+234 ..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-dark uppercase tracking-wider">Hair Type Needed *</label>
                <input required name="hairType" value={formData.hairType} onChange={handleInputChange} className="w-full bg-lightbg/50 border border-primary/30 rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors font-sans text-dark" placeholder="e.g. Bone Straight, Deep Wave Mix" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-dark uppercase tracking-wider">Quantity Needed *</label>
                <input required name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full bg-lightbg/50 border border-primary/30 rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors font-sans text-dark" placeholder="e.g. 20 bundles & 5 closures" />
              </div>

              <button 
                type="submit"
                className="w-full bg-secondary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-sm hover:bg-[#c9126a] transition-all shadow-md mt-4"
              >
                Send Enquiry via WhatsApp
              </button>
            </form>
          </motion.div>
        </section>

        {/* Section 4 — FAQ Accordion */}
        <section>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold text-dark mb-8 border-b-4 border-primary pb-2 inline-block">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className={`border border-primary/20 bg-white rounded-lg overflow-hidden shadow-sm transition-all ${openFaq === index ? 'border-l-4 border-l-primary' : ''}`}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-heading font-bold text-lg text-dark">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-primary" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-black/70 font-sans text-sm leading-relaxed border-t border-gold/10">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        </div>
      </section>
    </div>
  );
}
