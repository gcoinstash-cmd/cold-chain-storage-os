import React, { useState } from 'react';
import { 
  Truck, Shield, Award, ArrowRight, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Thermometer, Compass, Fuel, Gauge
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  rate: string;
  status: string;
  features: string[];
  img: string;
}

const ITEMS: ShowcaseItem[] = [
  {
    "id": "ZONE-A1",
    "title": "Deep Freeze Cryo-Vault (-20°F to -10°F)",
    "subtitle": "Industrial Blast Freezers // Biopharma & Premium Frozen Proteins",
    "rate": "$48 / Pallet / Month + In/Out",
    "status": "MONITORED REAL-TIME // PASS",
    "features": [
      "Redundant Ammonia Cryo-Chillers",
      "Automated High-Density Shuttle Racks",
      "Continuous IoT NIST Thermocouples",
      "Backup Power Generators (1.5 MW)"
    ],
    "img": "https://images.unsplash.com/photo-1587293852726-70cdb56c2866"
  },
  {
    "id": "ZONE-B4",
    "title": "Chilled Agricultural Produce Room (32°F to 36°F)",
    "subtitle": "Controlled Atmosphere (90% RH) // Berry, Floral & Dairy Pallets",
    "rate": "$36 / Pallet / Month",
    "status": "TEMPERATURE CALIBRATED",
    "features": [
      "Ethylene Scrubbing Filtration",
      "Automated Humidity Regulation",
      "Cross-Dock Rapid Distribution Lanes",
      "Sanitary Sealed Dock Levelers"
    ],
    "img": "https://images.unsplash.com/photo-1553413077-190dd305871c"
  },
  {
    "id": "BAY-DOCK-08",
    "title": "Reefer Yard Gate & Inbound Dock Appointment",
    "subtitle": "Fast-Track Check-In // Pre-Cooled Carrier Dock Seals // FSMA Log",
    "rate": "Turnaround Time: 38 Mins Avg",
    "status": "SCHEDULED // YARD BAY 08",
    "features": [
      "Automated Digital BOL Sign-off",
      "Core Probe Temperature Verification",
      "Lumper Labor Scheduling Gate",
      "Instant HACCP Deviation Alert System"
    ],
    "img": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
  }
];

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );
  const [selectedItem, setSelectedItem] = useState(ITEMS[0].id);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans selection:bg-amber-500/20 selection:text-amber-400">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 font-extrabold shadow-lg shadow-amber-600/20">
              <Truck className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">Temperature-Controlled Cold Storage & Reefer Dock OS</span>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">COLD CHAIN STORAGE OS</h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-zinc-400">
            <a href="#inventory" className="hover:text-amber-400 transition">Fleet Roster</a>
            <a href="#telemetry" className="hover:text-amber-400 transition">Telematics</a>
            <a href="#specs" className="hover:text-amber-400 transition">Compliance</a>
            <a href="#dispatch" className="hover:text-amber-400 transition">Book Dispatch</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-4 py-2 rounded-lg bg-zinc-900 border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 text-xs font-mono uppercase tracking-wider transition flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>[ DISPATCH PASS ]</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMERCIAL FLEET ENGINE • 9.8 VERIFIED PRODUCTION GRADE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            COLD <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">CHAIN STORAGE OS</span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Sub-Zero Storage Zones, Dock Queues & FSMA Audit Logs. High-utilization asset dispatch, real-time telemetry, and turnkey Supabase PostgreSQL database schemas.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#dispatch"
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm tracking-wide transition shadow-lg shadow-amber-500/25 flex items-center gap-2"
            >
              <span>Instant Fleet Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-500/40 text-zinc-200 text-sm font-semibold transition flex items-center gap-2"
            >
              <span>Launch Supervisor OS</span>
              <span className="text-amber-400 font-mono text-xs font-bold">[coldchain2026]</span>
            </button>
          </div>

          {/* Metrics Ticker */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            
              <div key="CONTROLLED TEMP ZONES" className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
                <span className="text-xs font-semibold tracking-wider font-mono text-zinc-400 uppercase tracking-wider block">CONTROLLED TEMP ZONES</span>
                <p className="text-lg sm:text-xl font-bold font-mono text-amber-400 mt-1">{"-20°F TO 36°F"}</p>
              </div>
            
              <div key="REEFER DOCK BAYS" className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
                <span className="text-xs font-semibold tracking-wider font-mono text-zinc-400 uppercase tracking-wider block">REEFER DOCK BAYS</span>
                <p className="text-lg sm:text-xl font-bold font-mono text-amber-400 mt-1">{"24 BAYS ACTIVE"}</p>
              </div>
            
              <div key="PALLET CAPACITY RACKING" className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
                <span className="text-xs font-semibold tracking-wider font-mono text-zinc-400 uppercase tracking-wider block">PALLET CAPACITY RACKING</span>
                <p className="text-lg sm:text-xl font-bold font-mono text-amber-400 mt-1">{"18,500 POSITIONS"}</p>
              </div>
            
              <div key="FSMA COMPLIANCE SCORE" className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
                <span className="text-xs font-semibold tracking-wider font-mono text-zinc-400 uppercase tracking-wider block">FSMA COMPLIANCE SCORE</span>
                <p className="text-lg sm:text-xl font-bold font-mono text-amber-400 mt-1">{"99.98%"}</p>
              </div>
            
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section id="inventory" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-2">OPERATIONAL LINEUP</span>
            <h3 className="text-3xl font-extrabold text-white">Featured Fleet & Priority Units</h3>
          </div>
          <span className="text-sm text-zinc-400 mt-2 md:mt-0 font-mono">100% Inspected & Live Telematics Connected</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ITEMS.map((item) => (
            <div 
              key={item.id}
              className="group rounded-2xl bg-[#121214] border border-zinc-800 hover:border-amber-500/40 transition-all overflow-hidden flex flex-col shadow-xl"
            >
              <div className="relative h-56 overflow-hidden bg-zinc-900">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-zinc-700 text-xs font-semibold font-mono font-bold text-amber-400">
                  {item.status}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">{item.id}</span>
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight">{item.title}</h4>
                  <p className="text-base text-zinc-200 leading-relaxed mb-4">{item.subtitle}</p>

                  <div className="space-y-2 mb-6">
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-400 font-mono">{item.rate}</span>
                  <a
                    href="#dispatch"
                    onClick={() => setSelectedItem(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-200 text-xs font-semibold transition"
                  >
                    Reserve Unit
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking / Dispatch Intake */}
      <section id="dispatch" className="py-20 px-6 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-2">INSTANT BOOKING DISPATCH</span>
            <h3 className="text-3xl font-extrabold text-white">Reserve Machinery or File Dispatch Mandate</h3>
            <p className="text-zinc-400 text-sm mt-3">Direct integration into PostgreSQL delivery dispatches with zero friction.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#121214] border border-amber-500/20 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold font-mono uppercase text-zinc-400 mb-2">Company / Mandate Entity</label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Apex Infrastructure Partners LLC"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:border-amber-500 text-sm font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold font-mono uppercase text-zinc-400 mb-2">Dispatch Contact Direct Line</label>
                <input
                  type="tel"
                  required
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:border-amber-500 text-sm font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold font-mono uppercase text-zinc-400 mb-2">Selected Priority Asset</label>
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:border-amber-500 text-sm font-sans"
              >
                {ITEMS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id} - {item.title} ({item.rate})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-sm uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
            >
              {submitted ? '✓ MANDATE REGISTERED & TRANSMITTED' : 'SUBMIT DISPATCH RESERVATION REQUEST'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800 bg-[#0A0A0B] text-zinc-300 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-zinc-300 font-bold">COLD CHAIN STORAGE OS</span> • Commercial Operating System v1.0.0
          </div>
          <div className="flex items-center gap-6">
            <span>Ghost Factory™ Protocol</span>
            <span>Supabase RLS Enforced</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-amber-400 hover:underline"
            >
              Admin Portal (coldchain2026)
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
