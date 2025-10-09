"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authAPI } from "@/lib/api";

export default function LoginPage() {
  const [hidePassword, setHidePassword] = useState(true);
  const [windowSize, setWindowSize] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const infoLogin = {
    title: "Interface Supply Chain",
    subtitle:
      "Visualiser les résultats du modèle d’optimisation des plannings de production",
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await authAPI.login(email, password);
      console.log("Login successful:", data);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        className="hidden lg:block flex-1 h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/OcpImage.png')" }}
      ></div>

      <div className="relative bg-secondary flex-1 h-full items-center justify-center flex flex-col">
        <div
          className="absolute right-10 top-10 w-16 h-16 xl:w-20 xl:h-20 bg-contain bg-no-repeat"
          style={{ backgroundImage: "url('/LogoOcp.png')" }}
        ></div>

        <div
          className={`w-full h-full ${
            windowSize > 390 ? "p-16" : "p-10"
          } sm:p-20 flex flex-col gap-10 justify-center`}
        >
          <div className="flex flex-col gap-2 ">
            <h1
              className={`${
                windowSize > 500 ? "text-3xl" : "text-2xl"
              } xl:text-4xl font-bold`}
            >
              {infoLogin.title}
            </h1>
            <h1
              className={`${
                windowSize > 500 ? "text-lg" : "text-sm"
              } xl:text-xl font-light`}
            >
              {infoLogin.subtitle}
            </h1>
          </div>

          <div className="w-full flex flex-col gap-6">
            <h1 className="text-xl xl:text-2xl font-bold">Sign In</h1>

            <div className="flex flex-col gap-2">
              <div className="w-full">
                <h1 className="text-sm font-light">Email or phone number</h1>
                <input
                  type="text"
                  placeholder="Enter your email or phone number"
                  className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:primary text-sm xl:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="w-full relative">
                <h1 className="text-sm font-light">Password</h1>
                <input
                  type={hidePassword ? "password" : "text"}
                  placeholder="Enter your password"
                  className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:primary pr-12 text-sm xl:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 xl:top-10 top-11 cursor-pointer"
                  onClick={() => setHidePassword(!hidePassword)}
                >
                  {hidePassword ? (
                    <EyeOff className="w-3 h-3 xl:w-5 xl:h-5" />
                  ) : (
                    <Eye className="w-3 h-3 xl:w-5 xl:h-5" />
                  )}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="w-full flex flex-col">
                <button
                  className="w-full bg-primary text-white p-3 rounded-full font-semibold hover:bg-primary/90 transition cursor-pointer mt-4 text-sm xl:text-base disabled:opacity-50"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
                <div className="w-full flex items-center justify-between mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-xs xl:text-sm font-light">
                      Remember me
                    </span>
                  </label>
                  <h1 className="text-xs xl:text-sm cursor-pointer hover:underline hover:text-primary transition">
                    Forgot password?
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
