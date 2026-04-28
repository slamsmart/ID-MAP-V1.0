import { useState } from 'react';
import {
  LayoutDashboard, Users, MapPin, CreditCard, TreePine, ClipboardCheck,
  BarChart3, Award, Settings, Sprout, Wind, DollarSign,
  CheckCircle2, Clock, XCircle, AlertCircle, Eye, FileText, Search,
  QrCode, Download, Plus, UserPlus, Calendar, Shield, KeyRound, Link2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import GenerateQRISModal from '../components/GenerateQRISModal';

const roleBadgeColors: Record<string, string> = {
  kontributor: 'bg-green-50 text-green-600 border-green-200',
  verifikator: 'bg-amber-50 text-amber-600 border-amber-200',
  csr_partner: 'bg-blue-50 text-blue-600 border-blue-200',
  admin: 'bg-purple-50 text-purple-600 border-purple-200',
};

const roleLabels: Record<string, string> = {
  kontributor: 'Kontributor',
  verifikator: 'Verifikator',
  csr_partner: 'CSR Partner',
  admin: 'Admin',
};

const menuItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/admin' },
  { icon: <Users className="w-5 h-5" />, label: 'Manajemen Pengguna' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Program & Lokasi' },
  { icon: <CreditCard className="w-5 h-5" />, label: 'Pembayaran (QRIS)' },
  { icon: <TreePine className="w-5 h-5" />, label: 'Data Mangrove' },
  { icon: <ClipboardCheck className="w-5 h-5" />, label: 'Monitoring & Validasi' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Laporan & Analitik' },
  { icon: <Award className="w-5 h-5" />, label: 'Sertifikat' },
  { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan Sistem' },
];

const trendData = [
  { month: 'Jan', value: 30 }, { month: 'Feb', value: 38 }, { month: 'Mar', value: 45 },
  { month: 'Apr', value: 42 }, { month: 'Mei', value: 55 }, { month: 'Jun', value: 60 },
  { month: 'Jul', value: 65 }, { month: 'Agu', value: 72 }, { month: 'Sep', value: 78 },
  { month: 'Okt', value: 85 }, { month: 'Nov', value: 90 }, { month: 'Des', value: 98 },
];

const pieData = [
  { name: 'Individu', value: 45 },
  { name: 'CSR Perusahaan', value: 35 },
  { name: 'Komunitas', value: 15 },
  { name: 'Lainnya', value: 5 },
];
const PIE_COLORS = ['#23C16B', '#B7FF2A', '#063C38', '#6B7280'];

const programs = [
  { name: 'Restorasi Teluk Bintuni', loc: 'Papua Barat', bibit: '250.000', dana: 'Rp 18,45 M', progress: 75 },
  { name: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah', bibit: '180.000', dana: 'Rp 12,30 M', progress: 43 },
  { name: 'TN Sembilang', loc: 'Sumatera Selatan', bibit: '320.000', dana: 'Rp 23,10 M', progress: 80 },
  { name: 'Kecamatan Kwandang', loc: 'Gorontalo Utara', bibit: '150.000', dana: 'Rp 9,80 M', progress: 40 },
];

const activities = [
  { text: 'Donasi baru Rp 250.000 via QRIS', time: '2 menit lalu', color: 'bg-mangrove-fresh' },
  { text: 'Program TN Sembilang diperbarui', time: '15 menit lalu', color: 'bg-blue-500' },
  { text: 'Verifikasi lokasi selesai', time: '30 menit lalu', color: 'bg-amber-500' },
  { text: 'Sertifikat diterbitkan', time: '1 jam lalu', color: 'bg-purple-500' },
];

/* project checking data */
const projectChecks = [
  { id: 'PRJ-001', name: 'Restorasi Teluk Bintuni', loc: 'Papua Barat', status: 'Aktif', bibit: '250.000', dana: 'Rp 16,45 M', progress: 75, verifikasi: 'Terverifikasi', lastUpdate: '24 Mei 2024', badge: 'green' as const },
  { id: 'PRJ-002', name: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah', status: 'Verifikasi', bibit: '180.000', dana: 'Rp 12,30 M', progress: 43, verifikasi: 'Menunggu', lastUpdate: '22 Mei 2024', badge: 'yellow' as const },
  { id: 'PRJ-003', name: 'TN Sembilang', loc: 'Sumatera Selatan', status: 'Aktif', bibit: '320.000', dana: 'Rp 23,10 M', progress: 80, verifikasi: 'Terverifikasi', lastUpdate: '20 Mei 2024', badge: 'green' as const },
  { id: 'PRJ-004', name: 'Kecamatan Kwandang', loc: 'Gorontalo Utara', status: 'Aktif', bibit: '150.000', dana: 'Rp 9,80 M', progress: 40, verifikasi: 'Proses', lastUpdate: '18 Mei 2024', badge: 'blue' as const },
  { id: 'PRJ-005', name: 'Teluk Balikpapan', loc: 'Kalimantan Timur', status: 'Monitoring', bibit: '95.000', dana: 'Rp 7,20 M', progress: 62, verifikasi: 'Terverifikasi', lastUpdate: '16 Mei 2024', badge: 'green' as const },
  { id: 'PRJ-006', name: 'Segara Anakan', loc: 'Cilacap, Jawa Tengah', status: 'Restorasi', bibit: '120.000', dana: 'Rp 8,75 M', progress: 58, verifikasi: 'Menunggu', lastUpdate: '14 Mei 2024', badge: 'yellow' as const },
  { id: 'PRJ-007', name: 'Nusa Lembongan', loc: 'Bali', status: 'Aktif', bibit: '75.000', dana: 'Rp 4,60 M', progress: 55, verifikasi: 'Terverifikasi', lastUpdate: '12 Mei 2024', badge: 'green' as const },
  { id: 'PRJ-008', name: 'Pulau Rupat', loc: 'Riau', status: 'Verifikasi', bibit: '110.000', dana: 'Rp 6,90 M', progress: 47, verifikasi: 'Menunggu', lastUpdate: '10 Mei 2024', badge: 'yellow' as const },
];

const verificationQueue = [
  { id: 'VRF-001', project: 'Desa Timbulsloko', type: 'Verifikasi Penanaman', submitted: '22 Mei 2024', officer: 'Bambang S.', photos: 8, status: 'Menunggu', badge: 'yellow' as const },
  { id: 'VRF-002', project: 'Segara Anakan', type: 'Verifikasi Monitoring', submitted: '20 Mei 2024', officer: 'Sari W.', photos: 12, status: 'Menunggu', badge: 'yellow' as const },
  { id: 'VRF-003', project: 'Pulau Rupat', type: 'Verifikasi Penanaman', submitted: '18 Mei 2024', officer: 'Dedi M.', photos: 6, status: 'Proses', badge: 'blue' as const },
  { id: 'VRF-004', project: 'Kecamatan Kwandang', type: 'Verifikasi Survival Rate', submitted: '16 Mei 2024', officer: 'Rina A.', photos: 10, status: 'Proses', badge: 'blue' as const },
];

/* ─── Role management data ─── */
const roleData = [
  { name: 'Super Admin', desc: 'Semua akses', users: 2, color: 'text-red-500 bg-red-50 border-red-200' },
  { name: 'Admin', desc: 'Kelola data, pengguna, laporan', users: 10, color: 'text-purple-500 bg-purple-50 border-purple-200' },
  { name: 'Verifikator', desc: 'Verifikasi lapangan, input data', users: 156, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  { name: 'Kontributor', desc: 'Donasi, lihat program, sertifikat', users: 10234, color: 'text-green-500 bg-green-50 border-green-200' },
  { name: 'CSR Partner', desc: 'Donasi korporat, laporan dampak', users: 2054, color: 'text-blue-500 bg-blue-50 border-blue-200' },
];

export default function IDMAPAdminDashboard() {
  const convexUsers = useQuery(api.users.listUsers);
  const [tab, setTab] = useState<'overview' | 'projects' | 'verification'>('overview');
  const [showQRIS, setShowQRIS] = useState(false);
  const [showTambahProgram, setShowTambahProgram] = useState(false);
  const [showUndangVerifikator, setShowUndangVerifikator] = useState(false);
  const [showExportData, setShowExportData] = useState(false);
  const [showJadwalOnboarding, setShowJadwalOnboarding] = useState(false);
  const [showTerbitkanBaru, setShowTerbitkanBaru] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [programSubmitted, setProgramSubmitted] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [sertifikatPublished, setSertifikatPublished] = useState(false);

  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="admin" menuItems={menuItems} />
      <GenerateQRISModal isOpen={showQRIS} onClose={() => setShowQRIS(false)} />

      <div className="ml-0 lg:ml-56">
        <DashboardTopbar userName="Admin ID-MAP" userRole="Administrator" />

        <main className="p-4 lg:p-6">
          {/* Top action bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <h1 className="text-lg lg:text-xl font-bold text-mangrove-deep">Dashboard Admin</h1>
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="sm" onClick={() => { setExportDone(false); setShowExportData(true); }}>
                <Download className="w-3.5 h-3.5" /> Export
              </Button>
              <Button variant="neon" size="sm" onClick={() => setShowQRIS(true)}>
                <QrCode className="w-3.5 h-3.5" /> Generate QRIS
              </Button>
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex gap-1 mb-5 bg-gray-50 rounded-lg p-0.5 border border-gray-100/60 w-full sm:w-fit overflow-x-auto">
            {[
              { key: 'overview' as const, label: 'Ringkasan', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
              { key: 'projects' as const, label: 'Cek Proyek', icon: <Search className="w-3.5 h-3.5" /> },
              { key: 'verification' as const, label: 'Verifikasi', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  tab === t.key ? 'bg-white text-mangrove-deep shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <StatCard icon={<Users className="w-5 h-5" />} label="Total Pengguna" value="12.456" delta="+8,5%" />
                <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Donasi (QRIS)" value="Rp 98,65 M" delta="+12,3%" />
                <StatCard icon={<Sprout className="w-5 h-5" />} label="Bibit Ditanam" value="1.285.760" delta="+15,2%" />
                <StatCard icon={<Wind className="w-5 h-5" />} label="Serapan Karbon" value="823.456 ton" delta="+10,1%" />
              </div>

              {/* Charts + Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
                <Card className="col-span-1 lg:col-span-5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-mangrove-deep">Tren Kontribusi (QRIS)</h3>
                    <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-mangrove-muted">
                      <option>Tahun Ini</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="areaGreen" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#B7FF2A" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#23C16B" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                        formatter={(v) => [`${v}M`, 'Kontribusi']}
                      />
                      <Area type="monotone" dataKey="value" stroke="#23C16B" strokeWidth={2.5} fill="url(#areaGreen)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="col-span-1 lg:col-span-3">
                  <h3 className="text-sm font-semibold text-mangrove-deep mb-4">Kontribusi per Sumber</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                        {pieData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i]} />))}
                      </Pie>
                      <Legend iconType="circle" iconSize={8} formatter={(value: string) => <span className="text-xs text-mangrove-muted">{value}</span>} />
                      <Tooltip formatter={(v) => [`${v}%`, 'Persentase']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center -mt-2">
                    <p className="text-xs text-mangrove-muted">Total</p>
                    <p className="text-xl font-bold text-mangrove-deep">Rp 98,65 M</p>
                  </div>
                </Card>

                <Card className="col-span-1 lg:col-span-4">
                  <h3 className="text-sm font-semibold text-mangrove-deep mb-6">Aktivitas Terbaru</h3>
                  <div className="space-y-5">
                    {activities.map((a, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-2.5 h-2.5 rounded-full ${a.color}`} />
                          {i < activities.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">{a.text}</p>
                          <p className="text-xs text-mangrove-muted mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Programs Table */}
              <Card>
                <h3 className="text-sm font-semibold text-mangrove-deep mb-4">Program Aktif</h3>
                <Table headers={['Program', 'Lokasi', 'Bibit Ditanam', 'Dana Terkumpul', 'Progress', 'Aksi']}>
                  {programs.map((p) => (
                    <tr key={p.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
                      <td className="py-3 px-4 text-mangrove-muted">{p.loc}</td>
                      <td className="py-3 px-4 text-mangrove-muted">{p.bibit}</td>
                      <td className="py-3 px-4 font-medium text-mangrove-deep">{p.dana}</td>
                      <td className="py-3 px-4 w-40"><ProgressBar value={p.progress} /></td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="!text-mangrove-fresh">Detail</Button>
                      </td>
                    </tr>
                  ))}
                </Table>
              </Card>
            </>
          )}

          {tab === 'projects' && (
            <>
              {/* Project checking stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <StatCard icon={<MapPin className="w-5 h-5" />} label="Total Program" value="8" />
                <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Terverifikasi" value="4" />
                <StatCard icon={<Clock className="w-5 h-5" />} label="Menunggu Verifikasi" value="3" />
                <StatCard icon={<AlertCircle className="w-5 h-5" />} label="Dalam Proses" value="1" />
              </div>

              {/* Project list with details */}
              <Card className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-mangrove-deep">Daftar Proyek & Status Verifikasi</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cari proyek..."
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none w-64"
                    />
                  </div>
                </div>
                <Table headers={['ID', 'Program', 'Lokasi', 'Status', 'Bibit', 'Dana', 'Progress', 'Verifikasi', 'Update', 'Aksi']}>
                  {projectChecks.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-3 text-xs font-mono text-mangrove-muted">{p.id}</td>
                      <td className="py-3 px-3 font-medium text-gray-800 text-sm">{p.name}</td>
                      <td className="py-3 px-3 text-sm text-mangrove-muted">{p.loc}</td>
                      <td className="py-3 px-3"><Badge variant={p.badge}>{p.status}</Badge></td>
                      <td className="py-3 px-3 text-sm text-mangrove-muted">{p.bibit}</td>
                      <td className="py-3 px-3 text-sm font-medium text-mangrove-deep">{p.dana}</td>
                      <td className="py-3 px-3 w-32"><ProgressBar value={p.progress} /></td>
                      <td className="py-3 px-3">
                        <Badge variant={p.verifikasi === 'Terverifikasi' ? 'green' : p.verifikasi === 'Proses' ? 'blue' : 'yellow'}>{p.verifikasi}</Badge>
                      </td>
                      <td className="py-3 px-3 text-xs text-mangrove-muted">{p.lastUpdate}</td>
                      <td className="py-3 px-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="!text-mangrove-fresh !px-2"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" className="!text-blue-500 !px-2"><FileText className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </Card>

              {/* Project detail panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <h3 className="text-sm font-semibold text-mangrove-deep mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-mangrove-fresh" /> Ringkasan Verifikasi
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Total Laporan Masuk</span>
                      <span className="text-sm font-bold text-mangrove-deep">24</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Disetujui</span>
                      <span className="text-sm font-bold text-mangrove-fresh">18</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Ditolak</span>
                      <span className="text-sm font-bold text-red-500">2</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-mangrove-muted">Pending</span>
                      <span className="text-sm font-bold text-amber-500">4</span>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-sm font-semibold text-mangrove-deep mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-mangrove-fresh" /> Kinerja per Lokasi
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Papua Barat', score: 92 },
                      { name: 'Sumatera Selatan', score: 88 },
                      { name: 'Kalimantan Timur', score: 78 },
                      { name: 'Jawa Tengah', score: 65 },
                    ].map((l) => (
                      <div key={l.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-mangrove-muted">{l.name}</span>
                          <span className="font-semibold text-mangrove-deep">{l.score}%</span>
                        </div>
                        <ProgressBar value={l.score} />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-sm font-semibold text-mangrove-deep mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" /> Perlu Tindakan
                  </h3>
                  <div className="space-y-3">
                    {[
                      { text: 'Desa Timbulsloko — Verifikasi tertunda 5 hari', urgency: 'high' },
                      { text: 'Pulau Rupat — Foto lapangan belum lengkap', urgency: 'medium' },
                      { text: 'Segara Anakan — Survival rate rendah', urgency: 'high' },
                    ].map((item, i) => (
                      <div key={i} className={`p-3 rounded-xl border ${item.urgency === 'high' ? 'border-red-200 bg-red-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
                        <p className="text-sm text-gray-800">{item.text}</p>
                        <Button variant="ghost" size="sm" className={`mt-2 ${item.urgency === 'high' ? '!text-red-500' : '!text-amber-500'}`}>
                          Tinjau
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}

          {tab === 'verification' && (
            <>
              {/* Verification stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <StatCard icon={<ClipboardCheck className="w-5 h-5" />} label="Antrian Verifikasi" value="4" />
                <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Disetujui (Bulan Ini)" value="18" />
                <StatCard icon={<XCircle className="w-5 h-5" />} label="Ditolak" value="2" />
                <StatCard icon={<Clock className="w-5 h-5" />} label="Rata-rata Waktu" value="3,2 hari" />
              </div>

              {/* Verification queue */}
              <Card className="mb-6">
                <h3 className="text-sm font-semibold text-mangrove-deep mb-6">Antrian Verifikasi Lapangan</h3>
                <Table headers={['ID', 'Proyek', 'Tipe', 'Tanggal Submit', 'Petugas', 'Foto', 'Status', 'Aksi']}>
                  {verificationQueue.map((v) => (
                    <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-3 text-xs font-mono text-mangrove-muted">{v.id}</td>
                      <td className="py-3 px-3 font-medium text-gray-800 text-sm">{v.project}</td>
                      <td className="py-3 px-3 text-sm text-mangrove-muted">{v.type}</td>
                      <td className="py-3 px-3 text-sm text-mangrove-muted">{v.submitted}</td>
                      <td className="py-3 px-3 text-sm text-gray-800">{v.officer}</td>
                      <td className="py-3 px-3 text-sm text-mangrove-muted">{v.photos} foto</td>
                      <td className="py-3 px-3"><Badge variant={v.badge}>{v.status}</Badge></td>
                      <td className="py-3 px-3">
                        <div className="flex gap-1">
                          <Button variant="neon" size="sm">Verifikasi</Button>
                          <Button variant="ghost" size="sm" className="!text-red-500">Tolak</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </Card>

              {/* Verification detail view */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-sm font-semibold text-mangrove-deep mb-4">Detail Verifikasi — Desa Timbulsloko</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: 'Koordinat GPS', value: '-6.8975, 110.6383', icon: <MapPin className="w-4 h-4" /> },
                      { label: 'Bibit Ditanam', value: '180.000', icon: <Sprout className="w-4 h-4" /> },
                      { label: 'Survival Rate', value: '72%', icon: <AlertCircle className="w-4 h-4" /> },
                      { label: 'Timestamp', value: '22 Mei 2024', icon: <Clock className="w-4 h-4" /> },
                    ].map((f) => (
                      <div key={f.label} className="p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 text-mangrove-fresh mb-1">{f.icon}<span className="text-xs text-mangrove-muted">{f.label}</span></div>
                        <p className="font-semibold text-sm text-gray-800">{f.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl mb-4">
                    <p className="text-xs text-mangrove-muted mb-1">Catatan Verifikator</p>
                    <p className="text-sm text-gray-800">Kondisi bibit baik. Perlu monitoring lanjutan untuk zona A3 karena tingkat pasang tinggi. Foto lengkap terlampir.</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="neon" size="md" className="flex-1"><CheckCircle2 className="w-4 h-4" /> Setujui</Button>
                    <Button variant="outline" size="md" className="flex-1 !border-red-300 !text-red-500"><XCircle className="w-4 h-4" /> Tolak</Button>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-sm font-semibold text-mangrove-deep mb-4">Foto Bukti Lapangan</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="h-32 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-xl flex items-center justify-center relative overflow-hidden">
                        <TreePine className="w-8 h-8 text-mangrove-neon/30" />
                        <span className="absolute bottom-2 left-2 text-[10px] text-white/60 bg-black/30 px-2 py-0.5 rounded">Foto {n}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-mangrove-muted mt-3 text-center">8 foto tersedia — 4 ditampilkan</p>
                </Card>
              </div>
            </>
          )}

          {/* Akses Cepat Section */}
          <Card className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-mangrove-fresh" />
              <h3 className="text-sm font-semibold text-mangrove-deep">Akses Cepat</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => { setInviteSent(false); setShowUndangVerifikator(true); }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-mangrove-mint border border-gray-100 hover:border-mangrove-fresh/20 transition-all cursor-pointer text-left"
              >
                <UserPlus className="w-5 h-5 text-mangrove-fresh" />
                <span className="text-sm font-medium text-gray-800">Undang Verifikator</span>
              </button>
              <button
                onClick={() => { setExportDone(false); setShowExportData(true); }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-mangrove-mint border border-gray-100 hover:border-mangrove-fresh/20 transition-all cursor-pointer text-left"
              >
                <Download className="w-5 h-5 text-mangrove-fresh" />
                <span className="text-sm font-medium text-gray-800">Export Data</span>
              </button>
              <button
                onClick={() => setShowJadwalOnboarding(true)}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-mangrove-mint border border-gray-100 hover:border-mangrove-fresh/20 transition-all cursor-pointer text-left"
              >
                <Calendar className="w-5 h-5 text-mangrove-fresh" />
                <span className="text-sm font-medium text-gray-800">Jadwal Onboarding</span>
              </button>
            </div>
          </Card>

          {/* Tambah Program Button */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="neon" size="md" onClick={() => { setProgramSubmitted(false); setShowTambahProgram(true); }}>
              <Plus className="w-4 h-4" /> Tambah Program
            </Button>
            <Button variant="neon" size="md" onClick={() => { setSertifikatPublished(false); setShowTerbitkanBaru(true); }}>
              <Plus className="w-4 h-4" /> Terbitkan Baru
            </Button>
          </div>

          {/* Manajemen Role Section */}
          <Card className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <KeyRound className="w-5 h-5 text-mangrove-fresh" />
              <h3 className="text-sm font-semibold text-mangrove-deep">Manajemen Role</h3>
            </div>
            <div className="space-y-3">
              {roleData.map((role) => (
                <div key={role.name} className={`flex items-center justify-between p-4 rounded-xl border ${role.color}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${role.color}`}>{role.name}</span>
                    <div>
                      <p className="text-sm text-gray-700">{role.desc}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" /> {role.users.toLocaleString()} pengguna</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"><Settings className="w-4 h-4 text-gray-400" /></button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm font-semibold text-mangrove-fresh hover:underline flex items-center gap-1 mx-auto cursor-pointer">
                <Link2 className="w-4 h-4" /> Kelola Permission
              </button>
            </div>
          </Card>

          {/* Registered Users from Convex */}
          {convexUsers && convexUsers.length > 0 && (
            <Card className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-mangrove-fresh" />
                  <h3 className="text-sm font-semibold text-mangrove-deep">Pengguna Terdaftar (Convex)</h3>
                </div>
                <span className="text-xs font-bold text-mangrove-fresh bg-mangrove-mint px-2.5 py-1 rounded-full">{convexUsers.length} pengguna</span>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-2.5 text-xs font-semibold text-mangrove-muted">Nama</th>
                      <th className="px-4 py-2.5 text-xs font-semibold text-mangrove-muted">Email</th>
                      <th className="px-4 py-2.5 text-xs font-semibold text-mangrove-muted">Role</th>
                      <th className="px-4 py-2.5 text-xs font-semibold text-mangrove-muted">Auth</th>
                      <th className="px-4 py-2.5 text-xs font-semibold text-mangrove-muted">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {convexUsers.map((u) => (
                      <tr key={u._id} className="border-t border-gray-50 hover:bg-gray-50/50">
                        <td className="px-4 py-2.5 font-medium text-gray-800">{u.name}</td>
                        <td className="px-4 py-2.5 text-gray-500">{u.email}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${roleBadgeColors[u.role] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                            {roleLabels[u.role] || u.role}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`text-[10px] font-semibold ${u.authProvider === 'google' ? 'text-blue-500' : 'text-gray-400'}`}>
                            {u.authProvider === 'google' ? 'Google' : 'Email'}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </main>
      </div>

      {/* Tambah Program Modal */}
      {showTambahProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-mangrove-deep to-mangrove-teal px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2"><Plus className="w-5 h-5" /> Tambah Program Baru</h3>
              <button onClick={() => setShowTambahProgram(false)} className="text-gray-400 hover:text-white cursor-pointer"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {!programSubmitted ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Nama Program</label>
                    <input type="text" placeholder="Nama program restorasi..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-mangrove-deep mb-2">Lokasi</label>
                      <input type="text" placeholder="Provinsi, Kabupaten" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-mangrove-deep mb-2">Target Bibit</label>
                      <input type="number" placeholder="0" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-mangrove-deep mb-2">Target Dana (Rp)</label>
                      <input type="text" placeholder="0" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-mangrove-deep mb-2">Koordinat GPS</label>
                      <input type="text" placeholder="lat, long" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Deskripsi Program</label>
                    <textarea rows={3} placeholder="Deskripsi lengkap program restorasi..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Jenis Mangrove</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh">
                      <option>Rhizophora mucronata</option>
                      <option>Avicennia marina</option>
                      <option>Sonneratia alba</option>
                      <option>Bruguiera gymnorhiza</option>
                      <option>Campuran</option>
                    </select>
                  </div>
                  <Button variant="neon" size="md" className="w-full" onClick={() => setProgramSubmitted(true)}>
                    <Plus className="w-4 h-4" /> Simpan Program
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-mangrove-fresh/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-mangrove-fresh" />
                  </div>
                  <h3 className="text-sm font-semibold text-mangrove-deep text-lg mb-2">Program Ditambahkan!</h3>
                  <p className="text-sm text-mangrove-muted mb-4">Program baru berhasil ditambahkan ke sistem.</p>
                  <Button variant="ghost" size="sm" onClick={() => setShowTambahProgram(false)}>Tutup</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Undang Verifikator Modal */}
      {showUndangVerifikator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-mangrove-deep to-mangrove-teal px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2"><UserPlus className="w-5 h-5" /> Undang Verifikator</h3>
              <button onClick={() => setShowUndangVerifikator(false)} className="text-gray-400 hover:text-white cursor-pointer"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {!inviteSent ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Email Verifikator</label>
                    <input type="email" placeholder="email@example.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Nama Lengkap</label>
                    <input type="text" placeholder="Nama verifikator" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Wilayah Tugas</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh">
                      <option>Papua Barat</option>
                      <option>Jawa Tengah</option>
                      <option>Sumatera Selatan</option>
                      <option>Gorontalo Utara</option>
                      <option>Kalimantan Timur</option>
                    </select>
                  </div>
                  <Button variant="neon" size="md" className="w-full" onClick={() => setInviteSent(true)}>
                    <UserPlus className="w-4 h-4" /> Kirim Undangan
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-mangrove-fresh/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-mangrove-fresh" />
                  </div>
                  <h3 className="text-sm font-semibold text-mangrove-deep text-lg mb-2">Undangan Terkirim!</h3>
                  <p className="text-sm text-mangrove-muted mb-4">Email undangan telah dikirim ke verifikator.</p>
                  <Button variant="ghost" size="sm" onClick={() => setShowUndangVerifikator(false)}>Tutup</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-mangrove-deep to-mangrove-teal px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2"><Download className="w-5 h-5" /> Export Data</h3>
              <button onClick={() => setShowExportData(false)} className="text-gray-400 hover:text-white cursor-pointer"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {!exportDone ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Tipe Data</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh">
                      <option>Semua Data Program</option>
                      <option>Data Donasi & QRIS</option>
                      <option>Data Verifikasi</option>
                      <option>Data Pengguna</option>
                      <option>Laporan Dampak</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-mangrove-deep mb-2">Dari Tanggal</label>
                      <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-mangrove-deep mb-2">Sampai Tanggal</label>
                      <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Format</label>
                    <div className="flex gap-2">
                      {['CSV', 'Excel', 'PDF'].map((f) => (
                        <button key={f} className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-500 hover:bg-mangrove-neon hover:text-mangrove-deep hover:border-mangrove-neon transition-all cursor-pointer">
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button variant="neon" size="md" className="w-full" onClick={() => setExportDone(true)}>
                    <Download className="w-4 h-4" /> Export Sekarang
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-mangrove-fresh/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-mangrove-fresh" />
                  </div>
                  <h3 className="text-sm font-semibold text-mangrove-deep text-lg mb-2">Export Berhasil!</h3>
                  <p className="text-sm text-mangrove-muted mb-4">File telah siap diunduh.</p>
                  <Button variant="ghost" size="sm" onClick={() => setShowExportData(false)}>Tutup</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Jadwal Onboarding Modal */}
      {showJadwalOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-mangrove-deep to-mangrove-teal px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2"><Calendar className="w-5 h-5" /> Jadwal Onboarding</h3>
              <button onClick={() => setShowJadwalOnboarding(false)} className="text-gray-400 hover:text-white cursor-pointer"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                {[
                  { date: '28 Apr 2026', title: 'Onboarding Verifikator Batch 12', attendees: 8, status: 'Upcoming' },
                  { date: '5 Mei 2026', title: 'Training CSR Partner Baru', attendees: 3, status: 'Upcoming' },
                  { date: '12 Mei 2026', title: 'Onboarding Admin Regional', attendees: 5, status: 'Planned' },
                ].map((event) => (
                  <div key={event.title} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-center flex-shrink-0">
                      <p className="text-xs font-bold text-mangrove-deep">{event.date.split(' ')[0]}</p>
                      <p className="text-[10px] text-mangrove-muted">{event.date.split(' ').slice(1).join(' ')}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                      <p className="text-[10px] text-mangrove-muted">{event.attendees} peserta • {event.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="neon" size="md" className="w-full">
                <Plus className="w-4 h-4" /> Tambah Jadwal Baru
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Terbitkan Baru (Sertifikat) Modal */}
      {showTerbitkanBaru && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-mangrove-deep to-mangrove-teal px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2"><Award className="w-5 h-5" /> Terbitkan Sertifikat Baru</h3>
              <button onClick={() => setShowTerbitkanBaru(false)} className="text-gray-400 hover:text-white cursor-pointer"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              {!sertifikatPublished ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Penerima Unik</label>
                    <input type="text" placeholder="Nama penerima sertifikat" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Program Terkait</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh">
                      <option>Restorasi Teluk Bintuni</option>
                      <option>Desa Timbulsloko</option>
                      <option>TN Sembilang</option>
                      <option>Kecamatan Kwandang</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Tipe Sertifikat</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh">
                      <option>Sertifikat Kontribusi</option>
                      <option>Sertifikat CSR Partner</option>
                      <option>Sertifikat Verifikator</option>
                      <option>Sertifikat Penghargaan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-mangrove-deep mb-2">Jumlah Kontribusi</label>
                    <input type="text" placeholder="Rp 0" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh" />
                  </div>
                  <Button variant="neon" size="md" className="w-full" onClick={() => setSertifikatPublished(true)}>
                    <Award className="w-4 h-4" /> Terbitkan Sertifikat
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-mangrove-fresh/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-mangrove-fresh" />
                  </div>
                  <h3 className="text-sm font-semibold text-mangrove-deep text-lg mb-2">Sertifikat Diterbitkan!</h3>
                  <p className="text-sm text-mangrove-muted mb-4">Sertifikat baru telah berhasil diterbitkan.</p>
                  <Button variant="ghost" size="sm" onClick={() => setShowTerbitkanBaru(false)}>Tutup</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
