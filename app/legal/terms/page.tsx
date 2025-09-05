'use client';
import { useState, useEffect } from "react";
import { Code, Moon, Sun, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function Terms() {
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
    <div className="min-h-screen bg-background">
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
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: 01/09/2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
              <p className="text-foreground leading-relaxed">
                These Terms of Service ("Terms") govern your use of Next.API's services, including our public APIs designed for
                Discord bots and related applications. By accessing or using our APIs, you agree to comply with these Terms.
              </p>
            </section>
            
            {/* Acceptance of rerms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Acceptance of Terms</h2>
              <p className="text-foreground leading-relaxed">
                By using our APIs or related services, you agree to be bound by these Terms. If you do not agree, you may not use
                Next.API.
              </p>
            </section>
            
            {/* Use license */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Use License</h2>
              <p className="text-foreground leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to access and use our APIs solely for the purpose of
                creating and operating Discord bots or integrations. Under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed">
                <li>Use the APIs for unlawful, abusive, or harmful purposes</li>
                <li>Resell, sublicense, or charge for direct API access</li>
                <li>Bypass rate limits, disrupt service stability, or attempt to reverse engineer our systems</li>
                <li>Remove or alter any attribution, disclaimers, or notices associated with the service</li>
              </ul>
            </section>
            
            {/* User accounts */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">User Accounts</h2>
              <p className="text-foreground leading-relaxed">
                Some features may require creating an account or registering your bot. You are responsible for keeping your account
                credentials secure and for all activity performed through your account or API key.
              </p>
            </section>
            
            {/* Prohibited uses */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Prohibited Uses</h2>
              <p className="text-foreground leading-relaxed">You may not use our APIs or services:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed">
                <li>To create bots that violate Discord's Terms of Service or Community Guidelines</li>
                <li>To spam, harass, or abuse Discord users or servers</li>
                <li>To attempt unauthorized access, bypass security, or exploit vulnerabilities</li>
                <li>To misrepresent our services as your own, or resell direct API access</li>
                <li>To distribute false, misleading, or malicious content via bots or integrations</li>
              </ul>
            </section>
            
            {/* Content */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Content</h2>
              <p className="text-foreground leading-relaxed">
                Bots or applications using our APIs may transmit or generate content. You are solely responsible for the content
                your bot produces, shares, or processes through our services, including its legality, safety, and compliance with
                Discord's rules and applicable laws.
              </p>
            </section>
            
            {/* Privacy policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Privacy Policy</h2>
              <p className="text-foreground leading-relaxed">
                Your use of our APIs is also governed by our Privacy Policy. Please review it to understand how we handle your data
                and what information may be collected when using our services.
              </p>
            </section>
            
            {/* Termination */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Termination</h2>
              <p className="text-foreground leading-relaxed">
                We may suspend or revoke your access to the APIs at any time, without prior notice, if you violate these Terms,
                abuse the service, or disrupt its operation. You remain responsible for any obligations incurred before termination.
              </p>
            </section>
            
            {/* Disclaimer */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Disclaimer</h2>
              <p className="text-foreground leading-relaxed">
                Our APIs and services are provided on an "as is" and "as available" basis. We make no guarantees regarding uptime,
                accuracy, or fitness for a particular purpose. Use of the service is at your own risk.
              </p>
            </section>
            
            {/* Limitations */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Limitations</h2>
              <p className="text-foreground leading-relaxed">
                In no event shall Next.API or its contributors be liable for any damages, including but not limited to data loss,
                downtime, or misuse of your bot, arising from the use or inability to use our services.
              </p>
            </section>
            
            {/* Changes to terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Changes to Terms</h2>
              <p className="text-foreground leading-relaxed">
                We reserve the right to update or modify these Terms at any time. Material changes will be announced in advance
                when reasonably possible. Continued use of the service after changes take effect constitutes acceptance of the new
                Terms.
              </p>
            </section>

            {/* Contact information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
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
