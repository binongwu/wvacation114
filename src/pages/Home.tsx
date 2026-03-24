import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, File, Play, X } from 'lucide-react';

const mockData = [
  {
    id: 1,
    title: '期末專題：AI 繪圖成果與心得',
    author: '王小明',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    description: '這是我這學期學習 AI 繪圖 (Midjourney) 的心得記錄與操作展示影片。我發現詠唱關鍵字非常需要想像力。'
  },
  {
    id: 4,
    title: '創意機器人大賽實錄',
    author: '張大山',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    description: '參與跨校機器人大賽的精華片段與我們隊伍的致勝關鍵。'
  },
  {
    id: 2,
    title: '自然科學探究報告：校園植物',
    author: '李小華',
    type: 'pdf',
    description: '觀察校園植物生長歷程與資料分析，記錄了三十天的植物成長對比。'
  },
  {
    id: 3,
    title: '寒假經典閱讀心得分享',
    author: '陳大文',
    type: 'text',
    description: '這本書讓我學到了很多關於人生規劃的重要觀念，尤其是在面對挫折時的心態調整...'
  }
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: '#e0e7ff', color: 'var(--primary)', borderRadius: '20px', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
          五零八班專屬
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          508寒假自主學習成果展
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          探索同學們在寒假期間精彩豐富的自主學習專案與紀錄。
        </p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
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
        style={{ height: '85vh', width: 'calc(85vh * 16 / 9)', maxWidth: '92vw', backgroundColor: 'var(--surface)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: '#f8fafc', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>作者：{item.author}</p>
          </div>
          <button onClick={onClose} style={{ padding: '0.5rem', backgroundColor: '#f1f5f9', borderRadius: '50%', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', backgroundColor: '#000', display: 'flex', flexDirection: 'column' }}>
          {item.type === 'youtube' && (
            <iframe width="100%" height="100%" src={`${item.url}?autoplay=1`} title={item.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ flex: 1 }}></iframe>
          )}
          {item.type === 'pdf' && (
            <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <FileText size={80} color="#be185d" style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.2rem' }}>文件檢視器載入中...</p>
            </div>
          )}
          {item.type === 'text' && (
            <div style={{ flex: 1, backgroundColor: 'white', padding: '3rem 10%', overflowY: 'auto' }}>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--text-main)', maxWidth: '800px', margin: '0 auto' }}>
                {item.description}
                <br /><br />
                (此處將顯示完整文章內容，為了展示效果，這裡只顯示摘要與佔位文字。)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
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
      <div style={{ position: 'relative', height: '200px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
        {item.type === 'youtube' && (
          <div style={{ width: '100%', height: '100%' }}>
            {isHovered ? (
              <iframe width="100%" height="100%" src={`${item.url}?autoplay=1&mute=1&controls=0&modestbranding=1`} title="線上影片播放器" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style={{ pointerEvents: 'none' }}></iframe>
            ) : (
              <>
                <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '50%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s', color: '#ef4444' }}>
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        {item.type === 'pdf' && <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}><FileText size={70} color="#be185d" strokeWidth={1.5} /></div>}
        {item.type === 'text' && <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)' }}><File size={70} color="#0369a1" strokeWidth={1.5} /></div>}
        
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.95)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          {item.type === 'youtube' && <><Play size={12} fill="currentColor" color="#ef4444" /> 影片</>}
          {item.type === 'pdf' && <><FileText size={12} color="#be185d" /> 文件</>}
          {item.type === 'text' && <><File size={12} color="#0369a1" /> 文章</>}
        </div>
      </div>

      <div style={{ padding: '1rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)', lineHeight: 1.4 }}>{item.title}</h3>
        <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>{item.author}</p>
      </div>
    </div>
  );
}
