import { useState } from 'react';
import { hangulData } from './data/hangul';
import { QuizCard } from './components/QuizCard';
import { ReferenceTable } from './components/ReferenceTable';
import './index.css';

function App() {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [showChart, setShowChart] = useState(false);

  // レベルに基づいてデータをフィルタリング
  const quizData = hangulData.filter(d => d.level === level);

  const [currentIndex, setCurrentIndex] = useState(0);

  // レベル変更時やデータが空の場合にインデックスをリセット
  // 本来はレベル変更時にランダムなインデックスを選ぶべき
  if (currentIndex >= quizData.length) {
    setCurrentIndex(0);
  }

  const handleNext = () => {
    if (quizData.length <= 1) return;
    let nextIndex = Math.floor(Math.random() * quizData.length);
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * quizData.length);
    }
    setCurrentIndex(nextIndex);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <header className="fade-in" style={{ textAlign: 'center', marginBottom: '1rem', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            onClick={() => setShowChart(true)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            📊 一覧表を見る
          </button>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: 0 }}>
          ハングル学習
        </h1>
        <p style={{ opacity: 0.7, marginBottom: '1rem' }}>韓国語をマスターしよう</p>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {[1, 2, 3].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setLevel(lvl as 1 | 2 | 3);
                setCurrentIndex(0); // Reset hard to avoid out of bounds
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: 'none',
                background: level === lvl ? 'white' : 'rgba(255,255,255,0.2)',
                color: level === lvl ? '#764ba2' : 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Level {lvl}
            </button>
          ))}
        </div>
      </header>

      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {quizData.length > 0 && quizData[currentIndex] ? (
          <QuizCard
            data={quizData[currentIndex]}
            onNext={handleNext}
          />
        ) : (
          <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}>
            読み込み中、またはデータがありません... (Level {level})
          </div>
        )}
      </main>

      {showChart && <ReferenceTable onClose={() => setShowChart(false)} />}

      <footer style={{ marginTop: 'auto', padding: '1.5rem', opacity: 0.5, fontSize: '0.8rem' }}>
        v0.1.2
      </footer>
    </div>
  );
}

export default App;
