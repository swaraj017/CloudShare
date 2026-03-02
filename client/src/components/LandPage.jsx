import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Cloud, Lock, Zap, Download, Key, Search,
  ArrowRight, Star, Check, Menu, X, Github, Linkedin, Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const features = [
  { icon: <Cloud size={22} />, title: "Secure Cloud Storage", description: "Enterprise-grade  encrypted storage built for teams and creators.", color: "from-purple-500/20 to-purple-600/5" },
  { icon: <Lock size={22} />, title: "Granular Permissions", description: "Fine-grained control over file access — per user, per team, per link.", color: "from-cyan-500/20 to-cyan-600/5" },
  { icon: <Search size={22} />, title: "Instant Search", description: "Full-text indexed file discovery across your entire storage in milliseconds.", color: "from-emerald-500/20 to-emerald-600/5" },
];

const pricingPlans = [
  {
    name: "Free", price: "$0", period: "forever", storage: "400 MB",
    desc: "Perfect for personal projects and trying things out.",
    features: ["Upload & Download", "Public / Private Files", "Basic Search", "API Access"],
    highlight: false, cta: "Get Started Free",
  },
  {
    name: "Pro", price: "$5", period: "/month", storage: "10 GB",
    desc: "For creators and freelancers who need more room to grow.",
    features: ["Everything in Free", "Priority Support", "Advanced Sharing", "Custom Branding", "Version History"],
    highlight: true, cta: "Start Pro Trial",
  },
  {
    name: "Business", price: "$15", period: "/month", storage: "100 GB",
    desc: "Built for teams that move fast and need full control.",
    features: ["Everything in Pro", "Team Workspaces", "Usage Analytics", "24/7 Support", "SSO & Audit Logs"],
    highlight: false, cta: "Start Business Trial",
  },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "200+", label: "CDN Locations" },
  { value: "50K+", label: "Developers" },
  { value: "2B+", label: "Files Served" },
];

const LandPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-[#030712] text-white overflow-hidden min-h-screen">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[700px] h-[700px] bg-purple-700/25 blur-[180px] rounded-full -top-60 -left-40" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[180px] rounded-full -bottom-40 -right-40" />
        <div className="absolute w-[400px] h-[400px] bg-pink-600/10 blur-[140px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/30 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Cloud size={15} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">CloudShare</span>
          </div>

           

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition px-4 py-2">Log in</Link>
            <Link to="/register" className="text-sm px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold hover:opacity-90 transition hover:scale-[1.02]">
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.06] bg-black/60 backdrop-blur-2xl"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm">
                {["Features", "Pricing", "Docs", "Blog"].map(l => (
                  <a key={l} href="#" className="text-gray-400 hover:text-white transition">{l}</a>
                ))}
                <Link to="/register" className="text-center py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold">
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <motion.section variants={container} initial="hidden" animate="visible"
        className="max-w-5xl mx-auto px-6 pt-28 pb-24 text-center">
        

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
          The future of<br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            cloud storage
          </span>
        </motion.h1>

        <motion.p variants={item} className="mt-7 text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
          Secure. Fast. Developer-first. Built for modern teams, creators, and the apps they ship.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link to="/register" className="group px-8 py-3.5 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:scale-[1.03] transition shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            Start for Free <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
           
        </motion.div>

        <motion.div variants={item} className="mt-14 flex items-center justify-center gap-6 flex-wrap text-xs text-gray-500">
          {["No credit card needed", "Free plan forever", "Setup in 60 seconds"].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <Check size={13} className="text-green-400" /> {t}
            </span>
          ))}
        </motion.div>
      </motion.section>

       

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-4 block">Features</span>
          <h2 className="text-4xl font-bold tracking-tight">Why teams choose CloudShare</h2>
          <p className="mt-4 text-gray-400 max-w-md mx-auto">Everything you need to store, share, and scale — without the overhead.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
              className="group relative p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-purple-500/30 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-purple-400 group-hover:text-purple-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 text-[15px]">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4 block">Comming-soon Pricing</span>
          <h2 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="mt-4 text-gray-400">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {pricingPlans.map((plan, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.12 }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.highlight
                  ? "border-purple-500/60 bg-gradient-to-b from-purple-950/60 to-black/60 scale-[1.03] shadow-[0_0_60px_rgba(168,85,247,0.15)]"
                  : "border-white/[0.07] bg-white/[0.025] hover:border-white/15"
              }`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  <Star size={11} fill="white" /> Most Popular
                </div>
              )}
              <div className="mb-1 text-sm font-semibold text-gray-400">{plan.name}</div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              <div className="text-purple-400 text-sm font-medium mb-3">{plan.storage} Storage</div>
              <p className="text-gray-500 text-sm mb-7 leading-relaxed">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-purple-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full text-sm font-semibold transition hover:scale-[1.02] ${
                plan.highlight
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90 shadow-[0_4px_20px_rgba(168,85,247,0.35)]"
                  : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
              }`}>{plan.cta}</button>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-xs mt-10">All plans include SSL, API access, and our standard SLA. No hidden fees.</p>
      </section>

      {/* CTA BAND */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/[0.06]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-cyan-900/30 border border-white/10 px-10 py-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]" />
          <div className="relative">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Ready to get started?</h2>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">Join 50,000+ developers and teams already on CloudShare.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:scale-[1.03] transition shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Create Free Account <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Cloud size={12} className="text-white" />
            </div>
            <span className="text-gray-400 font-medium">CloudShare</span>
          </div>
          <span>© {new Date().getFullYear()} CloudShare. All rights reserved.</span>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Security"].map(l => (
              <a key={l} href="#" className="hover:text-gray-300 transition">{l}</a>
            ))}
            <a href="https://github.com/swaraj017" className="hover:text-gray-300 transition"><Github size={16} /></a>
            <a href="https://linkedin.com/in/Gaikwad-Swaraj" className="hover:text-gray-300 transition"><Linkedin size={16} /></a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandPage;
