"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Trash, Moon, Sun, Save, Code, Camera } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(false)
  {/* Temporary for maybe implementing support/forum pages 
    const [profilePicture, setProfilePicture] = useState<string>("https://cdn.discordapp.com/attachments/1223068132222959659/1408178351247720448/Screenshot_20250820_200312_TikTok.jpg?ex=68a8cbc9&is=68a77a49&hm=b755ba55cc3063ba73c5e898ebe9e0521062dd9b136f1b4131a6259bbdd6c89a&")
  */}
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirm1, setDeleteConfirm1] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [settings, setSettings] = useState({
    displayName: "",
    email: "",
    profile: "",
    notifications: {
      email: false,
      push: false,
    },
    privacy: {
      profileVisible: false,
    },
  })

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

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Not authenticated.");
      window.location.href = "./user/";
      return;
    }

    try {
      const res = await fetch("/api/backend/proxy?target=dashboard/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const updated = await res.json();
        setUserData(updated);
        alert("Settings saved successfully!");
      } else {
        //console.error("Failed to save settings:", res.status);
        const err = await res.json();
        //console.error("Response body:", err);
        alert("Could not save settings. Please try again.");
      }
    } catch (error) {
      //console.error("Error saving settings:", error);
      alert("An error occurred while saving your settings.");
    }
  };


  
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        //console.error("Not authenticated.");
        window.location.href = "./user/";
        return;
      }

      try {
        const res = await fetch("/api/backend/proxy?target=dashboard/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          //console.error("API call failed with status:", res.status);
          //console.error("Response body:", await res.json());
        }
      } catch (error) {
        //console.error("An error occurred during the fetch:", error);
      }
    })();
  }, []);


  useEffect(() => {
    if (userData) {
      setSettings({
        displayName: userData.displayName || "",
        email: userData.email || "",
        profile: userData.profile || "",
        notifications: {
          email: !!userData.emailNots,
          push: !!userData.pushNots,
        },
        privacy: {
          profileVisible: !!userData.public,
        },
      })
    }
  }, [userData])



  if (!userData) return <div className="w-fit h-fit bg-black p-2 rounded-tl-[25px] rounded-bl-[5px] rounded-tr-[5px] rounded-br-[25px] absolute top-[50%] left-[50%] translate-[-50%]"><div className="text-white text-[3rem]">Loading</div></div>


  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev) => {
      if (section === "") {
        return {
          ...prev,
          [key]: value,
        }
      } else {
        const nested = prev[section as keyof typeof prev] as Record<string, any>
        return {
          ...prev,
          [section]: {
            ...nested,
            [key]: value,
          },
        }
      }
    })
  }

  const handleDeleteAccount = () => {
    if (!deleteConfirm1) {
      alert("Please confirm the checkbox before deleting your account.")
      return
    }
    
    alert("in development silly")
  }


  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Next.API</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/docs">Documentation</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={toggleDarkMode} className="gap-2 bg-transparent cursor-pointer">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? "Light" : "Dark"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and configuration</p>
        </div>

        <div className="space-y-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>Update your personal information and account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {
                /* Profile picture section...
                              <div className="flex items-center gap-6 mb-6">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted">
                    <User className="h-24 w-24 justify-center pr-5" />
                  </div>

                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">Click on the image or button to upload a new picture</p>
                </div>
              </div>
                */
              }

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Display Name</label>
                  <Input
                    value={settings.displayName}
                    onChange={(e) => updateSetting("", "displayName", e.target.value)}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    value={settings.email}
                    onChange={(e) => updateSetting("", "email", e.target.value)}
                    className="bg-input border-border"
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => updateSetting("notifications", "email", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateSetting("notifications", "push", checked)}
                  />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Shield className="h-5 w-5" />
                Account Removal
              </CardTitle>
              <CardDescription>Deleting your account is irreversable.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" onClick={() => setShowDeleteConfirm(!showDeleteConfirm)} className="gap-2">
                <Trash className="h-4 w-4" />
                Delete Account
              </Button>

              {showDeleteConfirm && (
                <div className="mt-4 p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">I want to delete my account</p>
                      </div>
                      <Switch checked={deleteConfirm1} onCheckedChange={setDeleteConfirm1} className="cursor-pointer" />
                    </div>

                    <div>
                      <Button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 border-red-600 border-2 hover:bg-red-700 gap-2 cursor-pointer dark:text-white "
                      >
                        <Trash className="h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button onClick={handleSave} className="gap-2 cursor-pointer">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>


        </div>
      </main>

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
