"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Code,
  Moon,
  Sun,
  CheckCircle,
  Mail,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authRequest } from "@/app/actions/auth";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading("email");
    try {
      const data = await authRequest({ email, password, isSignUp });

      if (data && data.token) {
        localStorage.setItem("authToken", data.token);
        window.location.href = "/dashboard";
      } else {
        //alert("Login failed: No token");
        window.location.reload()
      }
    } catch (err: any) {
      //alert(err.message);
      window.location.reload()
    } finally {
      setIsLoading(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background cursor-default">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                window.location.href = "../../";
              }}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Next.API</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="gap-2 bg-transparent cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? "Light" : "Dark"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow z-49">
        <section className="py-0 md:py-20 px-4 z-150">
          <div className="container mx-auto max-w-md">
            <Card className="backdrop-blur-[5px] bg-transparent border-0 shadow-none sm:border sm:shadow-lg border-border">
              <CardHeader className="text-center p-6 md:p-8">
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-2 dark:text-gray-300">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-base md:text-lg text-muted-foreground">
                  {isSignUp
                    ? "Create your Next.API account to get started with enhanced features."
                    : "Sign in to access your Next.API dashboard and manage your Discord bot integrations."}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 pt-0">
                <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm dark:text-gray-300 font-medium text-foreground"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 py-6 text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm dark:text-gray-300 font-medium text-foreground"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 py-6 text-base"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base py-6 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer dark:text-background dark:bg-gray-50/90"
                    disabled={isLoading !== null}
                  >
                    {isLoading === "email" ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
                    ) : null}
                    {isSignUp ? "Create Account" : "Sign In"}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-sm text-primary hover:underline cursor-pointer"
                    >
                      {isSignUp
                        ? "Already have an account? Sign in"
                        : "Don't have an account? Create one"}
                    </button>
                  </div>
                </form>

                {isSignUp && (
                  <div className="p-4 bg-muted dark:bg-muted/20 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3 text-sm dark:text-muted-foreground">
                      What you get with an account:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Higher rate limits (50 requests/minute)
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Usage analytics and monitoring
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Priority support
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Custom endpoint configurations
                      </li>
                    </ul>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    {isSignUp
                      ? `By registering, you agree to our `
                      : `By signing in, you agree to our `}
                    <Link
                      href="../legal/terms/"
                      className="dark:text-gray-200 text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="../legal/privacy/"
                      className="dark:text-gray-200 text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? `Don't want to sign up? ` : ""}
                {isSignUp ? (
                  <Link
                    href="/"
                    className="text-primary dark:text-gray-300 hover:underline font-medium"
                  >
                    Use our API without registration
                  </Link>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 z-50 backdrop-blur-sm bg-card/30">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Code className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground dark:text-gray-300">
              Next.API
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Free Discord bot API • No registration required • Built by
            developers, for developers
          </p>
          <p className="text-sm text-muted-foreground mb-5 relative top-[-5px]">
            Not affiliated with or endorsed by Vercel/Next.js
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Status
            </a>
            <a
              href="https://discord.gg/DfPpbX3CYG"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Discord
            </a>
            <a
              href="https://github.com/Test1calCutter"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="../legal/terms/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </a>
            <a
              href="../legal/privacy/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>

      <BackgroundBeams className="opacity-[0.8]"/>
    </div>
  );
}
