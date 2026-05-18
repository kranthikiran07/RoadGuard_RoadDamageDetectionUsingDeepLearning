import { motion } from "motion/react";
import { 
  Zap, 
  Target, 
  Activity, 
  Layers, 
  BarChart4, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Code,
  User,
  LogOut
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- Nav Component ---
export function Navbar({ 
  onNavigate, 
  currentPage, 
  isLoggedIn, 
  userName, 
  onLogout 
}: { 
  onNavigate: (page: string) => void, 
  currentPage: string, 
  isLoggedIn: boolean, 
  userName: string, 
  onLogout: () => void 
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass-morphism rounded-2xl px-6 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 rounded-lg bg-neon-blue flex items-center justify-center glow-blue">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">RoadGuard AI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className={cn(
              "text-sm font-medium transition-colors hover:text-neon-blue",
              currentPage === 'home' ? "text-neon-blue" : "text-slate-400"
            )}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className={cn(
              "text-sm font-medium transition-colors hover:text-neon-blue",
              currentPage === 'dashboard' ? "text-neon-blue" : "text-slate-400"
            )}
          >
            Dashboard
          </button>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-lg bg-neon-blue/20 text-neon-blue flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-200">{userName}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('login')}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="px-4 py-2 rounded-xl bg-neon-blue text-black text-sm font-bold glow-blue hover:scale-105 active:scale-95 transition-all"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// --- Tech Stack Badges ---
export function TechStackBadges() {
  const stack = [
    { name: "Python", icon: <Cpu className="w-4 h-4" /> },
    { name: "YOLO v5/v7/v8", icon: <Target className="w-4 h-4" /> },
    { name: "Flask/Express", icon: <Activity className="w-4 h-4" /> },
    { name: "OpenCV", icon: <Layers className="w-4 h-4" /> },
    { name: "SQLite/MySQL", icon: <Database className="w-4 h-4" /> },
    { name: "React/Tailwind", icon: <Code className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {stack.map((tech) => (
        <span 
          key={tech.name} 
          className="glass-morphism px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border-neon-blue/20"
        >
          <span className="text-neon-blue">{tech.icon}</span>
          {tech.name}
        </span>
      ))}
    </div>
  );
}

// --- Section Header ---
export function SectionHeader({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-slate-400 max-w-2xl mx-auto text-lg">{subtitle}</p>}
      <div className={cn("h-1 w-20 bg-neon-blue mt-4 glow-blue", centered && "mx-auto")}></div>
    </div>
  );
}
