import { useState } from 'react';
import { X, QrCode, Download, Copy, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

interface GenerateQRISModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const programOptions = [
  { name: 'Restorasi Teluk Bintuni', loc: 'Papua Barat' },
  { name: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah' },
  { name: 'TN Sembilang', loc: 'Sumatera Selatan' },
  { name: 'Kecamatan Kwandang', loc: 'Gorontalo Utara' },
];

export default function GenerateQRISModal({ isOpen, onClose }: GenerateQRISModalProps) {
  const [program, setProgram] = useState('');
  const [amount, setAmount] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (program && amount) setGenerated(true);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setGenerated(false);
    setProgram('');
    setAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-mangrove-deep to-mangrove-teal px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <QrCode className="w-5 h-5 text-mangrove-neon" />
            <h3 className="text-white font-bold">Generate QRIS</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6">
          {!generated ? (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">Pilih Program</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh"
                >
                  <option value="">-- Pilih program --</option>
                  {programOptions.map((p) => (
                    <option key={p.name} value={p.name}>{p.name} — {p.loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">Jumlah (Rp)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['50.000', '100.000', '250.000', '500.000', '1.000.000'].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        amount === a ? 'bg-mangrove-neon text-mangrove-deep' : 'bg-gray-50 border border-gray-200 text-gray-500'
                      }`}
                    >
                      Rp {a}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Atau masukkan jumlah lain..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-mangrove-mint rounded-xl border border-mangrove-fresh/10">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-extrabold text-mangrove-deep">BI</span>
                </div>
                <p className="text-[10px] text-mangrove-muted">QRIS diproses melalui standar Bank Indonesia</p>
              </div>

              <Button variant="neon" size="md" className="w-full" onClick={handleGenerate}>
                <QrCode className="w-4 h-4" /> Generate QRIS
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-5">
              <div className="w-48 h-48 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center mx-auto relative">
                <QrCode className="w-32 h-32 text-mangrove-deep" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-mangrove-fresh rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <p className="font-bold text-mangrove-deep">{program}</p>
                <p className="text-2xl font-extrabold text-mangrove-fresh mt-1">Rp {amount}</p>
                <p className="text-xs text-mangrove-muted mt-2">Scan QR code di atas untuk menyelesaikan pembayaran</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex-1 !border-mangrove-deep !text-mangrove-deep" onClick={handleCopy}>
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin!' : 'Salin Link'}
                </Button>
                <Button variant="neon" size="sm" className="flex-1">
                  <Download className="w-4 h-4" /> Unduh QR
                </Button>
              </div>

              <button onClick={handleReset} className="text-sm text-mangrove-fresh hover:underline cursor-pointer">
                Generate QRIS baru
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
