'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CountUp from '@/components/ui/CountUp/CountUp'
import { Code, Moon, Sun, ExternalLink, Shield, Globe, Zap, ArrowRight, CheckCircle, Users, Clock, Star, LogIn, LogInIcon } from "lucide-react"
import SplitText from "@/components/ui/SplitText/SplitText";
import { BackgroundBeams } from "@/components/ui/background-beams";

type UsageStats = {
  totalRequests: number;
  bots: number;
  uptime: {
    status200: number;
    otherStatuses: number;
  };
};

export default function Landing() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [usage, setUsage] = useState<UsageStats | null>(null);
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

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/backend/proxy?target=stats", { cache: "no-store" });

        if (res.ok) {
          const data = await res.json();
          setUsage(data);
        } else {
          console.error("API call failed. status:", res.status);
          console.error("Response body:", await res.json());
        }
      } catch (error) {
        console.error("error occurred during fetch");
      }
    })();
  }, []);




  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background cursor-default">
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Next.API</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "../../docs/")}
              className="dark:text-gray-300  cursor-pointer"
            >
              Documentation
            </Button>

            <Button
              variant="outline"
              size="sm"
              style={{ display: isDesktop ? "flex" : "none" }}
              className="dark:text-gray-300 cursor-pointer"
              onClick={() => (window.location.href = "../../user/")}
            >
              <LogInIcon className="w-4 h-4 mr-2" />
              Sign in
            </Button>

            <Button variant="outline" size="sm" onClick={toggleDarkMode} className="gap-2 bg-transparent cursor-pointer">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? "Light" : "Dark"}
            </Button>
          </div>
        </div>
      </div>
    </header>

      <section className="py-20 px-4 z-50 relative">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex backdrop-blur-[1px] items-center gap-3 bg-transparent border border-border rounded-full px-6 py-3 mb-25 shadow-sm" style={{
            display: isDesktop ? "inline-flex" : "none"
          }}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-medium text-green-600">API Status: Online</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Free
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                No Registration
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                No API Keys
              </span>
            </div>
          </div>



          <div className="z-50">
            <SplitText
              text="Hello, Next.API!"
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
              delay={50}
              duration={0.3}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.59}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>
          <p className="z-50 text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The fastest way to add powerful features to your Discord bot. No registration, no API keys, no hassle.
          </p>

          <div className="z-50 flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 cursor-pointer dark:text-gray-800 dark:bg-gray-100 backdrop-blur-[1px]">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 backdrop-blur-[1px] cursor-pointer py-6 bg-transparent dark:text-gray-300" onClick={() => window.location.href = "../../docs/"}>
              View Documentation
            </Button>
          </div>

          <div className="z-50 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground mb-4">Try it now - no setup required:</p>
            <Card className="text-left z-50 bg-white/1 backdrop-blur-[5px]">
              <CardContent className="p-6">
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm text-foreground overflow-x-auto">
                    {`const response = await fetch('https://api.nextapi.dev/user/123456789');
const user = await response.json();
console.log(user.username); // "ExampleUser"`} 
                  </pre>{/* Temporary domain */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 dark:text-gray-300">Why Choose Next.API?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built by Discord bot developers, for Discord bot developers. Everything you need, nothing you don't.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-border text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 dark:text-gray-300">No Registration</h3>
                <p className="text-muted-foreground">
                  Start using our API immediately. No accounts, no verification emails, no waiting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 dark:text-gray-300">No API Keys required</h3>
                <p className="text-muted-foreground">
                  Direct endpoint access means less complexity and faster development.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 dark:text-gray-300">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  {((usage?.uptime.status200 ?? 0) / (usage?.uptime.otherStatuses ?? 1)) * 9}% uptime with global CDN. Your bot's performance is our priority.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2 dark:text-gray-300">
                <CountUp
                  from={0}
                  to={usage?.totalRequests ?? 0}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />+
                </div>
              <div className="text-sm text-muted-foreground">API Requests</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 dark:text-gray-300">
                <CountUp
                  from={0}
                  to={((usage?.uptime.status200 ?? 1) / (usage?.uptime.otherStatuses ?? 1)) * 9}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                %</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 dark:text-gray-300">
                <CountUp
                  from={0}
                  to={usage?.bots ?? 0}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                +</div>
              <div className="text-sm text-muted-foreground">Discord Bots</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2 dark:text-gray-300">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 dark:text-gray-300">Powerful API Endpoints</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build amazing Discord bots, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl dark:text-gray-300">User & Guild Data</CardTitle>
                </div>
                <CardDescription>Get detailed information about Discord users and servers instantly.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 dark:text-gray-300">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    User profiles and avatars
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Guild information and stats
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Account creation dates
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Custom avatar sizes
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl dark:text-gray-300">Moderation Tools</CardTitle>
                </div>
                <CardDescription>AI-powered content filtering and moderation utilities.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 dark:text-gray-300">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Content filtering
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Spam detection
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Toxicity analysis
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Custom severity levels
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl dark:text-gray-300">Image Generation</CardTitle>
                </div>
                <CardDescription>Create custom welcome images and graphics for your server.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 dark:text-gray-300">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Welcome images
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Custom templates
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Brand colors
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    High resolution
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl dark:text-gray-300">Utility Functions</CardTitle>
                </div>
                <CardDescription>Time-saving utilities for common Discord bot operations.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 dark:text-gray-300">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Timestamp conversion
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Color palette generation
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Text formatting
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Data validation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 dark:text-gray-300">Simple Integration</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Add powerful features to your Discord bot with just a few lines of code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg dark:text-gray-300">Discord.js Example</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Get user information with a slash command
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="bg-muted p-3 md:p-4 rounded-lg">
                  <pre className="text-xs md:text-sm text-foreground overflow-x-auto">
                    {`const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get user info')
    .addUserOption(option =>
      option.setName('user').setRequired(true)
    ),
  
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const response = await fetch(
      \`https://api.nextapi.dev/user/\${user.id}\`
    );
    const data = await response.json();
    
    await interaction.reply(
      \`\${data.username} created their account \${data.account_age_days} days ago!\`
    );
  },
};`}
                  </pre> {/* Temporary domain */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg dark:text-gray-300">Discord.py Example</CardTitle>
                <CardDescription className="text-sm md:text-base">Content moderation with AI filtering</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="bg-muted p-3 md:p-4 rounded-lg">
                  <pre className="text-xs md:text-sm text-foreground overflow-x-auto">
                    {`import discord
from discord.ext import commands
import aiohttp

@bot.event
async def on_message(message):
    if message.author.bot:
        return
    
    async with aiohttp.ClientSession() as session:
        async with session.post(
            'https://api.nextapi.dev/moderation/filter',
            json={'content': message.content}
        ) as response:
            data = await response.json()
            
            if data['flagged']:
                await message.delete()
                await message.channel.send(
                    f"{message.author.mention}, please keep it friendly!"
                )
    
    await bot.process_commands(message)`}
                  </pre> {/* Temporary domain */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6 dark:text-gray-300">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            From idea to feature in seconds — Next.API makes Discord bot development effortless.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg cursor-pointer px-8 py-6 dark:text-gray-800 dark:bg-gray-300" onClick={() => {window.location.href = '../user/'}}>
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg cursor-pointer px-8 py-6 bg-transparent" onClick={() => {window.location.href = '../docs/'}}>
              Read the Docs
            </Button>
          </div>

          <div className="bg-muted dark:bg-muted/20 dark:border dark:border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-sm text-foreground dark:text-gray-300">
              <strong>Base URL:</strong>{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm">https://api.nextapi.dev</code> {/* Temporary domain */}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              No registration • No API keys required • 10 requests/minute • Free forever
            </p>
          </div>
        </div>
      </section>

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

      <BackgroundBeams className="opacity-[0.8] z-1"/>

    </div>
  )
}
