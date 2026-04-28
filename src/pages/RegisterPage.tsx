import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Heart, Building2, Check, Loader2 } from 'lucide-react';
import { useSignUp, useAuth } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Button from '../components/ui/Button';

const roles = [
  { id: 'kontributor' as const, label: 'Kontributor', desc: 'Donasi, lihat program, sertifikat', icon: <Heart className="w-5 h-5" />, route: '/user' },
  { id: 'csr_partner' as const, label: 'CSR Partner', desc: 'Donasi korporat, laporan dampak', icon: <Building2 className="w-5 h-5" />, route: '/user' },
];

type RegisterRoleId = 'kontributor' | 'csr_partner';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<RegisterRoleId>('kontributor');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { isSignedIn } = useAuth();
  const registerUser = useMutation(api.users.register);

  if (isSignedIn) {
    const role = roles.find((r) => r.id === selectedRole);
    navigate(role?.route || '/user', { replace: true });
    return null;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Semua kolom wajib diisi');
      return;
    }

    setLoading(true);
    try {
      if (signUpLoaded && signUp) {
        const result = await signUp.create({
          emailAddress: email,
          password,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || undefined,
          unsafeMetadata: { role: selectedRole },
        });

        if (result.status === 'complete') {
          try { await registerUser({ name, email, role: selectedRole, authProvider: 'email' }); } catch { /* Convex optional */ }
          const role = roles.find((r) => r.id === selectedRole);
          window.location.hash = `#${role?.route || '/user'}`;
          window.location.reload();
          return;
        }

        if (result.status === 'missing_requirements') {
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
          setPendingVerification(true);
        }
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: Array<{ message?: string }> };
      setError(clerkErr.errors?.[0]?.message || 'Pendaftaran gagal.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (signUpLoaded && signUp) {
        const result = await signUp.attemptEmailAddressVerification({ code: verificationCode });
        if (result.status === 'complete') {
          try { await registerUser({ name, email, role: selectedRole, authProvider: 'email' }); } catch { /* Convex optional */ }
          const role = roles.find((r) => r.id === selectedRole);
          window.location.hash = `#${role?.route || '/user'}`;
          window.location.reload();
          return;
        }
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: Array<{ message?: string }> };
      setError(clerkErr.errors?.[0]?.message || 'Kode verifikasi salah.');
    } finally {
      setLoading(false);
    }
  };

  const handleGmailRegister = async () => {
    setError('');
    if (!signUpLoaded || !signUp) {
      setError('Clerk belum siap. Coba lagi.');
      return;
    }
    try {
      const role = roles.find((r) => r.id === selectedRole);
      const redirectRoute = role?.route || '/user';
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/#/sso-callback',
        redirectUrlComplete: `/#${redirectRoute}`,
        unsafeMetadata: { role: selectedRole },
      });
    } catch (err: unknown) {
      const clerkErr = err as { errors?: Array<{ message?: string }> };
      setError(clerkErr.errors?.[0]?.message || 'Google sign-up gagal.');
    }
  };

  if (pendingVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mangrove-deep to-mangrove-teal flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-extrabold text-mangrove-neon tracking-tight">ID-MAP</Link>
            <p className="text-gray-400 text-sm mt-2">Verifikasi email Anda</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-sm text-gray-600 mb-4 text-center">
              Kami mengirim kode verifikasi ke <span className="font-semibold">{email}</span>
            </p>
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">Kode Verifikasi</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Masukkan kode 6 digit"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh"
                />
              </div>
              {error && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center">
                  {error}
                </div>
              )}
              <Button type="submit" variant="neon" size="md" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verifikasi'}
              </Button>
            </form>
          </div>
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
                  onClick={() => { setSelectedRole(role.id); setError(''); }}
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center">
                {error}
              </div>
            )}

            <Button type="submit" variant="neon" size="md" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Daftar Sekarang'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-gray-400">atau</span></div>
          </div>

          <button
            onClick={handleGmailRegister}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Daftar dengan Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-mangrove-fresh font-semibold hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
