"use client";

const GoLogin = () => {
  window.location.href = "/login";
};

export default function Home() {
  return (
    <div className="relative flex-1 h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Logo or Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6">
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              OCP Group
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl md:text-2xl text-emerald-100 font-light max-w-2xl mx-auto">
            Leading the future of sustainable phosphate and fertilizer solutions
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-white font-semibold text-lg mb-2">Analytics</h3>
            <p className="text-emerald-100/80 text-sm">
              Real-time production insights
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-3">🏭</div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Production
            </h3>
            <p className="text-emerald-100/80 text-sm">
              Monitor all operations
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-white font-semibold text-lg mb-2">Inventory</h3>
            <p className="text-emerald-100/80 text-sm">Track stock levels</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={GoLogin}
          className="cursor-pointer group relative px-12 py-5 bg-white text-emerald-900 rounded-2xl font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Login
            <svg
              className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>

        {/* Footer Info */}
        <div className="absolute bottom-8 text-center">
          <p className="text-emerald-100/60 text-sm">
            Powered by OCP Innovation • Secure Access Portal
          </p>
        </div>
      </div>
    </div>
  );
}
