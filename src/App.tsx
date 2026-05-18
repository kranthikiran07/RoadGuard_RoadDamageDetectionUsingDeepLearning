/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect, FormEvent, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  ChevronRight, 
  Camera, 
  MapPin, 
  Shield, 
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Lock,
  User,
  Phone,
  Activity,
  Layers,
  Zap
} from 'lucide-react';
import { Navbar, TechStackBadges, SectionHeader } from '@/src/components/UI';
import { PerformanceGraphs } from '@/src/components/PerformanceGraphs';
import { cn } from '@/src/lib/utils';

type Page = 'home' | 'login' | 'signup' | 'dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNavigate = (page: string) => {
    if (page === 'dashboard' && !isLogged) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page as Page);
    }
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsLogged(false);
    setUserName('');
    setCurrentPage('home');
  };

  const handleAuthSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileName = formData.get('profileName') as string;
    const email = formData.get('email') as string;
    
    // Set user name from profile name if available, otherwise use email prefix
    const nameToDisplay = profileName || email.split('@')[0];
    setUserName(nameToDisplay || 'User');
    setIsLogged(true);
    handleNavigate('dashboard');
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: 'mock_base64' })
      });
      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-neon-blue selection:text-black">
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        isLoggedIn={isLogged}
        userName={userName}
        onLogout={handleLogout}
      />
      
      <main className="pt-24 pb-20">
        <AnimatePresence mode="wait">
          {/* --- HOME PAGE --- */}
          {currentPage === 'home' && (
            <motion.section 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-6"
            >
              <div className="relative rounded-[3rem] overflow-hidden min-h-[80vh] flex items-center justify-center text-center p-12">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-cyber-black/60 z-10 backdrop-blur-sm"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000" 
                    alt="Road infrastructure" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="relative z-20 max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-morphism border-neon-blue/30 text-neon-blue text-xs font-bold mb-8 uppercase tracking-widest"
                  >
                    <Activity className="w-3 h-3" />
                    AI-Powered Road Safety
                  </motion.div>
                  
                  <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
                    Hybrid Deep Learning & <span className="text-neon-blue drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">UAV Vision</span> System
                  </h1>
                  
                  <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Advanced road surface defect detection using YOLOv8 architectures. 
                    Monitor infrastructure health with 94.2% precision and real-time situational awareness.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button 
                      onClick={() => handleNavigate('dashboard')}
                      className="px-8 py-4 rounded-2xl bg-neon-blue text-black font-bold flex items-center gap-2 glow-blue hover:scale-105 active:scale-95 transition-all group"
                    >
                      Analyze Road Damage
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 rounded-2xl glass-morphism font-bold hover:bg-white/10 transition-all border-white/10">
                      View Demo Detections
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-32">
                <SectionHeader 
                  title="System Architecture" 
                  subtitle="Our multi-stage pipeline integrates state-of-the-art vision models for unparalleled accuracy."
                  centered
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                  {[
                    { icon: <Camera />, title: "UAV Acquisition", desc: "Aerial image collection via high-resolution drone telemetry." },
                    { icon: <Shield />, title: "YOLO Analysis", desc: "Object detection optimized for potholes, fatigue cracks, and rutting." },
                    { icon: <Layers />, title: "Quantification", desc: "Severity scoring and geospatial mapping of road defects." }
                  ].map((card, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -10 }}
                      className="glass-morphism p-8 rounded-[2rem] border-white/5"
                    >
                      <div className="w-12 h-12 rounded-xl bg-neon-blue/10 text-neon-blue flex items-center justify-center mb-6">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{card.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <SectionHeader 
                  title="Model Benchmarks" 
                  subtitle="Comparing YOLOv5, YOLOv7, and YOLOv8 architectures across critical performance metrics."
                  centered
                />
                <PerformanceGraphs />
              </div>

              <footer className="mt-32 pt-20 border-t border-white/5 text-center">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">Developed with Tech Stack</h4>
                <TechStackBadges />
                <p className="mt-12 text-slate-500 text-sm pb-12">
                  AI Powered Smart City Road Monitoring System © 2026<br/>
                  <span className="opacity-50">Department of Computer Science & Engineering</span>
                </p>
              </footer>
            </motion.section>
          )}

          {/* --- AUTH PAGES --- */}
          {(currentPage === 'login' || currentPage === 'signup') && (
            <motion.section 
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto pt-12 px-6"
            >
              <div className="glass-morphism p-8 md:p-10 rounded-[2.5rem] glow-blue/5">
                <div className="text-center mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-neon-blue/10 text-neon-blue flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-2">
                    {currentPage === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-slate-400">
                    Connect to the infrastructure dashboard
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleAuthSubmit}>
                  {currentPage === 'signup' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 ml-1">PROFILE NAME</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            name="profileName"
                            type="text" 
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-neon-blue outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 ml-1">MOBILE NUMBER</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            name="mobile"
                            type="tel" 
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-neon-blue outline-none transition-all"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 ml-1">USERNAME / EMAIL</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        name="email"
                        type="email" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-neon-blue outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 ml-1">PASSWORD</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        name="password"
                        type="password" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-neon-blue outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-neon-blue text-black font-bold glow-blue hover:scale-[1.02] active:scale-95 transition-all mt-4"
                  >
                    {currentPage === 'login' ? 'Authorize & Log In' : 'Register Securely'}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-500">
                    {currentPage === 'login' ? "Don't have an account?" : "Already registered?"}
                    <button 
                      onClick={() => handleNavigate(currentPage === 'login' ? 'signup' : 'login')}
                      className="text-neon-blue font-bold ml-2 hover:underline"
                    >
                      {currentPage === 'login' ? 'Create one now' : 'Access Dashboard'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* --- DASHBOARD PAGE --- */}
          {currentPage === 'dashboard' && (
            <motion.section 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-6 grid grid-cols-1 xl:grid-cols-12 gap-8"
            >
              {/* Sidebar Info */}
              <div className="xl:col-span-4 space-y-8">
                <div className="glass-morphism p-8 rounded-[2rem]">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                    <Zap className="text-neon-blue w-6 h-6" />
                    System Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400 text-sm">Model Version</span>
                      <span className="text-neon-blue font-mono font-bold">v8.2-Hybrid</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400 text-sm">Hardware Accel</span>
                      <span className="text-green-400 font-mono font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" />
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism p-8 rounded-[2rem]">
                  <h3 className="text-xl font-display font-bold mb-6">About Analysis</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Our system uses a hybrid approach combining YOLOv8 for spatial feature extraction 
                    and a custom CNN classifier for damage severity quantification. 
                    Upload high-res UAV imagery for best results.
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="xl:col-span-8 space-y-8">
                {/* Upload Section */}
                <div 
                  className={cn(
                    "glass-morphism rounded-[2.5rem] p-12 border-2 border-dashed transition-all text-center",
                    dragActive ? "border-neon-blue bg-neon-blue/5" : "border-white/10",
                    isAnalyzing && "pointer-events-none opacity-50"
                  )}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); simulateAnalysis(); }}
                >
                  {isAnalyzing ? (
                    <div className="space-y-6">
                      <Loader2 className="w-16 h-16 text-neon-blue animate-spin mx-auto" />
                      <div className="animate-pulse">
                        <h3 className="text-2xl font-bold mb-2">AI Analyzing Surface...</h3>
                        <p className="text-slate-400">Executing YOLOv8 + Hybrid CNN pipeline</p>
                      </div>
                    </div>
                  ) : analysisResult ? (
                    <div className="space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video bg-black">
                        {/* Detection Result with Bounding Boxes */}
                        <img 
                          src={previewUrl || "https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=1200"} 
                          alt="Road scan"
                          className="w-full h-full object-cover opacity-60"
                        />
                        {analysisResult.detections.map((d: any, i: number) => (
                          <div 
                            key={i}
                            className="absolute border-2 border-red-500 bg-red-500/20 pointer-events-none"
                            style={{ 
                              left: `${d.bbox[0]/6}%`, 
                              top: `${d.bbox[1]/6}%`, 
                              width: `${d.bbox[2]/3}%`, 
                              height: `${d.bbox[3]/3}%` 
                            }}
                          >
                            <span className="absolute -top-7 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                              {d.type} {(d.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-morphism p-6 rounded-2xl">
                          <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Severity Index</h4>
                          <div className="flex items-end gap-3">
                            <span className={cn(
                              "text-6xl font-display font-bold leading-none",
                              analysisResult.damageLevel > 80 ? "text-red-500" : "text-yellow-400"
                            )}>
                              {analysisResult.damageLevel}
                            </span>
                            <span className="text-slate-500 font-bold mb-2">/ 100</span>
                          </div>
                          <div className="w-full h-3 bg-white/5 rounded-full mt-6 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${analysisResult.damageLevel}%` }}
                              className={cn(
                                "h-full rounded-full",
                                analysisResult.damageLevel > 80 ? "bg-red-500 glow-red" : "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                              )}
                            />
                          </div>
                        </div>

                        <div className="glass-morphism p-6 rounded-2xl flex flex-col justify-center">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={cn(
                              "w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center",
                              analysisResult.damageLevel > 70 ? "text-red-500" : analysisResult.damageLevel > 40 ? "text-yellow-400" : "text-green-400"
                            )}>
                              {analysisResult.damageLevel > 70 ? <AlertTriangle className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                            </div>
                            <div>
                              <h4 className="font-bold">Surface Status</h4>
                              <p className={cn(
                                "text-sm font-medium",
                                analysisResult.damageLevel > 70 ? "text-red-400" : analysisResult.damageLevel > 40 ? "text-yellow-400" : "text-green-400"
                              )}>
                                {analysisResult.damageLevel > 70 
                                  ? "Heavily Damaged - Immediate repair required" 
                                  : analysisResult.damageLevel > 40 
                                    ? "Medium Damaged - Scheduling maintenance" 
                                    : "Minor Damage - Surface is stable"}
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => { setAnalysisResult(null); setPreviewUrl(null); }}
                            className="mt-2 text-sm text-neon-blue font-bold hover:underline text-left"
                          >
                            Start New Analysis
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="w-24 h-24 rounded-3xl bg-neon-blue/10 text-neon-blue flex items-center justify-center mx-auto mb-8 border border-neon-blue/20">
                        <Upload className="w-12 h-12" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-display font-bold mb-4">Upload Road Image</h3>
                        <p className="text-slate-400 max-w-sm mx-auto mb-10">
                          Drag and drop your UAV captured imagery or browse files (.jpg, .png up to 10MB)
                        </p>
                      </div>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      
                      <button 
                        onClick={handleFileClick}
                        className="px-10 py-5 rounded-2xl bg-neon-blue text-black font-bold glow-blue hover:scale-105 active:scale-95 transition-all text-lg"
                      >
                        Upload Road Image
                      </button>
                    </div>
                  )}
                </div>

                {/* Secondary Results Page / Graphs Area */}
                <div className="glass-morphism p-8 rounded-[2rem]">
                   <h3 className="text-xl font-display font-bold mb-8 text-neon-blue">Live Model Performance Comparison</h3>
                   <PerformanceGraphs />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
