
import React, { useState } from 'react';
import { hangulData, consonantsList, vowelsList } from '../data/hangul';

interface ReferenceTableProps {
    onClose: () => void;
}

export const ReferenceTable: React.FC<ReferenceTableProps> = ({ onClose }) => {
    const [tab, setTab] = useState<'basic' | 'compound' | 'patchim'>('basic');

    // 1. Basic Vowels (Level 1/2) - Existing Logic
    const basicVowels = vowelsList.filter(v => !v.isCompound);

    // 2. Compound Vowels (Level 3)
    const compoundVowels = vowelsList.filter(v => v.isCompound);

    return (
        <div className="glass-panel fade-in" style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 1000,
            overflowY: 'auto',
            padding: '2rem',
            background: 'rgba(20, 20, 30, 0.95)',
            color: 'white'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Header & Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>ハングル一覧表</h2>
                        <button onClick={onClose} style={{
                            background: 'transparent', border: '1px solid white', color: 'white',
                            padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer'
                        }}>
                            閉じる
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => setTab('basic')}
                            style={{
                                padding: '0.5rem 1.5rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                background: tab === 'basic' ? 'white' : 'rgba(255,255,255,0.1)',
                                color: tab === 'basic' ? '#764ba2' : 'white', fontWeight: 'bold'
                            }}
                        >
                            基本表 (基本母音)
                        </button>
                        <button
                            onClick={() => setTab('compound')}
                            style={{
                                padding: '0.5rem 1.5rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                background: tab === 'compound' ? 'white' : 'rgba(255,255,255,0.1)',
                                color: tab === 'compound' ? '#764ba2' : 'white', fontWeight: 'bold'
                            }}
                        >
                            合成母音表
                        </button>
                        <button
                            onClick={() => setTab('patchim')}
                            style={{
                                padding: '0.5rem 1.5rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                background: tab === 'patchim' ? 'white' : 'rgba(255,255,255,0.1)',
                                color: tab === 'patchim' ? '#764ba2' : 'white', fontWeight: 'bold'
                            }}
                        >
                            パッチム (ルール)
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ overflowX: 'auto', paddingBottom: '2rem' }}>

                    {/* Basic & Compound Tables (Shared Logic) */}
                    {(tab === 'basic' || tab === 'compound') && (
                        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '800px' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '10px' }}></th>
                                    {(tab === 'basic' ? basicVowels : compoundVowels).map(v => (
                                        <th key={v.char} style={{ padding: '10px', color: '#ffec99', minWidth: '60px' }}>
                                            <div style={{ fontSize: '1.2rem' }}>{v.char}</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{v.kanaEnd}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {consonantsList.map(c => (
                                    <tr key={c.char}>
                                        <th style={{ padding: '10px', color: '#ffec99' }}>{c.char}</th>
                                        {(tab === 'basic' ? basicVowels : compoundVowels).map(v => {
                                            const compoundChar = String.fromCharCode(
                                                ((c.uIndex * 21) + v.uIndex) * 28 + 0xAC00
                                            );
                                            const data = hangulData.find(d => d.char === compoundChar);

                                            return (
                                                <td key={v.char} style={{
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    padding: '10px',
                                                    textAlign: 'center'
                                                }}>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{compoundChar}</div>
                                                    {data && (
                                                        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                                                            {data.kana[0]}<br />
                                                            {data.romaji[0]}
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Patchim Information */}
                    {tab === 'patchim' && (
                        <div style={{ maxWidth: '900px' }}>
                            <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                                パッチム（終声）は全27種類ありますが、発音のルールによって<b>7つの代表音</b>に集約されます。<br />
                                次に母音が続かない場合や、子音が続く場合にこの音が使われます。
                            </p>

                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.1)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', width: '120px' }}>代表音</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>該当するパッチム</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>発音の説明</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { sound: 'ㄱ [k]', chars: 'ㄱ, ㅋ, ㄲ, ㄳ, ㄺ', desc: '喉を詰まらせる「k」の音', example: '학 (hak / 学)' },
                                        { sound: 'ㄴ [n]', chars: 'ㄴ, ㄵ, ㄶ', desc: '舌を上顎につける「n」の音', example: '안 (an / 案内)' },
                                        { sound: 'ㄷ [t]', chars: 'ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ', desc: '舌先を歯の裏で止める「t」の音', example: '옷 (ot / 服)' },
                                        { sound: 'ㄹ [l]', chars: 'ㄹ, ㄼ, ㄽ, ㄾ, ㅀ', desc: '舌を巻く「l」の音', example: '달 (dal / 月)' },
                                        { sound: 'ㅁ [m]', chars: 'ㅁ, ㄻ', desc: '口を閉じる「m」の音', example: '맘 (mam / 心)' },
                                        { sound: 'ㅂ [p]', chars: 'ㅂ, ㅍ, ㄿ, ㅄ', desc: '口を閉じて止める「p」の音', example: '밥 (bap / ご飯)' },
                                        { sound: 'ㅇ [ng]', chars: 'ㅇ', desc: '鼻に抜ける「ng」の音', example: '가방 (gabang / 鞄)' },
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#ffec99' }}>
                                                {row.sound}
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
                                                {row.chars}
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.9rem', opacity: 0.9 }}>
                                                {row.desc}
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                                {row.example}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffec99' }}>💡 連音化（リエゾン）</h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.5' }}>
                                        パッチムの次に母音（ㅇ）が来ると、パッチムの音が次の文字に移動して発音されます。<br />
                                        例：<b>한국어 (Hanguk-eo) → [ハングゴ]</b>
                                    </p>
                                </div>
                                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffec99' }}>💡 2重パッチムのコツ</h4>
                                    <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.5' }}>
                                        文字が2つ並んでいる場合は、基本的には左側を読みますが、一部（ㄺ, ㄻ, ㄿ）は右側を読みます。<br />
                                        例：<b>닭 (鶏) → [タク]</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};
