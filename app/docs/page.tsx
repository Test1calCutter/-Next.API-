'use client';

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, ExternalLink, Book, Zap, Shield, Globe, Sun, Moon } from "lucide-react";
import GuildsDoc from './content/guilds/page';
import ModerationDoc from './content/moderation/page';
import ImageManipulationDoc from './content/image-manipulation/page';
import UtilitiesDoc from './content/utilities/page';
import DiscordJsDoc from './content/DJS/page';
import PythonDoc from './content/PY/page';
import ErrorHandlingDoc from './content/errorHandling/page';

export default function DocumentationPage() {
    const [isDark, setIsDark] = useState(false)

    const NavLink = ({ id, text }: { id: string; text: string }) => {
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        return (
            <li>
                <a onClick={handleClick} className="text-sm hover:text-primary transition-colors cursor-pointer">
                    {text}
                </a>
            </li>
        );
    };

    useEffect(() => {
        const darkMode = localStorage.getItem("darkMode") === "true"
        setIsDark(darkMode)
        if (darkMode) {
            document.documentElement.classList.add("dark")
        }
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

    return (
        <div className="min-h-screen bg-background scroll-smooth cursor-default">
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
                            <Badge variant="secondary" className="bg-black text-gray-300 border-primary/20 cursor-default">
                                v0.1.0
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => {window.location.href = 'https://github.com/Test1calCutter'}} className="dark:text-gray-300 cursor-pointer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                GitHub
                            </Button>
                            <Button variant="outline" size="sm" onClick={toggleDarkMode} className="gap-2 bg-transparent cursor-pointer">
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                {isDark ? "Light" : "Dark"}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">

                <aside className="w-64 border-r border-border bg-card/30 min-h-screen sticky top-16 overflow-y-auto h-[calc(100vh-64px)]">
                    <nav className="p-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                                    Getting Started
                                </h3>
                                <ul className="space-y-2">
                                    <NavLink id="introduction" text="Introduction" />
                                    <NavLink id="quick-start" text="Quick Start" />
                                    <NavLink id="rate-limits" text="Rate Limits" />
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                                    API Reference
                                </h3>
                                <ul className="space-y-2">

                                    <NavLink id="guilds" text="Guilds" />
                                    <NavLink id="moderation" text="Moderation" />
                                    <NavLink id="image-manipulation" text="Image Manipulation" />
                                    <NavLink id="utilities" text="Utilities" />
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Examples</h3>
                                <ul className="space-y-2">
                                    <NavLink id="discord-js" text="Discord.js" />
                                    <NavLink id="python" text="Discord.py" />
                                    <NavLink id="error-handling" text="Error Handling" />
                                </ul>
                            </div>
                        </div>
                    </nav>
                </aside>

                <main className="flex-1 p-8 m-auto max-w-4xl">
                    <section id="introduction" className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Book className="w-8 h-8 text-primary" />
                            <h1 className="text-4xl font-bold text-foreground">Next.API Documentation</h1>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">
                            Next.API is a free, public API provider designed specifically for Discord bot developers. No registration, no API
                            keys, no hassle.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mb-8">
                            <Card className="border-border">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="font-medium text-sm">No Registration</p>
                                        <p className="text-xs text-muted-foreground">Start using immediately</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-border">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <Globe className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="font-medium text-sm">No API Keys</p>
                                        <p className="text-xs text-muted-foreground">Direct endpoint access</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-border">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <Zap className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="font-medium text-sm">Fast & Reliable</p>
                                        <p className="text-xs text-muted-foreground">99.9% uptime</p> {/* Todo: display accurate uptime. maybe rework whole system for that */}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <p className="text-sm">
                                <strong>Base URL:</strong>{" "}
                                <code className="bg-muted px-2 py-1 rounded text-sm">https://api.nextapi.dev</code> {/* Temporary domain */}
                            </p>
                        </div>
                    </section>
                    <section id="quick-start" className="mb-12">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Start</h2>
                        <p className="text-muted-foreground mb-6">Get started with Next.API in under 5 minutes.</p>
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Basic Request</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm text-foreground overflow-x-auto">
                                            {`// JavaScript/Node.js
const response = await fetch('https://api.nextapi.dev/user/123456789012345678');
const user = await response.json();
console.log(user);`}
                                        </pre> {/* Temporary domain */}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Discord.js Integration</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <pre className="text-sm text-foreground overflow-x-auto">
                                            {`const { EmbedBuilder } = require('discord.js');

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!userinfo')) {
        const userId = message.mentions.users.first()?.id;
        if (!userId) return;
        
        const response = await fetch(\`https://api.nextapi.dev/user/\${userId}\`);
        const userData = await response.json();
        
        const embed = new EmbedBuilder()
            .setTitle(\`User: \${userData.username}\`)
            .setDescription(\`ID: \${userData.id}\`)
            .setThumbnail(userData.avatar_url)
            .addFields(
                { name: 'Created', value: userData.created_at, inline: true },
                { name: 'Bot', value: userData.bot ? 'Yes' : 'No', inline: true }
            );
        
        message.reply({ embeds: [embed] });
    }
});`}
                                        </pre> {/* Temporary domain */}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                    <section id="rate-limits" className="mb-12">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Rate Limits</h2>
                        <p className="text-muted-foreground mb-4">
                            Next.API implements fair usage rate limiting to ensure service availability for all users.
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-yellow-800">
                                <strong>Rate Limit:</strong> 10 requests per minute per IP address {/* Todo: If user has account, display accurate ratelimit same case below */}
                            </p>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Rate Limit Headers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted p-4 rounded-lg">
                                    <pre className="text-sm text-foreground">
                                        {`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200`}
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <div id="guilds">
                        <GuildsDoc />
                    </div>
                    <div id="moderation">
                        <ModerationDoc />
                    </div>
                    <div id="image-manipulation">
                        <ImageManipulationDoc />
                    </div>
                    <div id="utilities">
                        <UtilitiesDoc />
                    </div>
                    <div id="discord-js">
                        <DiscordJsDoc />
                    </div>
                    <div id="python">
                        <PythonDoc />
                    </div>
                    <div id="error-handling">
                        <ErrorHandlingDoc />
                    </div>
                </main>
            </div>

            <footer className="border-t border-border py-8 px-4 bg-card/30">
                <div className="container mx-auto max-w-6xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                            <Code className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-foreground dark:text-gray-300">Next.API</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Free Discord bot API • No registration required • Built by developers, for developers
                    </p>
                    <p className="text-sm text-muted-foreground mb-5 relative top-[-5px]">
                        Not affiliated with or endorsed by Vercel/Next.js
                    </p>
                    <div className="flex justify-center gap-6 text-sm">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Status</a>
                        <a href="https://discord.gg/DfPpbX3CYG" className="text-muted-foreground hover:text-primary transition-colors">Discord</a>
                        <a href="https://github.com/Test1calCutter" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
                        <a href="../legal/terms/" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
                        <a href="../legal/privacy/" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}