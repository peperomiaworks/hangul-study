import React, { useState, useEffect, useRef } from 'react';
import type { HangulChar } from '../data/hangul';

interface QuizCardProps {
    data: HangulChar;
    onNext: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ data, onNext }) => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const [message, setMessage] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Reset state when data changes
    useEffect(() => {
        setInput('');
        setStatus('idle');
        setMessage('');
        inputRef.current?.focus();
    }, [data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'correct' || status === 'incorrect') {
            onNext();
            return;
        }

        const val = input.trim().toLowerCase();

        // Check Romaji
        // Note: User might type "ga" for 'ㄱ'. Code should handle this.
        // Our data has arrays.
        const isRomajiCorrect = data.romaji.some(r => r === val);

        // Check Kana (Simple exact match for now)
        // Users might input Katakana or Hiragana. Let's normalize to Katakana if possible or check both.
        // Ideally we convert input hiragana to katakana for comparison if our data is katakana.
        // For now, let's assume direct match or robust check later.
        const isKanaCorrect = data.kana.some(k => k === val || hiraganaToKatakana(val) === k);

        if (isRomajiCorrect || isKanaCorrect) {
            setStatus('correct');
            setMessage('正解！🎉');
        } else {
            setStatus('incorrect');
            const kanaText = data.kana.length > 0 ? data.kana[0] : '';
            const correctText = kanaText ? `${kanaText} (${data.romaji[0]})` : data.romaji[0];
            setMessage(`不正解... 正解は「${correctText}」です`);
        }
    };

    const hiraganaToKatakana = (str: string) => {
        return str.replace(/[\u3041-\u3096]/g, function (match) {
            var chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    };

    return (
        <div className="glass-panel" style={{
            padding: '3rem',
            borderRadius: '24px',
            textAlign: 'center',
            maxWidth: '90%',
            width: '400px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '400px' // コンテンツのガタつきを防ぐための固定高さ
        }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    margin: 0,
                    textShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} className="slide-up">
                    {data.char}
                </h1>
                <p style={{ marginTop: '0.5rem', opacity: 0.6 }}>
                    {data.type === 'consonant' ? '基本子音' :
                        data.type === 'vowel' ? '基本母音' : '基本文字'}
                    {data.level === 3 ? ' (応用)' : ''}
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="読み方を入力 (例: ka / カ)"
                    style={{
                        padding: '1rem',
                        fontSize: '1.2rem',
                        borderRadius: '12px',
                        border: `2px solid ${status === 'incorrect' ? '#ff6b6b' : 'rgba(255,255,255,0.3)'}`,
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        width: '100%',
                        textAlign: 'center',
                        outline: 'none',
                        marginBottom: '1rem',
                        transition: 'all 0.3s'
                    }}
                    autoFocus
                />

                <button
                    type="submit"
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'white',
                        color: '#764ba2',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transform: 'translateY(0)',
                        transition: 'all 0.2s'
                    }}
                >
                    {status === 'idle' || status === 'incorrect' ? '次へ →' : '次へ →'}
                </button>
            </form>

            {/* 結果メッセージエリア（高さ確保でガタつき防止） */}
            <div style={{ minHeight: '3rem', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {status === 'correct' && (
                    <div style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1.2rem' }} className="fade-in">
                        正解！ Great!
                    </div>
                )}
                {status === 'incorrect' && (
                    <div style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1.1rem' }} className="fade-in">
                        {message}
                    </div>
                )}

                {(status === 'correct' || status === 'incorrect') && (
                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }} className="fade-in">
                        読み: {data.romaji.join(', ')} {data.kana.length > 0 ? `/ ${data.kana.join(', ')}` : ''}
                    </div>
                )}
            </div>
        </div>
    );
};
