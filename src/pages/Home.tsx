import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Play, X, Image, ChevronLeft, ChevronRight } from 'lucide-react';

const mockData = [
  { id: 17, title: '周翊騰', author: '周翊騰', type: 'youtube', url: 'https://www.youtube.com/embed/4vnY-n7oGZU', thumbnail: 'https://img.youtube.com/vi/4vnY-n7oGZU/maxresdefault.jpg' },
  { id: 1, title: '蔡芷柔', author: '蔡芷柔', type: 'youtube', url: 'https://www.youtube.com/embed/Jc7vIIAE0QY', thumbnail: 'https://img.youtube.com/vi/Jc7vIIAE0QY/maxresdefault.jpg' },
  { id: 2, title: '王晨佑', author: '王晨佑', type: 'youtube', url: 'https://www.youtube.com/embed/4ecV8HiXgv0', thumbnail: 'https://img.youtube.com/vi/4ecV8HiXgv0/maxresdefault.jpg' },
  { id: 3, title: '陳韋豪', author: '陳韋豪', type: 'youtube', url: 'https://www.youtube.com/embed/yaGB5BItwbY', thumbnail: 'https://img.youtube.com/vi/yaGB5BItwbY/maxresdefault.jpg' },
  { id: 4, title: '王晨希', author: '王晨希', type: 'youtube', url: 'https://www.youtube.com/embed/nvxBSqrd2Rw', thumbnail: 'https://img.youtube.com/vi/nvxBSqrd2Rw/maxresdefault.jpg' },
  { id: 5, title: '徐維蔓', author: '徐維蔓', type: 'youtube', url: 'https://www.youtube.com/embed/kH4mA3XPJNE', thumbnail: 'https://img.youtube.com/vi/kH4mA3XPJNE/maxresdefault.jpg' },
  { id: 6, title: '謝棋芝', author: '謝棋芝', type: 'pdf', url: 'https://drive.google.com/file/d/1f280eBka-W8QJADxzTvKj4lhS3eb0qIq/preview', thumbnail: '/thumbnails/xie_qizhi.png' },
  { id: 7, title: '王沂安', author: '王沂安', type: 'pdf', url: 'https://drive.google.com/file/d/16WuDowQyYpsRk3Qbt5NvyDqVJLgmHG9L/preview', thumbnail: '/thumbnails/wang_yian.png' },
  { id: 14, title: '謝雅芝', author: '謝雅芝', type: 'pdf', url: 'https://drive.google.com/file/d/1qiizIHPw8UUTgXSsQI0cz-p6xqQvaB6y/preview', thumbnail: '/thumbnails/xie_ya_zhi.png' },
  { id: 8, title: '張人杰', author: '張人杰', type: 'pdf', url: 'https://drive.google.com/file/d/1IRESRPAj0do0FjJEWs9UcNkY7kOXGamC/preview', thumbnail: '/thumbnails/zhang_renjie.png' },
  { id: 9, title: '許睿旂', author: '許睿旂', type: 'pdf', url: 'https://drive.google.com/file/d/1cM1zcm5Jo-d2IpAL4on8EwuK0figzNF2/preview', thumbnail: '/thumbnails/xu_ruiqi.png' },
  { id: 10, title: '陳崇名', author: '陳崇名', type: 'pdf', url: 'https://drive.google.com/file/d/17Hy0x18ihbFmTrWRzxRwycQ4tljfY4cc/preview', thumbnail: '/thumbnails/chen_chongming.png' },
  { id: 11, title: '李承翰', author: '李承翰', type: 'pdf', url: 'https://drive.google.com/file/d/1shxMYmXA-zKSd2Ua88OBqhjmWtgjMobP/preview', thumbnail: '/thumbnails/li_chen_han.png' },
  { id: 12, title: '林楷鈞', author: '林楷鈞', type: 'pdf', url: 'https://drive.google.com/file/d/1oYYC4APrRQuwZ5qH26W0bqm7mJCpx_wl/preview', thumbnail: '/thumbnails/lin_kai_jun.png' },
  { id: 13, title: '吳翊恩', author: '吳翊恩', type: 'pdf', url: 'https://drive.google.com/file/d/1i-69BuwcU5oJ9I-O0NY6_DZJejzBLyNU/preview', thumbnail: '/thumbnails/wu_yi_en.png' },
  { id: 15, title: '范芝綾', author: '范芝綾', type: 'video', url: 'https://drive.google.com/file/d/1cGltoqLbk0HT4qL3F0SL5awb90JMUKVl/preview', thumbnail: '/thumbnails/fan_zhiling.png' },
  { id: 16, title: '張芸榕', author: '張芸榕', type: 'images', thumbnail: '/thumbnails/zhang_yun_rong.png', images: [
    '1_vLPRmnCZiitQdo_qo5D2WSEWx6aSr9q',
    '14s_cHljOmJ_UY-iRTZXKKBZvDuI1jMAv',
    '1raJ63Av2SxQ4TPs5eaz524Kxv1zODz3l',
    '1SVcgokoRmwP8XXAJ7TppQ-wEwI9sw8hf',
    '1RMNqHa1KlWWCe8NRYVs7nPwQRzMt0DeI',
    '1TJFr3Wfp4Q2Tws3wrjUug4cPL5VDQXb2',
    '1H8TnV3eNuuESEkjXurWrfVugIzlPmXca',
    '1vigSGCFMDUshvaQcNUb-XpOk5Wb33PXl',
    '1i9wCGT3wdMauuaSl7kXvllNgQpiria6l',
    '1FEk6KayKLWgwxBwzGMtWTd96WjuI4V5E',
    '1eOTDonLv7GEyMoovo86LJ7NMAguUPi_t',
    '1IXHacjkVoyFzAPuRR57T-7apAbfzqJ5P'
  ] },
  { id: 18, title: '邱柏鈞', author: '邱柏鈞', type: 'video', url: 'https://drive.google.com/file/d/1EQ5WW9IsLPIgc69biLTZ1ZN7uVi-U6Nu/preview', thumbnail: '/thumbnails/qiu_bo_jun.png' },
  { id: 19, title: '吳忠陽', author: '吳忠陽', type: 'video', url: 'https://drive.google.com/file/d/1jxUgyCWnmNxnYdO8gBeIEOqEK96L-tkt/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1jxUgyCWnmNxnYdO8gBeIEOqEK96L-tkt&sz=w800' },
  { id: 20, title: '馬頤中', author: '馬頤中', type: 'pdf', url: 'https://drive.google.com/file/d/1seAyex6WNo2xkbK0UKGpvDzLB1gsbIq7/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1seAyex6WNo2xkbK0UKGpvDzLB1gsbIq7&sz=w800' },
  { id: 21, title: '林宥任', author: '林宥任', type: 'pdf', url: 'https://drive.google.com/file/d/1NVjjvxd_zjVshVu3jQBvRiJ7qt-scSQY/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1NVjjvxd_zjVshVu3jQBvRiJ7qt-scSQY&sz=w800' },
  { id: 22, title: '華紹硯', author: '華紹硯', type: 'pdf', url: 'https://drive.google.com/file/d/1DweB-zApyFmwvZt_uNjpiZj05po1_ocM/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1DweB-zApyFmwvZt_uNjpiZj05po1_ocM&sz=w800' },
  { id: 23, title: '邱柏翔', author: '邱柏翔', type: 'pdf', url: 'https://drive.google.com/file/d/1KSTNhzBDjIKEe0q4Kl8ce_czjg8wLZ_U/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1KSTNhzBDjIKEe0q4Kl8ce_czjg8wLZ_U&sz=w800' },
  { id: 24, title: '華紹帆', author: '華紹帆', type: 'pdf', url: 'https://drive.google.com/file/d/1qbEUwJ0X8nxiMr7GZeTqfhfPHXDYw2Aa/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1qbEUwJ0X8nxiMr7GZeTqfhfPHXDYw2Aa&sz=w800' },
  { id: 25, title: '楊銥諠', author: '楊銥諠', type: 'pdf', url: 'https://drive.google.com/file/d/1SK-rgDPQVgVM2z1XNekjNAdwPUcJ9-Dk/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1SK-rgDPQVgVM2z1XNekjNAdwPUcJ9-Dk&sz=w800' },
  { id: 26, title: '陳妤宣', author: '陳妤宣', type: 'pdf', url: 'https://drive.google.com/file/d/16CoZzldIW7i1gOxhnY885YfTN11Rk3uJ/preview', thumbnail: 'https://drive.google.com/thumbnail?id=16CoZzldIW7i1gOxhnY885YfTN11Rk3uJ&sz=w800' },
  { id: 27, title: '劉芷安', author: '劉芷安', type: 'pdf', url: 'https://drive.google.com/file/d/1ioEaEiwh-bklb8SzT0crYvqywQkeQ2eJ/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1ioEaEiwh-bklb8SzT0crYvqywQkeQ2eJ&sz=w800' },
  { id: 28, title: '馬頤菲', author: '馬頤菲', type: 'pdf', url: 'https://drive.google.com/file/d/1T7iX-Cb4V63SEAlPwDoleGEu3aqVZwyy/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1T7iX-Cb4V63SEAlPwDoleGEu3aqVZwyy&sz=w800' },
  { id: 29, title: '連晨希', author: '連晨希', type: 'canva', url: 'https://canva.link/iyfv88dfpbu497g' },
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);


  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: '#e0e7ff', color: 'var(--primary)', borderRadius: '20px', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
          五零八班專屬
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          508寒假自主學習成果展
        </h1>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {mockData.map((item) => (
          <ResultCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

function ItemModal({ item, onClose }: { item: any; onClose: () => void }) {
  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const modal = (
    <div
      className="animate-fade-in"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        style={{ 
          height: item.type === 'pdf' ? '82vh' : '85vh', 
          width: item.type === 'pdf' ? 'calc(82vh * 4.1 / 3)' : 'calc(85vh * 16 / 9)', 
          maxWidth: '95vw', 
          backgroundColor: 'var(--surface)', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' 
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: '#fff', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.author} 的作品</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.1rem' }}>點擊視窗外背景即可關閉</p>
          </div>
          <button onClick={onClose} style={{ padding: '0.4rem', backgroundColor: '#f1f5f9', borderRadius: '50%', color: 'var(--text-muted)', transition: 'all 0.2s' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', backgroundColor: item.type === 'pdf' ? '#fff' : '#000', display: 'flex', flexDirection: 'column' }}>
          {(item.type === 'youtube' || item.type === 'video' || item.type === 'canva' || (item.type === 'pdf' && item.url)) && (
            <iframe width="100%" height="100%" src={item.type === 'youtube' ? `${item.url}?autoplay=1` : item.url} title={item.author} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ flex: 1 }}></iframe>
          )}
          {item.type === 'images' && <ImageCarousel images={item.images} />}
          {item.type === 'pdf' && !item.url && (
            <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <FileText size={80} color="#be185d" style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.2rem' }}>文件檢視器載入中...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a1a', height: '100%' }}>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img 
          key={images[currentIndex]}
          src={`https://drive.google.com/thumbnail?id=${images[currentIndex]}&sz=w1200`} 
          alt={`作品 ${currentIndex + 1}`}
          className="animate-fade-in"
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
        
        <button 
          onClick={prev}
          style={{ position: 'absolute', left: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          onClick={next}
          style={{ position: 'absolute', right: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
        >
          <ChevronRight size={32} />
        </button>

        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem' }}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div style={{ height: '80px', background: '#000', display: 'flex', gap: '0.5rem', padding: '0.5rem', overflowX: 'auto', borderTop: '1px solid #333' }}>
        {images.map((id, idx) => (
          <img 
            key={id}
            src={`https://drive.google.com/thumbnail?id=${id}&sz=w200`} 
            onClick={() => setCurrentIndex(idx)}
            style={{ 
              height: '100%', 
              aspectRatio: '1', 
              objectFit: 'cover', 
              cursor: 'pointer', 
              opacity: currentIndex === idx ? 1 : 0.5,
              border: currentIndex === idx ? '2px solid var(--primary)' : 'none',
              borderRadius: '4px',
              transition: 'opacity 0.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ item, onClick }: { item: any, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-panel"
      onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', transform: isHovered ? 'translateY(-8px)' : 'none', boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-md)', cursor: 'pointer', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative', height: '180px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
        {(item.type === 'youtube' || item.type === 'video') && (
          <div style={{ width: '100%', height: '100%' }}>
            {(isHovered && item.type === 'youtube') ? (
              <iframe width="100%" height="100%" src={`${item.url}?autoplay=1&mute=1&controls=0&modestbranding=1`} title="預覽影片" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style={{ pointerEvents: 'none' }}></iframe>
            ) : (
              <>
                <img src={item.thumbnail} alt={item.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '50%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s', color: '#ef4444' }}>
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        {(item.type === 'pdf' || item.type === 'images' || item.type === 'canva') && (
          <div style={{ width: '100%', height: '100%' }}>
            {item.thumbnail ? (
              <img src={item.thumbnail} alt={item.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', background: item.type === 'canva' ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)' : 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}>
                {item.type === 'canva' ? <Image size={60} color="#0ea5e9" strokeWidth={1.5} /> : <FileText size={60} color="#be185d" strokeWidth={1.5} />}
              </div>
            )}
          </div>
        )}
        
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(255,255,255,0.95)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 10 }}>
          {item.type === 'youtube' && <><Play size={10} fill="currentColor" color="#ef4444" /> 影片</>}
          {item.type === 'video' && <><Play size={10} fill="currentColor" color="#ef4444" /> 影片</>}
          {item.type === 'pdf' && <><FileText size={10} color="#be185d" /> 文件</>}
          {item.type === 'images' && <><Image size={10} color="#0369a1" /> 相簿 ({item.images.length})</>}
          {item.type === 'canva' && <><Image size={10} color="#0ea5e9" /> 簡報</>}
        </div>
      </div>

      <div style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.author}</h3>
      </div>
    </div>
  );
}
