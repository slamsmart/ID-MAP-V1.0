import { useState, useRef } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

const defaultMessages: ChatMessage[] = [
  { id: 1, text: 'Halo! Selamat datang di ID-MAP. Ada yang bisa saya bantu?', sender: 'bot', time: 'Sekarang' },
];

const quickReplies = [
  'Bagaimana cara berkontribusi?',
  'Apa itu QRIS?',
  'Lihat program aktif',
  'Hubungi admin',
];

const botResponses: Record<string, string> = {
  'Bagaimana cara berkontribusi?': 'Anda bisa berkontribusi melalui QRIS! Pilih program restorasi mangrove, tentukan jumlah donasi, lalu scan QRIS untuk pembayaran. Setiap kontribusi Anda akan tercatat dan Anda bisa memantau dampaknya secara real-time.',
  'Apa itu QRIS?': 'QRIS (Quick Response Code Indonesian Standard) adalah standar pembayaran digital dari Bank Indonesia. Di ID-MAP, QRIS digunakan sebagai engine utama untuk menerima donasi dan kontribusi program restorasi mangrove.',
  'Lihat program aktif': 'Saat ini ada 156 lokasi program aktif di seluruh Indonesia, termasuk Restorasi Teluk Bintuni, Desa Timbulsloko, TN Sembilang, dan lainnya. Kunjungi halaman Program untuk detail lengkap.',
  'Hubungi admin': 'Anda bisa menghubungi admin melalui email admin@idmap.id atau melalui fitur chat ini. Tim kami akan merespons dalam waktu 1x24 jam kerja.',
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [input, setInput] = useState('');

  const msgIdRef = useRef(100);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    msgIdRef.current += 1;
    const userId = msgIdRef.current;
    const userMsg: ChatMessage = { id: userId, text, sender: 'user', time: 'Sekarang' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    msgIdRef.current += 1;
    const botId = msgIdRef.current;
    setTimeout(() => {
      const response = botResponses[text] || 'Terima kasih atas pertanyaan Anda. Tim kami akan segera membantu. Anda juga bisa menghubungi admin@idmap.id untuk bantuan lebih lanjut.';
      const botMsg: ChatMessage = { id: botId, text: response, sender: 'bot', time: 'Sekarang' };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-mangrove-neon rounded-full flex items-center justify-center shadow-lg shadow-mangrove-neon/30 hover:scale-105 transition-transform cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6 text-mangrove-deep" /> : <MessageCircle className="w-6 h-6 text-mangrove-deep" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden" style={{ height: '28rem' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-mangrove-deep to-mangrove-teal px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-mangrove-neon/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-mangrove-neon" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">ID-MAP Support</p>
              <p className="text-gray-300 text-[10px]">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${
                  msg.sender === 'user'
                    ? 'bg-mangrove-deep text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1">
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => sendMessage(qr)}
                  className="px-2.5 py-1.5 bg-mangrove-mint text-mangrove-deep text-[10px] font-medium rounded-full border border-mangrove-fresh/20 hover:bg-mangrove-fresh/10 transition-colors cursor-pointer"
                >
                  {qr}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-mangrove-fresh"
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-9 h-9 bg-mangrove-neon rounded-xl flex items-center justify-center hover:bg-mangrove-neon/80 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-mangrove-deep" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
