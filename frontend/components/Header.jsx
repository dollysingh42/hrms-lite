'use client';

import React, { useEffect, useState } from "react";
import { Moon, Sun, Bell } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 shadow-sm border-b 
      bg-background border-border text-foreground transition-colors duration-300">
      
      <h1 className="text-lg font-semibold">
        HRMS Lite Dashboard
      </h1>
      <div className="flex items-center gap-4">
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground text-muted-foreground transition cursor-pointer"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="text-muted-foreground hover:text-foreground transition cursor-pointer">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold border border-border">
            A
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}