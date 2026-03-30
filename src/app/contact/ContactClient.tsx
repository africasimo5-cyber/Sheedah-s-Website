"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Instagram } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Sheedah's Hair World,\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n\n*Message:* ${formData.message}`;
    const url = `https://wa.me/2347030599735?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      
      {/* Section 1 — Hero */}
      <section className="bg-black pt-32 pb-24 px-4 text-center border-b border-gold/20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-heading font-bold text-cream mb-6"
        >
          Let&apos;s <span className="text-gold italic">Connect</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-cream/80 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Have a question about our collections or a custom order? Reach out to us below.
        </motion.p>
      </section>

      {/* Section 2 — Contact Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column — Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-heading font-bold text-black mb-8 border-b-2 border-gold pb-2 inline-block">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-black/80 font-sans">
                  <div className="p-3 bg-gold/10 rounded-full shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Store</h4>
                    <p>No 17a Alamutu Street, Alamutu Estate,<br />Fagba, Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-black/80 font-sans">
                  <div className="p-3 bg-gold/10 rounded-full shrink-0">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Business Hours</h4>
                    <p>Monday – Saturday<br />9:00am – 6:00pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-black/80 font-sans">
                  <div className="p-3 bg-gold/10 rounded-full shrink-0">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">WhatsApp & Call</h4>
                    <a href="https://wa.me/2347030599735" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-block mt-1">
                      +234 703 059 9735
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-black/80 font-sans">
                  <div className="p-3 bg-gold/10 rounded-full shrink-0">
                    <Instagram className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Social Media</h4>
                    <a href="https://www.instagram.com/sheedahsbeautyworld2/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-block mt-1">
                      @sheedahsbeautyworld2
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embedded */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-gold/20">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15852.126588151239!2d3.3159958316104273!3d6.643333420489973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93f1dd4cb4ef%3A0xcda6ef9a8f40176!2sFagba%2C%20Lagos!5e0!3m2!1sen!2sng!4v1714486333909!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Sheedah's Beauty World Location"
              />
            </div>
          </motion.div>

          {/* Right Column — Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white border border-gold/20 p-8 md:p-12 rounded-xl shadow-lg sticky top-32">
              <h2 className="text-3xl font-heading font-bold text-black mb-2">Send Us a Message</h2>
              <p className="text-black/60 font-sans text-sm mb-8 leading-relaxed">Fill out the form below and we will get back to you immediately via WhatsApp.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-black uppercase tracking-wider">Full Name *</label>
                  <input 
                    required 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full bg-cream border border-gold/30 rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors font-sans text-black" 
                    placeholder="Enter your name" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-black uppercase tracking-wider">Phone Number *</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="w-full bg-cream border border-gold/30 rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors font-sans text-black" 
                    placeholder="WhatsApp number" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-black uppercase tracking-wider">Message *</label>
                  <textarea 
                    required 
                    name="message" 
                    rows={5}
                    value={formData.message} 
                    onChange={handleInputChange} 
                    className="w-full bg-cream border border-gold/30 rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors font-sans text-black resize-none" 
                    placeholder="How can we help you today?" 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold text-black font-bold uppercase tracking-widest text-sm py-4 rounded-sm hover:bg-gold/90 transition-all shadow-md mt-4"
                >
                  Send Message via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
