import { Link } from 'react-router-dom';
import {
  Satellite, ShieldCheck, QrCode, Database, Cpu, ClipboardCheck,
  LayoutDashboard, Store, TreePine, Coins, FolderKanban, ArrowRight,
  CheckCircle2, Globe, Banknote, Activity, Map,
  ExternalLink, Share2, Play, MessageCircle, Layers, ScanSearch
} from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang', to: '/tentang' },
  { label: 'Platform', to: '/peta-mangrove' },
  { label: 'Solusi', to: '/program' },
  { label: 'Marketplace', to: '/program' },
  { label: 'Dampak', to: '/dampak' },
  { label: 'Dokumentasi', to: '/edukasi' },
];

const kpiCards = [
  { icon: <Globe className="w-6 h-6" />, value: '823.456', unit: 'ton CO\u2082e', label: 'Verified Carbon Potential' },
  { icon: <Coins className="w-6 h-6" />, value: 'Rp 98,65 M', unit: '', label: 'Funding Enabled' },
  { icon: <TreePine className="w-6 h-6" />, value: '1.285.760', unit: '', label: 'Trees Restored' },
  { icon: <FolderKanban className="w-6 h-6" />, value: '128', unit: '', label: 'Registered Projects' },
];

const flowLayers = [
  {
    title: 'Data Layer',
    icon: <Database className="w-6 h-6" />,
    items: ['Satellite Imagery', 'GIS & Soil Carbon', 'Community Data'],
  },
  {
    title: 'Processing Layer',
    icon: <Cpu className="w-6 h-6" />,
    items: ['AI Biomass Estimation', 'Land Classification', 'Carbon Modeling'],
  },
  {
    title: 'MRV Layer',
    icon: <ClipboardCheck className="w-6 h-6" />,
    items: ['Monitoring', 'Verification', 'Audit Trail'],
  },
  {
    title: 'Application Layer',
    icon: <LayoutDashboard className="w-6 h-6" />,
    items: ['Dashboard', 'Project Builder', 'Marketplace'],
  },
  {
    title: 'Market Layer',
    icon: <Store className="w-6 h-6" />,
    items: ['Buyer Access', 'QRIS Integration', 'Carbon Financing'],
  },
];

const whyCards = [
  {
    icon: <ScanSearch className="w-7 h-7" />,
    title: 'Data Akurat & Terintegrasi',
    desc: 'Menggunakan satelit, GIS, dan AI untuk estimasi karbon presisi.',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: 'Transparan & Terverifikasi',
    desc: 'Sistem MRV dengan audit trail yang dapat dipercaya.',
  },
  {
    icon: <Banknote className="w-7 h-7" />,
    title: 'Akses Pendanaan Lebih Awal',
    desc: 'Menghubungkan proyek dengan pembiayaan sebelum masuk pasar.',
  },
  {
    icon: <Activity className="w-7 h-7" />,
    title: 'Dampak Nyata & Terukur',
    desc: 'Monitoring berbasis data untuk memastikan hasil nyata.',
  },
];

const impactStats = [
  { value: '15+', label: 'Provinsi Terjangkau' },
  { value: '2.145 ha', label: 'Area Terpulihkan' },
  { value: '432', label: 'Kelompok Masyarakat Terlibat' },
  { value: '78%', label: 'Tingkat Kelangsungan Hidup' },
];

const partners = [
  'KLHK', 'BRGM', 'Bank Indonesia', 'UNDP', 'World Bank', 'GIZ',
];

const footerLinkMap: Record<string, string> = {
  'Beranda': '/',
  'Platform': '/peta-mangrove',
  'Marketplace': '/program',
  'Dampak': '/dampak',
  'Dokumentasi': '/edukasi',
  'Tentang ID-MAP': '/tentang',
  'Tim': '/tentang',
  'Mitra': '/tentang',
  'Karir': '/tentang',
  'FAQ': '/edukasi',
  'Panduan': '/edukasi',
  'Kontak Kami': '/tentang',
  'Kebijakan Privasi': '/tentang',
};

export default function IDMAPLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-text">
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-primary tracking-tight">ID-MAP</Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted">
            {navLinks.map((m) => (
              <Link
                key={m.label}
                to={m.to}
                className="hover:text-text transition-colors duration-200"
              >
                {m.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/user">
              <button className="px-4 py-2 text-sm font-bold text-muted hover:text-text transition-colors cursor-pointer">
                Masuk
              </button>
            </Link>
            <Link to="/user">
              <button className="px-5 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 cursor-pointer">
                Daftar Sekarang
              </button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-muted cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-6 py-4 space-y-3">
            {navLinks.map((m) => (
              <Link
                key={m.label}
                to={m.to}
                className="block text-sm font-medium text-muted hover:text-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                {m.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-border">
              <Link to="/user" className="flex-1">
                <button className="w-full px-4 py-2.5 text-sm font-bold border border-border rounded-xl text-muted hover:text-text cursor-pointer">
                  Masuk
                </button>
              </Link>
              <Link to="/user" className="flex-1">
                <button className="w-full px-4 py-2.5 text-sm font-bold bg-primary text-white rounded-xl cursor-pointer">
                  Daftar
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-28 pb-20 bg-bg" style={{ padding: '112px 24px 80px' }}>
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="text-primary mb-5"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}
            >
              Pre-Market Carbon Infrastructure
            </p>
            <h1
              className="text-text mb-6"
              style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px' }}
            >
              Infrastruktur Digital untuk Pasar Karbon Indonesia
            </h1>
            <p
              className="text-muted mb-10 max-w-lg"
              style={{ fontSize: 16, lineHeight: 1.7 }}
            >
              Menghubungkan data satelit, verifikasi lapangan, dan pembiayaan karbon dalam satu platform terintegrasi.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/peta-mangrove">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  Jelajahi Platform <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/admin">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold border-2 border-primary text-primary bg-white rounded-xl hover:bg-bg-soft transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  Lihat Demo Dashboard
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <ShieldCheck className="w-4 h-4" />, label: 'MRV Verified' },
                { icon: <Satellite className="w-4 h-4" />, label: 'Satellite + AI Driven' },
                { icon: <QrCode className="w-4 h-4" />, label: 'Marketplace & QRIS Ready' },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-primary bg-white border border-border rounded-full"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Visual — Dashboard Mockup */}
          <div className="hidden lg:block">
            <div
              className="bg-white rounded-2xl border border-border p-6"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bg-soft rounded-xl flex items-center justify-center">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">Carbon Overview</p>
                    <p className="text-xs text-muted">Real-time monitoring</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-primary bg-bg-soft rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Live Data
                </span>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Total Carbon', val: '823K ton', delta: '+12.3%' },
                  { label: 'Projects', val: '128', delta: '+8 new' },
                  { label: 'Funding', val: 'Rp 98.6M', delta: '+23.1%' },
                ].map((s) => (
                  <div key={s.label} className="bg-bg rounded-xl p-3">
                    <p className="text-xs text-muted">{s.label}</p>
                    <p className="text-lg font-bold text-text">{s.val}</p>
                    <p className="text-xs font-semibold text-primary">{s.delta}</p>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="bg-bg rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-text">Carbon Estimation Trend</p>
                  <span className="text-xs text-muted">Last 12 months</span>
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {[35, 42, 38, 55, 48, 62, 58, 72, 68, 78, 82, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 11 ? '#16A34A' : i >= 9 ? '#16A34A' + '80' : '#EEF2F7',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-bg rounded-xl p-4 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-text flex items-center gap-1.5">
                    <Map className="w-3.5 h-3.5 text-primary" />
                    Project Locations
                  </p>
                  <span className="px-2 py-0.5 text-xs font-medium text-primary bg-bg-soft rounded-full">
                    AI Estimated
                  </span>
                </div>
                <div className="h-20 bg-gradient-to-br from-bg-soft to-bg rounded-lg flex items-center justify-center">
                  <div className="flex gap-4 items-center">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="relative">
                        <div
                          className="w-3 h-3 bg-primary rounded-full"
                          style={{ boxShadow: '0 0 0 4px rgba(22,163,74,0.2)' }}
                        />
                      </div>
                    ))}
                    <span className="text-xs text-muted ml-2">128 active projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KPI CARDS ─── */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((kpi) => (
              <div
                key={kpi.label}
                className="bg-white rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-1"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="w-12 h-12 bg-bg-soft rounded-xl flex items-center justify-center text-primary mb-4">
                  {kpi.icon}
                </div>
                <p className="text-3xl font-extrabold text-text">
                  {kpi.value}
                  {kpi.unit && <span className="text-sm font-semibold text-muted ml-1">{kpi.unit}</span>}
                </p>
                <p className="text-sm text-muted mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW ID-MAP WORKS ─── */}
      <section className="bg-bg" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-primary mb-3"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}
            >
              System Architecture
            </p>
            <h2
              className="text-text"
              style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}
            >
              How ID-MAP Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {flowLayers.map((layer, idx) => (
              <div key={layer.title} className="relative">
                <div
                  className="bg-white rounded-2xl border border-border p-6 h-full transition-all duration-200 hover:-translate-y-1"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
                >
                  <div className="w-12 h-12 bg-bg-soft rounded-xl flex items-center justify-center text-primary mb-4">
                    {layer.icon}
                  </div>
                  <h3 className="text-sm font-bold text-text mb-3">{layer.title}</h3>
                  <ul className="space-y-2">
                    {layer.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span style={{ lineHeight: 1.7 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {idx < flowLayers.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Flow Labels */}
          <div className="hidden lg:flex justify-between mt-6 px-8">
            {['DATA', 'PROCESSING', 'MRV', 'APPLICATION', 'MARKET'].map((label) => (
              <span
                key={label}
                className="text-primary text-center flex-1"
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DASHBOARD PREVIEW ─── */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-primary mb-3"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}
            >
              Platform Preview
            </p>
            <h2
              className="text-text mb-4"
              style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}
            >
              Dashboard yang Powerful & Intuitif
            </h2>
            <p className="text-muted max-w-2xl mx-auto" style={{ fontSize: 16, lineHeight: 1.7 }}>
              Kelola proyek karbon, pantau data real-time, dan akses marketplace dalam satu interface yang terintegrasi.
            </p>
          </div>

          <div
            className="bg-bg rounded-3xl border border-border p-8 lg:p-12"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}
          >
            {/* Dashboard Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['Carbon Overview', 'Map Preview', 'Carbon Estimation', 'Project Status', 'Marketplace'].map((tab, i) => (
                <span
                  key={tab}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                    i === 0
                      ? 'bg-primary text-white'
                      : 'bg-white text-muted border border-border hover:text-text'
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Project Overview */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Verified Carbon', val: '823.4K ton', icon: <Globe className="w-4 h-4" />, badge: 'Verified' },
                    { label: 'Active Projects', val: '128', icon: <FolderKanban className="w-4 h-4" />, badge: 'Live Data' },
                    { label: 'Total Funding', val: 'Rp 98.6M', icon: <Coins className="w-4 h-4" />, badge: 'AI Estimated' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl border border-border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-bg-soft rounded-lg flex items-center justify-center text-primary">{s.icon}</div>
                        <span className="text-xs font-semibold text-primary bg-bg-soft px-2 py-0.5 rounded-full">{s.badge}</span>
                      </div>
                      <p className="text-xl font-bold text-text">{s.val}</p>
                      <p className="text-xs text-muted mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl border border-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-bold text-text">Carbon Estimation Chart</p>
                      <p className="text-xs text-muted">Monthly estimation trend</p>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-primary rounded-full" /> Estimated</span>
                      <span className="flex items-center gap-1.5 text-muted"><span className="w-2 h-2 bg-border rounded-full" /> Verified</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[30, 45, 38, 52, 48, 60, 55, 70, 65, 75, 80, 88].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-0.5">
                        <div
                          className="rounded-t-sm"
                          style={{ height: `${h * 0.6}%`, background: '#16A34A' + (i >= 10 ? 'FF' : '60') }}
                        />
                        <div
                          className="rounded-t-sm"
                          style={{ height: `${h * 0.35}%`, background: '#EEF2F7' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Map + Status */}
              <div className="space-y-6">
                {/* Map Preview */}
                <div className="bg-white rounded-2xl border border-border p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-text flex items-center gap-1.5">
                      <Map className="w-4 h-4 text-primary" />
                      Map Preview
                    </p>
                  </div>
                  <div className="h-36 bg-gradient-to-br from-bg-soft via-bg to-white rounded-xl border border-border flex items-center justify-center relative">
                    {[
                      { x: 25, y: 30 }, { x: 55, y: 45 }, { x: 70, y: 25 },
                      { x: 40, y: 60 }, { x: 80, y: 55 },
                    ].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute w-2.5 h-2.5 bg-primary rounded-full"
                        style={{
                          left: `${pos.x}%`,
                          top: `${pos.y}%`,
                          boxShadow: '0 0 0 4px rgba(22,163,74,0.15)',
                        }}
                      />
                    ))}
                    <p className="text-xs text-muted">Indonesia Region</p>
                  </div>
                </div>

                {/* Project Status */}
                <div className="bg-white rounded-2xl border border-border p-5">
                  <p className="text-sm font-bold text-text mb-4">Project Status</p>
                  <div className="space-y-3">
                    {[
                      { name: 'Kalimantan Barat', status: 'Active', pct: 78 },
                      { name: 'Sulawesi Selatan', status: 'Verified', pct: 92 },
                      { name: 'Papua Barat', status: 'Pending', pct: 45 },
                    ].map((p) => (
                      <div key={p.name}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium text-text">{p.name}</p>
                          <span className={`text-xs font-semibold ${
                            p.status === 'Active' ? 'text-primary' :
                            p.status === 'Verified' ? 'text-primary-dark' : 'text-muted'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-bg rounded-full">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${p.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Marketplace Mini */}
                <div className="bg-white rounded-2xl border border-border p-5">
                  <p className="text-sm font-bold text-text mb-3 flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-primary" />
                    Marketplace
                  </p>
                  <div className="space-y-2">
                    {[
                      { name: 'Blue Carbon Credit', price: 'Rp 125K/ton' },
                      { name: 'Mangrove Offset', price: 'Rp 98K/ton' },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="text-xs text-text font-medium">{item.name}</span>
                        <span className="text-xs font-bold text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY ID-MAP ─── */}
      <section className="bg-bg" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-primary mb-3"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}
            >
              Keunggulan
            </p>
            <h2
              className="text-text"
              style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}
            >
              Why ID-MAP
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-1"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
              >
                <div className="w-14 h-14 bg-bg-soft rounded-2xl flex items-center justify-center text-primary mb-5">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-text mb-2">{card.title}</h3>
                <p className="text-sm text-muted" style={{ lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMPACT SECTION ─── */}
      <section className="bg-deep text-white" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-primary mb-3"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}
            >
              Impact
            </p>
            <h2
              className="text-white"
              style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}
            >
              Dampak Nyata untuk Bumi
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mt-4" style={{ fontSize: 16, lineHeight: 1.7 }}>
              ID-MAP menghasilkan dampak terukur melalui infrastruktur digital untuk ekosistem karbon Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-white/10 bg-white/5"
              >
                <p className="text-4xl font-extrabold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNERS / ECOSYSTEM ─── */}
      <section className="bg-white" style={{ padding: '60px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-sm text-muted mb-8 font-semibold" style={{ letterSpacing: '0.5px' }}>
            Didukung & Dipercaya Oleh
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((p) => (
              <span
                key={p}
                className="px-6 py-3 bg-bg rounded-2xl text-text font-bold text-sm border border-border"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-bg" style={{ padding: '80px 24px' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="text-text mb-4"
            style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}
          >
            Siap Membangun Infrastruktur Karbon?
          </h2>
          <p className="text-muted mb-10 max-w-lg mx-auto" style={{ fontSize: 16, lineHeight: 1.7 }}>
            Bergabung dengan ID-MAP dan mulai kelola proyek karbon Anda dengan teknologi yang terpercaya.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/user">
              <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                Daftar Sekarang <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/admin">
              <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold border-2 border-primary text-primary bg-white rounded-xl hover:bg-bg-soft transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                Lihat Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-deep border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-1">
              <Link to="/" className="text-xl font-extrabold text-primary">ID-MAP</Link>
              <p className="text-xs text-gray-400 mt-2">
                Pre-Market Carbon<br />Infrastructure Platform
              </p>
              <div className="flex gap-3 mt-4">
                {[ExternalLink, Share2, Play, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: 'Platform', links: ['Beranda', 'Platform', 'Marketplace', 'Dampak', 'Dokumentasi'] },
              { title: 'Tentang', links: ['Tentang ID-MAP', 'Tim', 'Mitra', 'Karir'] },
              { title: 'Bantuan', links: ['FAQ', 'Panduan', 'Kontak Kami', 'Kebijakan Privasi'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to={footerLinkMap[l] || '/'}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="font-semibold text-sm text-white mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>info@id-map.co.id</p>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-6 text-center text-xs text-gray-500">
            &copy; 2024 ID-MAP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
