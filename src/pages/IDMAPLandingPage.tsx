import { Link } from 'react-router-dom';
import {
  Satellite, ShieldCheck, QrCode, Cpu,
  Store, TreePine, Coins, FolderKanban, ArrowRight,
  CheckCircle2, Globe, Banknote, Activity, Map,
  ExternalLink, Share2, Play, MessageCircle, Layers, ScanSearch,
  Users, FileCheck, Building2, Leaf, Target, Heart, TrendingUp,
  ArrowDown, ClipboardCheck, Scale, BarChart3, Award,
  FileText, Search, ChevronRight, Repeat, Receipt
} from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang', to: '/tentang' },
  { label: 'Platform', to: '/peta-mangrove' },
  { label: 'Marketplace', to: '/program' },
  { label: 'Dampak', to: '/dampak' },
];

const kpiCards = [
  { icon: <Globe className="w-6 h-6" />, value: '823.456', unit: 'ton CO\u2082e', label: 'Verified Carbon Potential' },
  { icon: <Coins className="w-6 h-6" />, value: 'Rp 98,65 M', unit: '', label: 'Funding Enabled' },
  { icon: <TreePine className="w-6 h-6" />, value: '1.285.760', unit: '', label: 'Trees Restored' },
  { icon: <FolderKanban className="w-6 h-6" />, value: '128', unit: '', label: 'Registered Projects' },
];

const pipelineSteps = [
  {
    step: 1,
    title: 'Project Owner / Komunitas',
    icon: <Users className="w-6 h-6" />,
    items: ['Identifikasi & rencana proyek', 'Data lahan & sosial', 'Komitmen pelestarian'],
    color: 'bg-primary',
  },
  {
    step: 2,
    title: 'ID-MAP (Feasibility & MRV)',
    icon: <Satellite className="w-6 h-6" />,
    items: ['Studi kelayakan & estimasi karbon', 'MRV (monitoring, reporting, verification)', 'Risk & impact assessment'],
    color: 'bg-primary',
  },
  {
    step: 3,
    title: 'ID-MAP (Registry Readiness)',
    icon: <FileCheck className="w-6 h-6" />,
    items: ['Penyusunan dokumen SRN', 'Template SPE-GRK', 'Metodologi & bukti pendukung', 'Quality control'],
    color: 'bg-primary',
  },
  {
    step: 4,
    title: 'Submit ke SRN (MENLHK Review)',
    icon: <ClipboardCheck className="w-6 h-6" />,
    items: ['ID-MAP submit dokumen proyek ke SRN', 'KemenLHK review & verifikasi'],
    color: 'bg-primary-dark',
  },
  {
    step: 5,
    title: 'Persetujuan & Penerbitan Unit Karbon (SRN)',
    icon: <Award className="w-6 h-6" />,
    items: ['KemenLHK menyetujui proyek', 'Unit karbon diterbitkan di SRN (serial number)'],
    color: 'bg-primary-dark',
  },
  {
    step: 6,
    title: 'Rilis di Marketplace (ID-MAP)',
    icon: <Store className="w-6 h-6" />,
    items: ['Project listing (unit karbon)', 'Informasi transparan & terverifikasi', 'Siap untuk perdagangan'],
    color: 'bg-primary',
  },
  {
    step: 7,
    title: 'Dibeli Pihak Corporate (Buyer)',
    icon: <Building2 className="w-6 h-6" />,
    items: ['Perusahaan membeli kredit karbon', 'Untuk kebutuhan Net Zero / ESG', 'Transaksi aman & transparan'],
    color: 'bg-deep',
  },
];

const intelligenceFeatures = [
  { icon: <Cpu className="w-5 h-5" />, label: 'Carbon Modeling' },
  { icon: <ShieldCheck className="w-5 h-5" />, label: 'Risk Assessment' },
  { icon: <TrendingUp className="w-5 h-5" />, label: 'Project Scoring' },
  { icon: <Activity className="w-5 h-5" />, label: 'Impact Tracking' },
];

const advantages = [
  {
    icon: <Coins className="w-6 h-6" />,
    title: 'Pendapatan Platform',
    desc: 'Fee dari onboarding proyek, MRV, transaksi marketplace, QRIS, dan langganan SaaS.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Kredibilitas & Kepercayaan',
    desc: 'Proyek terverifikasi, sesuai standar SRN dan regulasi pemerintah.',
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: 'Skalabilitas',
    desc: 'Dapat menangani banyak proyek & pembeli dalam satu platform.',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Dampak Nyata',
    desc: 'Menghubungkan pendanaan, konservasi, dan pasar karbon.',
  },
];

const revenueStreams = [
  { icon: <FileText className="w-5 h-5" />, title: 'Project Onboarding & Development Fee', desc: 'Biaya untuk feasibility, persiapan dokumen, dan pengembangan proyek.' },
  { icon: <Search className="w-5 h-5" />, title: 'MRV & Verification Fee', desc: 'Biaya monitoring, verifikasi, dan audit trail untuk menjamin kredibilitas proyek.' },
  { icon: <Store className="w-5 h-5" />, title: 'Marketplace Transaction Fee', desc: 'Komisi dari transaksi penjualan kredit karbon di marketplace.' },
  { icon: <QrCode className="w-5 h-5" />, title: 'QRIS Transaction Fee', desc: 'Biaya layanan dari setiap transaksi donasi / kontribusi masyarakat via QRIS.' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'SaaS / Data & Analytics Subscription', desc: 'Langganan dashboard, reporting, dan data intelligence untuk korporasi/NGO.' },
  { icon: <Receipt className="w-5 h-5" />, title: 'Impact & ESG Reporting Service', desc: 'Layanan pembuatan laporan dampak & ESG bagi korporasi dan investor.' },
];

const srnProcess = [
  { step: 1, title: 'Pengajuan Dokumen oleh ID-MAP', desc: 'ID-MAP siapkan & submit dokumen proyek ke SRN.' },
  { step: 2, title: 'Review Administrasi (MENLHK)', desc: 'KLHK (MENLHK) melakukan pemeriksaan kelengkapan.' },
  { step: 3, title: 'Review Teknis (MENLHK)', desc: 'Evaluasi kesesuaian metodologi, MRV, social & environmental.' },
  { step: 4, title: 'Keputusan (MENLHK)', desc: 'Disetujui / Revisi / Ditolak.' },
  { step: 5, title: 'Penerbitan Unit Karbon di SRN', desc: 'Jika disetujui, unit karbon resmi diterbitkan.' },
];

const carbonTradeSteps = [
  'Corporate membeli unit karbon di Marketplace ID-MAP',
  'Transaksi tercatat di ID-MAP (ledger)',
  'ID-MAP laporkan perpindahan kepemilikan unit ke SRN',
  'SRN mencatat transfer unit ke akun pembeli (corporate)',
  'Corporate dapat melakukan retirement unit untuk klaim ESG',
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

const impactPillars = [
  { icon: <Leaf className="w-6 h-6" />, label: 'Lindungi Ekosistem' },
  { icon: <Heart className="w-6 h-6" />, label: 'Berdayakan Komunitas' },
  { icon: <TrendingUp className="w-6 h-6" />, label: 'Dorong Ekonomi Berkelanjutan' },
  { icon: <Target className="w-6 h-6" />, label: 'Capai Target Net Zero' },
];

const partners = [
  'SRN', 'IDXCarbon', 'Verra', 'Gold Standard', 'QRIS', 'KLHK', 'BRGM',
];

const footerLinkMap: Record<string, string> = {
  'Beranda': '/',
  'Platform': '/peta-mangrove',
  'Marketplace': '/program',
  'Dampak': '/dampak',
  'Tentang ID-MAP': '/tentang',
  'Tim': '/tentang',
  'Mitra': '/tentang',
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
              <Link key={m.label} to={m.to} className="hover:text-text transition-colors duration-200">
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
              <Link key={m.label} to={m.to} className="block text-sm font-medium text-muted hover:text-text" onClick={() => setMobileMenuOpen(false)}>
                {m.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-border">
              <Link to="/user" className="flex-1">
                <button className="w-full px-4 py-2.5 text-sm font-bold border border-border rounded-xl text-muted hover:text-text cursor-pointer">Masuk</button>
              </Link>
              <Link to="/user" className="flex-1">
                <button className="w-full px-4 py-2.5 text-sm font-bold bg-primary text-white rounded-xl cursor-pointer">Daftar</button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="bg-bg" style={{ padding: '112px 24px 80px' }}>
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary mb-5" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              Pre-Market Carbon Infrastructure
            </p>
            <h1 className="text-text mb-6" style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
              Infrastruktur Digital untuk Pasar Karbon Indonesia
            </h1>
            <p className="text-muted mb-4 max-w-lg" style={{ fontSize: 16, lineHeight: 1.7 }}>
              Dari Komunitas, Oleh Komunitas, Untuk Pasar Karbon Global.
            </p>
            <p className="text-muted mb-10 max-w-lg" style={{ fontSize: 15, lineHeight: 1.7 }}>
              Menghubungkan data, verifikasi, pendanaan, dan pasar karbon untuk mendorong proyek mangrove yang berdampak dan berkelanjutan.
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

            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Satellite className="w-4 h-4" />, label: 'Satellite + AI' },
                { icon: <ShieldCheck className="w-4 h-4" />, label: 'MRV Verified' },
                { icon: <FileCheck className="w-4 h-4" />, label: 'Registry Ready' },
                { icon: <Globe className="w-4 h-4" />, label: 'Market Access' },
              ].map((badge) => (
                <span key={badge.label} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-primary bg-white border border-border rounded-full" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl border border-border p-6" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bg-soft rounded-xl flex items-center justify-center"><Layers className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="text-sm font-bold text-text">Carbon Overview</p>
                    <p className="text-xs text-muted">Real-time monitoring</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-primary bg-bg-soft rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />Live Data
                </span>
              </div>
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
              <div className="bg-bg rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-text">Carbon Estimation Trend</p>
                  <span className="text-xs text-muted">Last 12 months</span>
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {[35, 42, 38, 55, 48, 62, 58, 72, 68, 78, 82, 90].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i >= 9 ? '#16A34A' : '#EEF2F7' }} />
                  ))}
                </div>
              </div>
              <div className="bg-bg rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-text flex items-center gap-1.5"><Map className="w-3.5 h-3.5 text-primary" />Project Locations</p>
                  <span className="px-2 py-0.5 text-xs font-medium text-primary bg-bg-soft rounded-full">AI Estimated</span>
                </div>
                <div className="h-20 bg-gradient-to-br from-bg-soft to-bg rounded-lg flex items-center justify-center">
                  <div className="flex gap-4 items-center">
                    {[1, 2, 3].map((n) => (
                      <div key={n}><div className="w-3 h-3 bg-primary rounded-full" style={{ boxShadow: '0 0 0 4px rgba(22,163,74,0.2)' }} /></div>
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
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-1" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <div className="w-12 h-12 bg-bg-soft rounded-xl flex items-center justify-center text-primary mb-4">{kpi.icon}</div>
              <p className="text-3xl font-extrabold text-text">
                {kpi.value}
                {kpi.unit && <span className="text-sm font-semibold text-muted ml-1">{kpi.unit}</span>}
              </p>
              <p className="text-sm text-muted mt-1">{kpi.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7-STEP PIPELINE FLOWCHART ─── */}
      <section className="bg-bg" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary mb-3" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              Alur Platform
            </p>
            <h2 className="text-text mb-4" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}>
              Bagaimana ID-MAP Bekerja
            </h2>
            <p className="text-muted max-w-2xl mx-auto" style={{ fontSize: 16, lineHeight: 1.7 }}>
              Dari identifikasi proyek hingga perdagangan karbon — 7 langkah menuju pasar karbon yang kredibel.
            </p>
          </div>

          {/* Top Row: Steps 1-4 */}
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            {pipelineSteps.slice(0, 4).map((step, idx) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl border border-border p-5 h-full transition-all duration-200 hover:-translate-y-1" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                      {step.step}
                    </span>
                    <div className="w-8 h-8 bg-bg-soft rounded-lg flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-text mb-3 leading-snug">{step.title}</h4>
                  <ul className="space-y-1.5">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <span style={{ lineHeight: 1.5 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Connector Arrow */}
          <div className="flex justify-end pr-[12%] mb-4">
            <ArrowDown className="w-5 h-5 text-primary/40" />
          </div>

          {/* Bottom Row: Steps 5-7 */}
          <div className="grid md:grid-cols-3 gap-4 max-w-[900px] ml-auto">
            {pipelineSteps.slice(4).map((step, idx) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl border border-border p-5 h-full transition-all duration-200 hover:-translate-y-1" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                      {step.step}
                    </span>
                    <div className="w-8 h-8 bg-bg-soft rounded-lg flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-text mb-3 leading-snug">{step.title}</h4>
                  <ul className="space-y-1.5">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        <span style={{ lineHeight: 1.5 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {idx < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data Intelligence Layer */}
          <div className="mt-8 bg-white rounded-2xl border border-border p-5" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <p className="text-sm font-bold text-text">Data Intelligence Layer (AI & Analytics)</p>
              <div className="flex flex-wrap gap-4">
                {intelligenceFeatures.map((f) => (
                  <span key={f.label} className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <span className="text-primary">{f.icon}</span>{f.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted italic bg-white inline-block px-4 py-2 rounded-xl border border-border">
              Catatan: Marketplace baru dirilis setelah proyek disetujui dan unit karbon diterbitkan di SRN.
            </p>
          </div>
        </div>
      </section>

      {/* ─── KEUNTUNGAN ID-MAP ─── */}
      <section className="bg-deep text-white" style={{ padding: '60px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-primary font-bold mb-8" style={{ fontSize: 14, letterSpacing: '1px', textTransform: 'uppercase' as const }}>
            Keuntungan ID-MAP
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {advantages.map((adv) => (
              <div key={adv.title} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-3">
                  {adv.icon}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{adv.title}</h4>
                <p className="text-xs text-gray-400" style={{ lineHeight: 1.7 }}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVENUE STREAMS ─── */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary mb-3" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              Revenue Streams
            </p>
            <h2 className="text-text" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}>
              Keuntungan & Pendapatan ID-MAP
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {revenueStreams.map((rev) => (
              <div key={rev.title} className="bg-white rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-1" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                <div className="w-10 h-10 bg-bg-soft rounded-xl flex items-center justify-center text-primary mb-4">{rev.icon}</div>
                <h4 className="text-sm font-bold text-text mb-2">{rev.title}</h4>
                <p className="text-xs text-muted" style={{ lineHeight: 1.7 }}>{rev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROSES PENDAFTARAN KE SRN ─── */}
      <section className="bg-bg" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary mb-3" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              SRN Registration
            </p>
            <h2 className="text-text mb-4" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}>
              Proses Pendaftaran ke SRN
            </h2>
            <p className="text-muted max-w-xl mx-auto" style={{ fontSize: 14, lineHeight: 1.7 }}>
              ID-MAP memfasilitasi seluruh proses — persetujuan akhir tetap berada pada MENLHK (KLHK) sesuai regulasi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {srnProcess.map((s, idx) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="bg-white rounded-2xl border border-border p-4 w-52 text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                  <span className="inline-flex w-7 h-7 bg-primary text-white rounded-lg items-center justify-center text-xs font-bold mb-2">
                    {s.step}
                  </span>
                  <h4 className="text-xs font-bold text-text mb-1">{s.title}</h4>
                  <p className="text-xs text-muted" style={{ lineHeight: 1.5 }}>{s.desc}</p>
                </div>
                {idx < srnProcess.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-primary/40 hidden md:block shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ALUR CARBON TRADE CORPORATE ─── */}
      <section className="bg-white" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary mb-3" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              Carbon Trade Cycle
            </p>
            <h2 className="text-text mb-4" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}>
              Alur Data Setelah Pembelian oleh Corporate
            </h2>
          </div>

          <div className="bg-bg rounded-3xl border border-border p-8" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
            <div className="flex flex-wrap justify-center items-start gap-4">
              {carbonTradeSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="bg-white rounded-2xl border border-border p-4 w-44 text-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-2">
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-xs text-text font-medium" style={{ lineHeight: 1.5 }}>{step}</p>
                  </div>
                  {idx < carbonTradeSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-primary/40 hidden md:block shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-xs font-semibold text-primary">
                <Repeat className="w-4 h-4" />
                Diulang Setiap Tahun
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY ID-MAP ─── */}
      <section className="bg-bg" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary mb-3" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              Nilai Tambah
            </p>
            <h2 className="text-text" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}>
              Nilai Tambah ID-MAP
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl border border-border p-6 transition-all duration-200 hover:-translate-y-1" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                <div className="w-14 h-14 bg-bg-soft rounded-2xl flex items-center justify-center text-primary mb-5">{card.icon}</div>
                <h3 className="text-base font-bold text-text mb-2">{card.title}</h3>
                <p className="text-sm text-muted" style={{ lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMPACT ─── */}
      <section className="bg-deep text-white" style={{ padding: '80px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary mb-3" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const }}>Impact</p>
            <h2 className="text-white" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}>
              Dampak Nyata untuk Bumi
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl border border-white/10 bg-white/5">
                <p className="text-4xl font-extrabold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {impactPillars.map((pillar) => (
              <div key={pillar.label} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">{pillar.icon}</div>
                <span className="font-medium">{pillar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
      <section className="bg-white" style={{ padding: '60px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-sm text-muted mb-8 font-semibold">Didukung & Dipercaya Oleh</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((p) => (
              <span key={p} className="px-6 py-3 bg-bg rounded-2xl text-text font-bold text-sm border border-border" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-deep" style={{ padding: '80px 24px' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.8px' }}>
            Siap Membangun Infrastruktur Karbon?
          </h2>
          <p className="text-gray-400 mb-4" style={{ fontSize: 16, lineHeight: 1.7 }}>
            Kami membangun jembatan antara komunitas, proyek, dan pasar karbon dengan data, teknologi, dan transparansi.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/user">
              <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                Daftar Sekarang <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/admin">
              <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold border-2 border-white/20 text-white bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                Lihat Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-deep border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <Link to="/" className="text-xl font-extrabold text-primary">ID-MAP</Link>
              <p className="text-xs text-gray-400 mt-2">Pre-Market Carbon<br />Infrastructure Platform</p>
              <div className="flex gap-3 mt-4">
                {[ExternalLink, Share2, Play, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: 'Platform', links: ['Beranda', 'Platform', 'Marketplace', 'Dampak'] },
              { title: 'Tentang', links: ['Tentang ID-MAP', 'Tim', 'Mitra'] },
              { title: 'Bantuan', links: ['FAQ', 'Panduan', 'Kontak Kami', 'Kebijakan Privasi'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><Link to={footerLinkMap[l] || '/'} className="text-sm text-gray-400 hover:text-white transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 mt-12 pt-6 text-center text-xs text-gray-500">
            &copy; 2024 ID-MAP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
