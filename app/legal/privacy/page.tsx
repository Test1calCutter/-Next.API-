'use client';
import { useState, useEffect } from "react";
import { Code, Moon, Sun, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Privacy() {
    const [mounted, setMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    
    const [isDark, setIsDark] = useState(false)
    useEffect(() => {
      const checkSize = () => setIsDesktop(window.innerWidth >= 768);
      checkSize();
      window.addEventListener("resize", checkSize);
      return () => window.removeEventListener("resize", checkSize);
    }, []);
  
    useEffect(() => {
        const darkMode = localStorage.getItem("darkMode") === "true"
        setIsDark(darkMode)
        if (darkMode) {
            document.documentElement.classList.add("dark")
        }
        setMounted(true);
    }, [])

    const toggleDarkMode = () => {
        const newDarkMode = !isDark
        setIsDark(newDarkMode)
        localStorage.setItem("darkMode", newDarkMode.toString())
        if (newDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }
  
    useEffect(() => {
      if (!mounted) return;
    }, [mounted]);

  return (
    <div className="min-h-screen bg-background cursor-default">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => {window.location.href = '../../'}}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Next.API</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={toggleDarkMode} className="gap-2 bg-transparent cursor-pointer">
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDark ? "Light" : "Dark"}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: 01/09/2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
              <p className="text-foreground leading-relaxed">
                This Privacy Policy explains how Next.API ("we," "our," or "us") collects, uses, and protects information when you
                use our APIs and related services for Discord bots. By using our services, you agree to the practices described in
                this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
                <p className="text-foreground leading-relaxed">
                  We may collect limited personal information, such as your email address or account details, if you voluntarily
                  provide them (for example, when registering for an API key or contacting support).
                </p>

                <h3 className="text-lg font-medium text-foreground">Usage Data</h3>
                <p className="text-foreground leading-relaxed">
                  When your bot or application interacts with our APIs, we automatically log technical information such as IP
                  address, requested endpoint, HTTP method, status code, timestamp, response time, and usage patterns. This data is
                  used for debugging, analytics, and preventing abuse.
                </p>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed">
                <li>To provide, monitor, and improve our API services</li>
                <li>To enforce fair use, prevent abuse, and maintain system stability</li>
                <li>To communicate with you regarding your account or support inquiries</li>
                <li>To comply with legal obligations or valid law enforcement requests</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Information Sharing</h2>
              <p className="text-foreground leading-relaxed">
                We do not sell or trade your personal information. We may share limited data only in the following cases: (1) when
                required by law, (2) to protect the security and integrity of our services, or (3) with trusted infrastructure
                providers strictly for operating the service.
              </p>
            </section>

            {/* Data Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Data Security</h2>
              <p className="text-foreground leading-relaxed">
                We use appropriate technical and organizational measures to protect your information from unauthorized access,
                alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure,
                and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Your Rights</h2>
              <p className="text-foreground leading-relaxed">
                You have the right to access, update, or delete your personal information. If you wish to exercise these rights, or
                if you want your API usage data removed where possible, please contact us through the channels listed below or to delete your account, head to your profile settings.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Changes to This Policy</h2>
              <p className="text-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated date. If
                the changes are significant, we may notify you through Discord or another communication method.
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through:
              </p>
              <div className="bg-muted dark:bg-muted/20 p-4 w-fit rounded-lg">
                <p className="text-foreground flex gap-5">
                  <Button variant="outline" size="sm" onClick={() => {window.location.href = 'https://discord.gg/DfPpbX3CYG'}} className="cursor-pointer dark:text-gray-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Discord
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => {window.location.href = 'https://x.com/testicalcutter'}} className="cursor-pointer dark:text-gray-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Twitter (X)
                  </Button>

                  <Button variant="outline" size="sm" onClick={() => {window.location.href = 'https://github.com/Test1calCutter'}} className="cursor-pointer dark:text-gray-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Code className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground dark:text-gray-300">Next.API</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The simplest Discord bot API. Built by developers, for developers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3 dark:text-gray-300">API</h4>
              <ul className="space-y-2 text-sm text-muted-foreground ">
                <li>
                  <a href="../docs/" className="hover:text-primary transition-colors ">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="../docs/#rate-limits" className="hover:text-primary transition-colors">
                    Rate Limits
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3 dark:text-gray-300">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="../docs/#discord-js" className="hover:text-primary transition-colors">
                    Discord.js Guide
                  </a>
                </li>
                <li>
                  <a href="../docs/#python" className="hover:text-primary transition-colors">
                    Discord.py Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Best Practices
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3 dark:text-gray-300">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://discord.gg/DfPpbX3CYG" className="hover:text-primary transition-colors">
                    Discord Server
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Test1calCutter" className="hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://x.com/testicalcutter" className="hover:text-primary transition-colors">
                    X
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/DfPpbX3CYG" className="hover:text-primary transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Next.API. Free Discord bot API • No registration required
            </p>
            <p className="text-sm text-muted-foreground md:ml-4">
              Not affiliated with or endorsed by Vercel/Next.js
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="../legal/privacy/" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="../legal/terms/" className="hover:text-primary transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
