import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUp, useAuth, useUser } from '@clerk/clerk-react';
import { Heart, Building2, Check } from 'lucide-react';
import Button from '../components/ui/Button';

const roles = [
  { id: 'kontributor' as const, label: 'Kontributor', desc: 'Donasi, lihat program, sertifikat', icon: <Heart className="w-5 h-5" />, route: '/user' },
  { id: 'csr_partner' as const, label: 'CSR Partner', desc: 'Donasi korporat, laporan dampak', icon: <Building2 className="w-5 h-5" />, route: '/user' },
];

type RoleId = 'kontributor' | 'csr_partner';

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<RoleId>('kontributor');
  const [step, setStep] = useState<'role' | 'auth'>('role');
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  if (isSignedIn && user) {
    const role = roles.find((r) => r.id === selectedRole);
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
              Daftar sebagai <span className="text-mangrove-neon font-semibold">{roles.find(r => r.id === selectedRole)?.label}</span>
            </p>
          </div>
          <div className="flex justify-center">
            <SignUp
              routing="hash"
              forceRedirectUrl={`/#${roles.find(r => r.id === selectedRole)?.route || '/user'}`}
              unsafeMetadata={{ role: selectedRole }}
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
          <p className="text-gray-400 text-sm mt-2">Buat akun baru</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-mangrove-deep mb-3">Pilih Peran Anda</label>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    selectedRole === role.id
                      ? 'border-mangrove-fresh bg-mangrove-mint/50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selectedRole === role.id
                      ? 'bg-mangrove-fresh border-mangrove-fresh'
                      : 'border-gray-300'
                  }`}>
                    {selectedRole === role.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex items-center gap-2.5 flex-1">
                    <span className={`${selectedRole === role.id ? 'text-mangrove-fresh' : 'text-gray-400'}`}>
                      {role.icon}
                    </span>
                    <div>
                      <span className={`text-sm font-bold ${selectedRole === role.id ? 'text-mangrove-deep' : 'text-gray-600'}`}>{role.label}</span>
                      <p className="text-[10px] text-gray-400">{role.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button variant="neon" size="md" className="w-full" onClick={() => setStep('auth')}>
            Lanjutkan Daftar
          </Button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-mangrove-fresh font-semibold hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
