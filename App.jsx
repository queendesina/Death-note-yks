import React, { useState, useEffect } from 'react';

// TDK Kelimeleri Örnek Verisi
const tdkWords = [
  { word: "Liyakat", meaning: "Bir kimsenin, kendisine verilecek görevi başarma yeteneği." },
  { word: "Mütevazı", meaning: "Alçak gönüllü, gösterişsiz." },
  { word: "Feraset", meaning: "Çabuk sezme, kavrama ve anlama yeteneği." },
  { word: "Girift", meaning: "Birbirinin içine girmiş, karmaşık." },
  { word: "Ketum", meaning: "Sır saklamasını bilen, ağzı sıkı." },
  { word: "Tahayyül", meaning: "Hayal etme, zihinde canlandırma." },
  { word: "Gıybet", meaning: "Çekidüzen verme, dedikodu yapma." },
  { word: "Müsamaha", meaning: "Hoşgörü, tolerans." },
  { word: "Tefekkür", meaning: "Düşünme, zihin yorma." },
  { word: "İhtiras", meaning: "Aşırı güçlü istek, tutku." }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Kronometre Mantığı
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Giriş Ekranı
  if (!user) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
        <h2>YKS Akıllı Takip</h2>
        <p>Devam etmek için hesap açın veya giriş yapın</p>
        <input 
          type="email" 
          placeholder="E-posta adresiniz" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={() => setUser({ email })} 
          style={{ width: '100%', padding: '10px', backgroundColor: '#4F46E5', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Giriş Yap / Kaydol
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto', padding: '15px', paddingBottom: '70px' }}>
      {/* Üst Bilgi */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h3>YKS Asistanı</h3>
        <span style={{ fontSize: '12px', color: '#666' }}>{user.email}</span>
      </div>

      {/* İçerik Panelleri */}
      {activeTab === 'home' && (
        <div>
          {/* Kronometre */}
          <div style={{ background: '#f4f4f5', padding: '20px', borderRadius: '10px', textAlign: 'center', marginTop: '15px' }}>
            <h4>Bugünkü Çalışma Süren</h4>
            <h1 style={{ fontSize: '36px', margin: '10px 0' }}>{formatTime(timer)}</h1>
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)} 
              style={{ padding: '10px 20px', backgroundColor: isTimerRunning ? '#EF4444' : '#10B981', color: '#fff', border: 'none', borderRadius: '5px' }}>
              {isTimerRunning ? 'Durdur' : 'Başlat'}
            </button>
          </div>

          {/* Günün TDK Kelimeleri */}
          <div style={{ marginTop: '20px' }}>
            <h4>Günün 10 TDK Kelimesi</h4>
            {tdkWords.map((item, index) => (
              <div key={index} style={{ border: '1px solid #e5e7eb', padding: '10px', borderRadius: '8px', marginBottom: '8px' }}>
                <strong style={{ color: '#4F46E5' }}>{index + 1}. {item.word}</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#4B5563' }}>{item.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'subjects' && (
        <div style={{ marginTop: '20px' }}>
          <h4>Dersler ve Kaynaklar</h4>
          <p style={{ color: '#666' }}>Biyoloji, Matematik, Fizik vb. ders içerikleri, MEB Kitapları ve Hafıza Kartları modülü hazırlanıyor...</p>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div style={{ marginTop: '20px' }}>
          <h4>Kişisel Deneme Analizi</h4>
          <p style={{ color: '#666' }}>Net takibi, konu eksikleri ve ruh hali analiz ekranı hazırlanıyor...</p>
        </div>
      )}

      {/* Alt Menü */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        <button onClick={() => setActiveTab('home')} style={{ border: 'none', background: 'none', color: activeTab === 'home' ? '#4F46E5' : '#666' }}>Anasayfa</button>
        <button onClick={() => setActiveTab('subjects')} style={{ border: 'none', background: 'none', color: activeTab === 'subjects' ? '#4F46E5' : '#666' }}>Dersler</button>
        <button onClick={() => setActiveTab('analytics')} style={{ border: 'none', background: 'none', color: activeTab === 'analytics' ? '#4F46E5' : '#666' }}>Analizlerim</button>
      </div>
    </div>
  );
}

