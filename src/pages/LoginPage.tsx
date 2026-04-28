import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignIn, useAuth, useUser } from '@clerk/clerk-react';
import { Heart, ClipboardCheck, Building2, Shield, Check } from 'lucide-react';
import Button from '../components/ui/Button';

const loginRoles = [
  { id: 'kontributor' as const, label: 'Kontributor', desc: 'Donasi, lihat program, sertifikat', icon: <Heart className="w-4 h-4" />, route: '/user' },
  { id: 'verifikator' as const, label: 'Verifikator', desc: 'Verifikasi lapangan, input data', icon: <ClipboardCheck className="w-4 h-4" />, route: '/verifikator' },
  { id: 'csr_partner' as const, label: 'CSR Partner', desc: 'Donasi korporat, laporan dampak', icon: <Building2 className="w-4 h-4" />, route: '/user' },
  { id: 'admin' as const, label: 'Admin', desc: 'Kelola data, pengguna, laporan', icon: <Shield className="w-4 h-4" />, route: '/admin' },
];

type RoleId = 'kontributor' | 'verifikator' | 'csr_partner' | 'admin';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<RoleId>('kontributor');
  const [step, setStep] = useState<'role' | 'auth'>('role');
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  if (isSignedIn && user) {
    const savedRole = (user.unsafeMetadata?.role as RoleId) || selectedRole;
    const role = loginRoles.find((r) => r.id === savedRole);
    navigate(role?.route || '/user', { replace: true });
    return null;
  }

  if (step === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mangrove-deep to-mangrove-teal flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/" className="text-3xl font-extrabold text-mangrove-neon tracking-tight">ID-MAP</Link>
            <p className="text-gray-400 text-sm mt-2">
              Masuk sebagai <span className="text-mangrove-neon font-semibold">{loginRoles.find(r => r.id === selectedRole)?.label}</span>
            </p>
          </div>
          <div className="flex justify-center">
            <SignIn
              routing="hash"
              forceRedirectUrl={`/#${loginRoles.find(r => r.id === selectedRole)?.route || '/user'}`}
              appearance={{
                elements: {
                  rootBox: 'w-full max-w-md',
                  card: 'bg-white rounded-2xl shadow-xl !border-0',
                  headerTitle: 'text-mangrove-deep',
                  headerSubtitle: 'text-gray-500',
                  formButtonPrimary: 'bg-[#B7FF2A] hover:bg-[#a8ef1f] text-[#052E2B] font-semibold rounded-xl',
                  formFieldInput: 'rounded-xl border-gray-200 focus:border-[#23C16B] focus:ring-[#23C16B]/30',
                  footerActionLink: 'text-[#23C16B] hover:text-[#1da85c]',
                  socialButtonsBlockButton: 'rounded-xl border-gray-200',
                },
              }}
            />
          </div>
          <button
            onClick={() => setStep('role')}
            className="mt-4 text-sm text-gray-400 hover:text-white mx-auto block cursor-pointer"
          >
            ← Pilih peran lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mangrove-deep to-mangrove-teal flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-extrabold text-mangrove-neon tracking-tight">ID-MAP</Link>
          <p className="text-gray-400 text-sm mt-2">Masuk ke akun Anda</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-mangrove-deep mb-3">Pilih Peran Anda</label>
            <div className="grid grid-cols-2 gap-2">
              {loginRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    selectedRole === role.id
                      ? 'border-mangrove-fresh bg-mangrove-mint/50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selectedRole === role.id
                      ? 'bg-mangrove-fresh border-mangrove-fresh'
                      : 'border-gray-300'
                  }`}>
                    {selectedRole === role.id && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className={`flex-shrink-0 ${selectedRole === role.id ? 'text-mangrove-fresh' : 'text-gray-400'}`}>
                      {role.icon}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${selectedRole === role.id ? 'text-mangrove-deep' : 'text-gray-600'}`}>{role.label}</p>
                      <p className="text-[9px] text-gray-400 truncate">{role.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button variant="neon" size="md" className="w-full" onClick={() => setStep('auth')}>
            Lanjutkan Masuk
          </Button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="text-mangrove-fresh font-semibold hover:underline">Daftar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
