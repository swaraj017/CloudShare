import React from "react";
import { Link } from "react-router-dom";
import { Cloud, Lock, Zap, Download, Key, Search, ArrowRight, Star } from "lucide-react";

const LandPage = () => {
  const features = [
    {
      icon: <Cloud size={32} />,
      title: "Secure Cloud Storage",
      description: "Your files stored safely in Backblaze B2 cloud infrastructure",
    },
    {
      icon: <Lock size={32} />,
      title: "Full Access Control",
      description: "Toggle files between public and private in one click",
    },
    {
      icon: <Download size={32} />,
      title: "Easy Download",
      description: "Download your files anytime, from anywhere",
    },
    {
      icon: <Key size={32} />,
      title: "API Keys",
      description: "Programmatic access for your applications",
    },
    {
      icon: <Search size={32} />,
      title: "Quick Search",
      description: "Find your files instantly with real-time search",
    },
    {
      icon: <Zap size={32} />,
      title: "Lightning Fast",
      description: "Powered by Backblaze B2 CDN for optimal speed",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      storage: "400 MB",
      price: "Free",
      features: ["Upload & Download", "Public/Private access", "Search files", "API Keys", "Community support"],
      color: "gray",
      highlight: false,
    },
    {
      name: "Pro",
      storage: "10 GB",
      price: "$5",
      period: "/month",
      features: ["Everything in Free", "Priority support", "Advanced sharing", "SDK access", "Custom branding"],
      color: "cyan",
      highlight: true,
    },
    {
      name: "Business",
      storage: "100 GB",
      price: "$15",
      period: "/month",
      features: ["Everything in Pro", "Team collaboration", "Analytics dashboard", "24/7 support", "Custom domain"],
      color: "blue",
      highlight: false,
    },
  ];

  const comingSoonItems = [
    {
      title: "📦 Coming Soon Features",
      items: ["🗂️ File Folders & Organization", "📋 Bulk Operations", "🗑️ Trash/Recycle Bin", "⏰ File Versioning", "🔐 Advanced Sharing (Passwords, Expiry)"],
      bgGradient: "from-purple-900/20 to-indigo-900/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-300",
    },
     
    {
      title: "📦 NPM SDK Package",
      items: ["🚀 Zero-config Integration", "📝 Full TypeScript Support", "🔄 Real-time Sync", "⚡ Lightweight & Fast", "📚 Complete Documentation"],
      bgGradient: "from-green-900/20 to-emerald-900/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-300",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            CloudShare
          </h1>
          <div className="hidden md:flex gap-3">
  <Link
    to="/login"
    className="px-4 py-2 text-gray-300 hover:text-white transition"
  >
    Log In
  </Link>
  <Link
    to="/register"
    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition"
  >
    Register
  </Link>
</div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Your Files, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Your Control</span>
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Secure cloud file storage with full access control, API keys, and powerful features. 
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/register"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            Get Started Free <ArrowRight size={20} />
          </Link>
           
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Powerful Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition"
            >
              <div className="text-cyan-400 mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-4">Flexible Pricing</h3>
        <p className="text-gray-400 text-center mb-12">Choose the perfect plan for your needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-gray-900 border rounded-xl p-8 transition relative ${ plan.highlight ? "border-cyan-500 ring-2 ring-cyan-500/20" : "border-gray-800" }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star size={14} /> Most Popular
                </div>
              )}
              
              <h4 className={`text-2xl font-bold mb-2 ${plan.color === "cyan" ? "text-cyan-400" : plan.color === "blue" ? "text-blue-400" : "text-gray-400"}`}>
                {plan.name}
              </h4>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400">{plan.period}</span>}
              </div>
              <div className="text-2xl font-semibold text-gray-300 mb-6">{plan.storage}</div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-400 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${plan.color === "cyan" ? "bg-cyan-400" : "bg-gray-500"}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-semibold transition ${plan.highlight ? "bg-cyan-600 hover:bg-cyan-700 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"}`}>
                {plan.name === "Free" ? "Get Started" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="border-t border-gray-800 pt-16">
          <h3 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            <Zap size={32} className="text-yellow-400" /> Coming Soon
          </h3>
          <p className="text-gray-400 text-center mb-12">Exciting features launching soon</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comingSoonItems.map((item, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${item.bgGradient} border ${item.borderColor} rounded-xl p-6`}
              >
                <h4 className={`text-lg font-semibold mb-4 ${item.textColor}`}>{item.title}</h4>
                <ul className="space-y-2">
                  {item.items.map((feature, i) => (
                    <li key={i} className="text-gray-300 text-sm">✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-8">
          <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-gray-400 mb-8">Join thousands of users storing files securely in the cloud.</p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition"
          >
            Start Your Free Account Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 CloudShare. All rights reserved.  </p>
        </div>
      </footer>
    </div>
  );
};

export default LandPage;
