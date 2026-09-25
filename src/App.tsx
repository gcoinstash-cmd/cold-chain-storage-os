import React, { useState } from 'react';
import { 
  Thermometer, Shield, Award, ArrowRight, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Compass, Fuel, Gauge,
  Clock, Truck, Box, Snowflake, AlertTriangle, X
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface DockSlot {
  dock: string;
  time: string;
  tempClass: 'DEEP FREEZE (-20°F)' | 'CHILLED PRODUCE (34°F)' | 'PHARMA COLD (38°F)' | 'CONTROLLED AMBIENT (55°F)';
  status: 'COOLING' | 'STAGING' | 'READY' | 'OCCUPIED';
  carrier: string;
  pallets: number;
}

const DOCK_MATRIX: DockSlot[] = [
  { dock: "BAY 01", time: "06:00 - 08:00", tempClass: "DEEP FREEZE (-20°F)", status: "OCCUPIED", carrier: "Swift Cold #4112", pallets: 26 },
  { dock: "BAY 01", time: "08:00 - 10:00", tempClass: "DEEP FREEZE (-20°F)", status: "COOLING", carrier: "Lineage Direct #902", pallets: 24 },
  { dock: "BAY 01", time: "10:00 - 12:00", tempClass: "DEEP FREEZE (-20°F)", status: "READY", carrier: "Unassigned", pallets: 28 },
  
  { dock: "BAY 02", time: "06:00 - 08:00", tempClass: "CHILLED PRODUCE (34°F)", status: "READY", carrier: "Unassigned", pallets: 26 },
  { dock: "BAY 02", time: "08:00 - 10:00", tempClass: "CHILLED PRODUCE (34°F)", status: "STAGING", carrier: "Driscoll Berry Exp", pallets: 22 },
  { dock: "BAY 02", time: "10:00 - 12:00", tempClass: "CHILLED PRODUCE (34°F)", status: "OCCUPIED", carrier: "FreshDirect #18", pallets: 26 },

  { dock: "BAY 03", time: "06:00 - 08:00", tempClass: "PHARMA COLD (38°F)", status: "STAGING", carrier: "Pfizer Bio Cold #09", pallets: 14 },
  { dock: "BAY 03", time: "08:00 - 10:00", tempClass: "PHARMA COLD (38°F)", status: "READY", carrier: "Unassigned", pallets: 18 },
  { dock: "BAY 03", time: "10:00 - 12:00", tempClass: "PHARMA COLD (38°F)", status: "COOLING", carrier: "McKesson Med Line", pallets: 16 },

  { dock: "BAY 04", time: "06:00 - 08:00", tempClass: "CONTROLLED AMBIENT (55°F)", status: "READY", carrier: "Unassigned", pallets: 30 },
  { dock: "BAY 04", time: "08:00 - 10:00", tempClass: "CONTROLLED AMBIENT (55°F)", status: "OCCUPIED", carrier: "Constellation Wine", pallets: 28 },
  { dock: "BAY 04", time: "10:00 - 12:00", tempClass: "CONTROLLED AMBIENT (55°F)", status: "STAGING", carrier: "Napa Reserve Float", pallets: 24 }
];

export default function App() {
  const [selectedTemp, setSelectedTemp] = useState<string>('ALL');
  const [selectedSlot, setSelectedSlot] = useState<DockSlot | null>(null);
  const [carrierInput, setCarrierInput] = useState('');
  const [palletInput, setPalletInput] = useState(24);
  const [confirmedReservation, setConfirmedReservation] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const filtered = DOCK_MATRIX.filter(slot => 
    selectedTemp === 'ALL' || slot.tempClass.includes(selectedTemp)
  );

  const handleSelectSlot = (slot: DockSlot) => {
    setSelectedSlot(slot);
    setCarrierInput(slot.carrier !== 'Unassigned' ? slot.carrier : '');
    setConfirmedReservation(false);
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-zinc-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0E1017] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold tracking-wider text-cyan-400 flex items-center gap-2 text-base">
            <Snowflake size={18} /> CRYO-DOCK // COLD CHAIN STORAGE & DOCK RESERVATION MATRIX
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 uppercase text-xs">ARCHETYPE D: TIMELINE & STATION RESERVATION GRID</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Thermometer size={14} />
            <span>FDA FSMA & USDA SANITARY TRANSPORT COMPLIANT</span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ DOCK MASTER PASS ]
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-8 space-y-8">
        {/* Status Chips Legend & Temperature Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Clock className="text-cyan-400" /> Real-Time Bay Schedule & Temperature Grid
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Select an open or cooling dock slot to assign carrier bill of lading and trigger automated pre-cooling telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> READY</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> COOLING</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> STAGING</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> OCCUPIED</div>
          </div>
        </div>

        {/* Temperature Zone Filter Pills */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {['ALL', 'DEEP FREEZE', 'CHILLED PRODUCE', 'PHARMA COLD', 'CONTROLLED AMBIENT'].map(t => (
            <button
              key={t}
              onClick={() => setSelectedTemp(t)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                selectedTemp === t
                  ? 'bg-cyan-400 text-black border-cyan-400 font-black'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* The 24-Hour Dock Reservation Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((slot, index) => (
            <div 
              key={`${slot.dock}-${slot.time}`}
              onClick={() => handleSelectSlot(slot)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer bg-[#11131A] hover:border-cyan-500/60 relative flex flex-col justify-between ${
                selectedSlot?.dock === slot.dock && selectedSlot?.time === slot.time 
                  ? 'border-cyan-400 ring-2 ring-cyan-400/30' 
                  : 'border-zinc-800'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-sm font-black text-white">{slot.dock}</span>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-black tracking-wider ${
                    slot.status === 'READY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                    slot.status === 'COOLING' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                    slot.status === 'STAGING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                    {slot.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-cyan-300 font-bold mb-1 flex items-center gap-1.5">
                  <Thermometer size={14} />
                  <span>{slot.tempClass}</span>
                </div>

                <div className="text-xs text-zinc-400 font-mono mb-4 flex items-center gap-1.5">
                  <Clock size={14} className="text-zinc-500" />
                  <span>{slot.time}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex justify-between items-center text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block text-[10px]">CARRIER</span>
                  <span className="text-zinc-200 font-bold truncate max-w-[140px] block">{slot.carrier}</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block text-[10px]">PALLET CAPACITY</span>
                  <span className="text-white font-bold">{slot.pallets} Pallets</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Dock Reservation Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#12141C] border border-cyan-500/50 w-full max-w-md rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-sm relative">
            <button 
              onClick={() => setSelectedSlot(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                DOCK BAY RESERVATION DECK
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                {selectedSlot.dock} — {selectedSlot.time}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">{selectedSlot.tempClass}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 uppercase">Carrier / Fleet Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Knight-Swift Cold Chain"
                  value={carrierInput}
                  onChange={e => setCarrierInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-400 outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 uppercase">Inbound Pallet Tally</label>
                <input 
                  type="number"
                  value={palletInput}
                  onChange={e => setPalletInput(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-400 outline-none min-h-[44px]"
                />
              </div>
            </div>

            {confirmedReservation ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl text-center text-xs font-bold space-y-1">
                <div>✓ DOCK APPOINTMENT LOCKED & TELEMETRY SYNCED</div>
                <div className="text-[11px] text-zinc-300">RFID barcode dispatched to driver cell.</div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmedReservation(true)}
                className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-400/20 cursor-pointer min-h-[44px]"
              >
                CONFIRM BAY RESERVATION
              </button>
            )}
          </div>
        </div>
      )}

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
