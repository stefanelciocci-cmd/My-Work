"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, Mail, MapPin, Clock, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";
import { useMouseParallax } from "@/hooks/use-parallax";

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMouseParallax(0.02);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden" id="contact">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.14 45 / 0.06) 0%, transparent 70%)",
            y,
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.12 165 / 0.06) 0%, transparent 70%)",
            x: -mousePos.x * 2,
            y: -mousePos.y * 2,
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Let&apos;s{" "}
            <span className="relative inline-block">
              <span className="text-primary">Collaborate</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s create
            something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            style={{
              x: mousePos.x * 0.3,
              y: mousePos.y * 0.3,
            }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you have a question, want to start a project, or just want
                to connect, feel free to reach out. I&apos;m always open to discussing
                new projects, creative ideas, or opportunities.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "stefanelciocci@gmail.com", href: "mailto:stefanelciocci@gmail.com", color: "#f9a875" },
                { icon: MapPin, label: "Location", value: "Timisoara, Romania", color: "#7dd3a8" },
                { icon: Clock, label: "Availability", value: "Open to opportunities", color: "#f9a875" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 group"
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Connect with me
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/stefan-ciocirlan-a99b16205/", color: "#7dd3a8" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    whileHover={{ y: -4, borderColor: social.color, boxShadow: `0 0 20px ${social.color}20` }}
                    className="w-14 h-14 bg-card/50 backdrop-blur-sm border border-border rounded-2xl flex items-center justify-center transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              x: -mousePos.x * 0.3,
              y: mousePos.y * 0.3,
            }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10"
              whileHover={{ borderColor: "oklch(0.78 0.14 45 / 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Send className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h4 className="text-2xl font-bold mb-3 text-foreground">Message Sent!</h4>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <motion.button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    whileHover={{ scale: 1.05 }}
                    className="text-primary hover:underline font-medium"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-6">
                    {[
                      { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                      { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-sm font-medium text-foreground mb-3"
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.id]: e.target.value })
                          }
                          required
                          className="w-full px-5 py-4 bg-background/50 border border-border rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                    
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-3"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        rows={5}
                        className="w-full px-5 py-4 bg-background/50 border border-border rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none text-foreground placeholder-muted-foreground"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <>
                        Send Message
                        <ArrowUpRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
