import { useState, useRef, useEffect, useCallback } from 'react'

/* ── Types ── */
interface Recording {
  id: string
  blob: Blob
  url: string
  duration: number
  timestamp: Date
}

/* ── Portfolio data ── */
const PORTFOLIO_ITEMS = [
  {
    id: '1',
    title: 'ゆめかわ日記アプリ',
    cat: 'モバイルアプリ',
    emoji: '🌸',
    color: '#f0a8d8',
    accent: '#d070c0',
    desc: 'パステルカラーのドリーミーな日記アプリ。毎日の気分をスタンプで記録できます。',
    tags: ['React Native', 'Expo', 'Firebase'],
    year: '2025',
    screen: [
      { x: 10, y: 15, w: 80, h: 12, c: '#f8d0ec', r: 4 },
      { x: 10, y: 32, w: 50, h: 8, c: '#fce0f4', r: 3 },
      { x: 10, y: 45, w: 80, h: 30, c: '#fef0fa', r: 6 },
      { x: 65, y: 32, w: 25, h: 8, c: '#e8b0d8', r: 3 },
    ],
  },
  {
    id: '2',
    title: 'ほしぞらウォッチ',
    cat: 'Webアプリ',
    emoji: '⭐',
    color: '#b8a0f8',
    accent: '#8060d0',
    desc: 'リアルタイムで星座を表示するプラネタリウムアプリ。AR機能で夜空をかざすと星の名前がわかります。',
    tags: ['Three.js', 'WebGL', 'TypeScript'],
    year: '2025',
    screen: [
      { x: 5, y: 5, w: 90, h: 60, c: '#0a0820', r: 6 },
      { x: 20, y: 15, w: 8, h: 8, c: '#ffe080', r: 99 },
      { x: 50, y: 25, w: 6, h: 6, c: '#c0d8ff', r: 99 },
      { x: 35, y: 40, w: 5, h: 5, c: '#ffc0e0', r: 99 },
    ],
  },
  {
    id: '3',
    title: 'かわいいタスク帳',
    cat: 'Webアプリ',
    emoji: '📝',
    color: '#a8e8d0',
    accent: '#40b890',
    desc: 'タスク完了でキャラクターが喜ぶTodoアプリ。モチベーションを維持しながら仕事をこなせます。',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    year: '2024',
    screen: [
      { x: 8, y: 10, w: 84, h: 10, c: '#d0f4e8', r: 4 },
      { x: 8, y: 25, w: 84, h: 8, c: '#e8faf4', r: 3 },
      { x: 8, y: 37, w: 84, h: 8, c: '#e8faf4', r: 3 },
      { x: 8, y: 49, w: 50, h: 8, c: '#f0fdf8', r: 3 },
    ],
  },
  {
    id: '4',
    title: 'パステルショップ',
    cat: 'ECサイト',
    emoji: '🛍️',
    color: '#ffd0a8',
    accent: '#e07030',
    desc: 'ハンドメイドアクセサリーのオンラインショップ。売上管理ダッシュボード付き。',
    tags: ['Next.js', 'Stripe', 'Supabase'],
    year: '2024',
    screen: [
      { x: 5, y: 5, w: 42, h: 55, c: '#ffe8d0', r: 4 },
      { x: 52, y: 5, w: 42, h: 26, c: '#fff0e0', r: 4 },
      { x: 52, y: 35, w: 42, h: 25, c: '#fde8d0', r: 4 },
    ],
  },
]

/* ── Portfolio Modal ── */
function PortfolioModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const item = PORTFOLIO_ITEMS.find(p => p.id === selected)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ backdropFilter: 'blur(6px)', background: 'rgba(100,60,150,0.25)' }}
    >
      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden relative"
        style={{ background: 'linear-gradient(160deg, #fef0fa 0%, #ede8ff 60%, #e8f4ff 100%)', boxShadow: '0 20px 60px rgba(140,80,200,0.4)', maxHeight: '88vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-[#e8d0f8]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff9de0]" />
            <div className="w-3 h-3 rounded-full bg-[#ffe0a0]" />
            <div className="w-3 h-3 rounded-full bg-[#a0e8c0]" />
          </div>
          <div className="flex-1 text-center font-bold text-[#a060d0] text-sm">
            {item ? item.title : '✦ ポートフォリオ ✦'}
          </div>
          <button
            onClick={item ? () => setSelected(null) : onClose}
            className="text-[#c090e0] hover:text-[#8050b0] text-sm font-bold w-6 h-6 flex items-center justify-center"
          >
            {item ? '←' : '✕'}
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(88vh - 64px)' }}>
          {!item ? (
            <div className="px-4 py-4 grid grid-cols-2 gap-3">
              {PORTFOLIO_ITEMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className="rounded-2xl p-3 text-left transition-transform hover:scale-105 active:scale-95 focus:outline-none"
                  style={{ background: `linear-gradient(135deg, ${p.color}40, ${p.color}20)`, border: `1.5px solid ${p.color}60` }}
                >
                  <div className="w-full rounded-xl mb-2 relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'white' }}>
                    <svg width="100%" height="100%" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid slice">
                      <rect width="100" height="75" fill="white" />
                      {p.screen.map((s, i) => (
                        <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r} fill={s.c} />
                      ))}
                      <text x="50" y="42" textAnchor="middle" fontSize="18" opacity="0.4">{p.emoji}</text>
                    </svg>
                  </div>
                  <div className="font-bold text-xs leading-tight mb-0.5" style={{ color: p.accent }}>{p.title}</div>
                  <div className="text-[10px] text-[#a080c0]">{p.cat}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-5 pb-6 pt-4">
              <div className="w-full rounded-2xl overflow-hidden mb-4 shadow-md" style={{ aspectRatio: '16/9', background: 'white' }}>
                <svg width="100%" height="100%" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
                  <rect width="160" height="90" fill="white" />
                  {item.screen.map((s, i) => (
                    <rect key={i} x={s.x * 1.6} y={s.y * 1.2} width={s.w * 1.6} height={s.h * 1.2} rx={s.r} fill={s.c} />
                  ))}
                  <text x="80" y="52" textAnchor="middle" fontSize="28" fill={item.color} opacity="0.35">{item.emoji}</text>
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-[#8040c0] text-base leading-tight">{item.title}</h3>
                  <div className="text-xs text-[#b080d0]">{item.cat} · {item.year}</div>
                </div>
              </div>
              <p className="text-sm text-[#806090] leading-relaxed mb-4">{item.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map(t => (
                  <span key={t} className="text-xs font-bold rounded-full px-3 py-1"
                    style={{ background: `${item.color}30`, color: item.accent, border: `1px solid ${item.color}50` }}>
                    {t}
                  </span>
                ))}
              </div>
              <button
                className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-95"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.accent})` }}
              >
                詳しく見る ✦
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Stars data ── */
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 55,
  size: Math.random() * 6 + 3,
  dur: (Math.random() * 2 + 1.5).toFixed(1),
  delay: (Math.random() * 3).toFixed(1),
}))

const SPARKLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: [15, 25, 38, 52, 65, 78, 88, 92][i],
  y: [20, 45, 15, 60, 25, 50, 35, 70][i],
  dur: (Math.random() * 2 + 2).toFixed(1),
  delay: (Math.random() * 3).toFixed(1),
}))

/* ── Recorder Modal ── */
function RecorderModal({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<'idle' | 'recording' | 'stopped'>('idle')
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [bars, setBars] = useState<number[]>(Array(20).fill(4))

  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafRef = useRef<number>(0)
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})

  const animateBars = useCallback(() => {
    if (analyserRef.current) {
      const data = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(data)
      const step = Math.floor(data.length / 20)
      setBars(Array.from({ length: 20 }, (_, i) => Math.max(4, (data[i * step] / 255) * 48))  )
    }
    rafRef.current = requestAnimationFrame(animateBars)
  }, [])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const ctx = new AudioContext()
      const src = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      src.connect(analyser)
      analyserRef.current = analyser

      const mr = new MediaRecorder(stream)
      chunksRef.current = []
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setRecordings(prev => [
          ...prev,
          { id: Date.now().toString(), blob, url, duration: elapsed, timestamp: new Date() },
        ])
        stream.getTracks().forEach(t => t.stop())
      }
      mr.start()
      mediaRef.current = mr
      setState('recording')
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000)
      rafRef.current = requestAnimationFrame(animateBars)
    } catch {
      alert('マイクへのアクセスが必要です 🎤')
    }
  }, [elapsed, animateBars])

  const stopRecording = useCallback(() => {
    mediaRef.current?.stop()
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(rafRef.current)
    setBars(Array(20).fill(4))
    setState('stopped')
  }, [])

  const playRecording = useCallback((rec: Recording) => {
    if (playingId === rec.id) {
      audioRefs.current[rec.id]?.pause()
      setPlayingId(null)
      return
    }
    Object.values(audioRefs.current).forEach(a => a.pause())
    const audio = audioRefs.current[rec.id] || new Audio(rec.url)
    audioRefs.current[rec.id] = audio
    audio.currentTime = 0
    audio.play()
    setPlayingId(rec.id)
    audio.onended = () => setPlayingId(null)
  }, [playingId])

  const deleteRecording = useCallback((id: string) => {
    audioRefs.current[id]?.pause()
    if (playingId === id) setPlayingId(null)
    setRecordings(prev => prev.filter(r => r.id !== id))
  }, [playingId])

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(rafRef.current)
  }, [])

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-3xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #fef0fa 0%, #ede8ff 60%, #e8f4ff 100%)', boxShadow: '0 20px 60px rgba(180,130,220,0.35)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* decorative top */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            {/* cassette icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="6" width="24" height="16" rx="3" fill="#d4a8f0" />
              <rect x="4" y="8" width="20" height="12" rx="2" fill="#c990e8" />
              <circle cx="9" cy="14" r="3" fill="#fef0fa" />
              <circle cx="19" cy="14" r="3" fill="#fef0fa" />
              <circle cx="9" cy="14" r="1.5" fill="#d4a8f0" />
              <circle cx="19" cy="14" r="1.5" fill="#d4a8f0" />
              <rect x="11" y="12" width="6" height="4" rx="1" fill="#f8d0f0" />
            </svg>
            <span className="font-bold text-[#b06ccc] text-lg">かわいいレコーダー</span>
          </div>
          <button onClick={onClose} className="text-[#c990e8] hover:text-[#9060aa] text-xl leading-none">✕</button>
        </div>

        {/* waveform / VU */}
        <div className="flex items-end justify-center gap-1 h-14 mb-5 bg-white/40 rounded-2xl px-4 py-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-full transition-all duration-75"
              style={{
                height: `${state === 'recording' ? h : 4}px`,
                background: state === 'recording'
                  ? `hsl(${280 + i * 5}, 70%, 65%)`
                  : '#e0c8f8',
              }}
            />
          ))}
        </div>

        {/* timer */}
        <div className="text-center mb-5">
          <span className="font-mono text-4xl font-bold text-[#a060c0]">
            {fmt(elapsed)}
          </span>
        </div>

        {/* controls */}
        <div className="flex items-center justify-center gap-4 mb-5">
          {state !== 'recording' ? (
            <button
              onClick={startRecording}
              className="relative w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #e880d0, #c050b0)' }}
            >
              {state === 'stopped' && (
                <span className="absolute inset-0 rounded-full border-2 border-pink-400 animate-ping" style={{ animationDuration: '0s', opacity: 0 }} />
              )}
              🎙️
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #f08060, #d04040)' }}
            >
              <span className="w-6 h-6 bg-white rounded-sm" />
            </button>
          )}
        </div>
        {state === 'recording' && (
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 bg-pink-100 rounded-full px-4 py-1">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-bold text-red-500">REC</span>
            </div>
          </div>
        )}

        {/* recordings list */}
        {recordings.length > 0 && (
          <div className="space-y-2 max-h-44 overflow-y-auto">
            <div className="text-xs font-bold text-[#b06ccc] mb-1">録音済み ✨</div>
            {recordings.map((rec, i) => (
              <div key={rec.id} className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2.5">
                <button
                  onClick={() => playRecording(rec)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 transition-transform hover:scale-110"
                  style={{ background: playingId === rec.id ? 'linear-gradient(135deg, #f08060, #d04040)' : 'linear-gradient(135deg, #b080e0, #8050c0)' }}
                >
                  {playingId === rec.id ? '⏸' : '▶'}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#9060aa]">録音 {i + 1}</div>
                  <div className="font-mono text-xs text-[#c090e0]">{fmt(rec.duration)}</div>
                </div>
                <button onClick={() => deleteRecording(rec.id)} className="text-[#e0b0f0] hover:text-red-400 text-sm">🗑</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Main App ── */
export default function App() {
  const [showRecorder, setShowRecorder] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [recorderGlow, setRecorderGlow] = useState(false)
  const [laptopGlow, setLaptopGlow] = useState(false)

  // pulse the recorder occasionally
  useEffect(() => {
    const id = setInterval(() => {
      setRecorderGlow(true)
      setTimeout(() => setRecorderGlow(false), 800)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  // pulse the laptop occasionally (offset)
  useEffect(() => {
    const id = setInterval(() => {
      setLaptopGlow(true)
      setTimeout(() => setLaptopGlow(false), 800)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: 'linear-gradient(180deg, #c8b0f8 0%, #f0b8e8 35%, #ffd4e8 60%, #ffe8c8 80%, #fff0e8 100%)' }}
    >
      {/* ── Stars ── */}
      {STARS.map(s => (
        <div
          key={s.id}
          className="star absolute pointer-events-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 10 10" fill="none">
            <path d="M5 0L6 4H10L7 6.5L8 10L5 7.5L2 10L3 6.5L0 4H4Z" fill="white" opacity="0.9" />
          </svg>
        </div>
      ))}

      {/* ── Sparkles ── */}
      {SPARKLES.map(sp => (
        <div
          key={sp.id}
          className="sparkle-el absolute pointer-events-none text-white text-xs"
          style={{
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            '--dur': `${sp.dur}s`,
            '--delay': `${sp.delay}s`,
          } as React.CSSProperties}
        >
          ✦
        </div>
      ))}

      {/* ── Moon ── */}
      <div className="absolute top-8 right-10 pointer-events-none">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="22" fill="#ffe0a0" opacity="0.85" />
          <circle cx="33" cy="17" r="14" fill="#f0c8e8" opacity="0.7" />
        </svg>
      </div>

      {/* ── Clouds ── */}
      <div className="float-cloud absolute top-12 left-8 pointer-events-none opacity-70">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
          <ellipse cx="40" cy="28" rx="35" ry="14" fill="white" opacity="0.9"/>
          <ellipse cx="28" cy="22" rx="18" ry="14" fill="white" opacity="0.9"/>
          <ellipse cx="54" cy="20" rx="16" ry="12" fill="white" opacity="0.9"/>
        </svg>
      </div>
      <div className="absolute top-16 right-24 pointer-events-none opacity-60" style={{ animation: 'float2 7s ease-in-out infinite 2s' }}>
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <ellipse cx="30" cy="21" rx="26" ry="10" fill="white" opacity="0.9"/>
          <ellipse cx="20" cy="16" rx="14" ry="10" fill="white" opacity="0.9"/>
          <ellipse cx="42" cy="15" rx="12" ry="9" fill="white" opacity="0.9"/>
        </svg>
      </div>

      {/* ── Rainbow ── */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none opacity-30">
        <svg width="320" height="100" viewBox="0 0 320 100" fill="none">
          {[
            ['#ff9999', 155], ['#ffcc88', 148], ['#ffff88', 141],
            ['#aaffaa', 134], ['#88ccff', 127], ['#cc99ff', 120],
          ].map(([c, r]) => (
            <path key={String(r)} d={`M 10 100 A ${r} ${r} 0 0 1 310 100`} stroke={String(c)} strokeWidth="6" fill="none" />
          ))}
        </svg>
      </div>

      {/* ── Room floor ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%]">
        {/* wallpaper pattern */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #ffe0f0 0%, #ffd0e8 100%)',
          }}
        >
          {/* tiny hearts pattern */}
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute text-pink-200 text-opacity-60 text-xs pointer-events-none"
              style={{ left: `${(i % 10) * 10 + 2}%`, top: `${Math.floor(i / 10) * 33 + 5}%`, opacity: 0.4 }}
            >
              ♡
            </div>
          ))}
        </div>
        {/* floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%] rounded-t-3xl"
          style={{ background: 'linear-gradient(180deg, #f8c8d4 0%, #f0b8c4 100%)' }}
        >
          {/* floor planks */}
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="absolute w-full h-px" style={{ top: `${20 * (i + 1)}%`, background: 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </div>

      {/* ── Rug ── */}
      <div
        className="absolute bottom-[17%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ width: '55%', height: 28, background: 'linear-gradient(90deg, #e0a8d8, #d898cc, #c888bc)', opacity: 0.6, boxShadow: '0 4px 16px rgba(180,100,160,0.3)' }}
      />

      {/* ── Window ── */}
      <div className="absolute top-[28%] left-8 pointer-events-none">
        <div className="w-20 h-24 rounded-t-xl border-2 border-white/60 bg-white/20 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #c0d8ff 0%, #ffe0f0 100%)', opacity: 0.5 }} />
          <div className="absolute top-0 left-1/2 w-px h-full bg-white/40" />
          <div className="absolute left-0 top-1/2 w-full h-px bg-white/40" />
        </div>
        {/* curtains */}
        <div className="absolute -left-3 top-0 w-6 h-28 rounded-b-xl" style={{ background: 'linear-gradient(90deg, #f0a0d0, #e890c0)', opacity: 0.8 }} />
        <div className="absolute -right-3 top-0 w-6 h-28 rounded-b-xl" style={{ background: 'linear-gradient(270deg, #f0a0d0, #e890c0)', opacity: 0.8 }} />
      </div>

      {/* ── Bookshelf ── */}
      <div className="absolute bottom-[38%] right-6 pointer-events-none">
        <div className="w-16 h-20 relative">
          <div className="absolute bottom-0 left-0 right-0 h-2 rounded-sm" style={{ background: '#e0a0c0' }} />
          {[
            { h: 14, c: '#d4a8f0', w: 6 },
            { h: 16, c: '#f0b0d0', w: 5 },
            { h: 12, c: '#a8d4f0', w: 6 },
            { h: 15, c: '#f0d0a8', w: 5 },
            { h: 13, c: '#b0f0d0', w: 6 },
            { h: 17, c: '#f0a8b0', w: 5 },
          ].reduce<{ els: React.ReactNode[]; x: number }>((acc, book, i) => {
            acc.els.push(
              <div key={i} className="absolute bottom-2 rounded-t-sm" style={{ left: acc.x, width: book.w + 4, height: book.h, background: book.c }} />
            )
            acc.x += book.w + 5
            return acc
          }, { els: [], x: 0 }).els}
        </div>
      </div>

      {/* ── Kawaii Girl ── */}
      <div className="float-girl absolute bottom-[26%] left-1/2 -translate-x-[60%] pointer-events-none" style={{ zIndex: 10 }}>
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
          {/* hair back */}
          <ellipse cx="60" cy="58" rx="38" ry="42" fill="#9060c8" />
          {/* twin tails */}
          <ellipse cx="22" cy="72" rx="14" ry="22" fill="#9060c8" transform="rotate(-20 22 72)" />
          <ellipse cx="98" cy="72" rx="14" ry="22" fill="#9060c8" transform="rotate(20 98 72)" />
          {/* hair ribbons */}
          <ellipse cx="28" cy="52" rx="9" ry="6" fill="#ff9de0" transform="rotate(-30 28 52)" />
          <ellipse cx="92" cy="52" rx="9" ry="6" fill="#ff9de0" transform="rotate(30 92 52)" />
          <circle cx="28" cy="52" r="3" fill="#ffb8ec" />
          <circle cx="92" cy="52" r="3" fill="#ffb8ec" />
          {/* face */}
          <ellipse cx="60" cy="68" rx="30" ry="30" fill="#fde8d8" />
          {/* hair front */}
          <path d="M32 52 Q38 30 60 28 Q82 30 88 52 Q78 42 60 40 Q42 42 32 52Z" fill="#9060c8" />
          {/* blush */}
          <ellipse cx="42" cy="76" rx="8" ry="5" fill="#ffb8c8" opacity="0.7" />
          <ellipse cx="78" cy="76" rx="8" ry="5" fill="#ffb8c8" opacity="0.7" />
          {/* eyes */}
          <g className="eye">
            <ellipse cx="50" cy="66" rx="6" ry="7" fill="#5030a0" />
            <ellipse cx="70" cy="66" rx="6" ry="7" fill="#5030a0" />
            <ellipse cx="52" cy="64" rx="2" ry="2.5" fill="white" />
            <ellipse cx="72" cy="64" rx="2" ry="2.5" fill="white" />
          </g>
          {/* eyelashes */}
          <path d="M44 60 Q46 57 50 59" stroke="#5030a0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M76 60 Q74 57 70 59" stroke="#5030a0" strokeWidth="1.5" strokeLinecap="round" />
          {/* nose */}
          <ellipse cx="60" cy="73" rx="2.5" ry="1.5" fill="#f0c0b0" />
          {/* mouth */}
          <path d="M54 80 Q60 85 66 80" stroke="#e88080" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* body - dress */}
          <path d="M36 92 Q32 120 28 155 Q44 160 60 158 Q76 160 92 155 Q88 120 84 92 Q72 102 60 100 Q48 102 36 92Z"
            fill="#e0a0e8" />
          {/* dress collar */}
          <path d="M44 94 Q60 104 76 94 Q72 114 60 116 Q48 114 44 94Z" fill="#f0b8f4" />
          {/* dress apron/bow */}
          <path d="M48 118 Q60 122 72 118 L74 148 Q60 152 46 148Z" fill="white" opacity="0.5" />
          {/* bow on dress */}
          <path d="M52 110 Q56 106 60 110 Q64 106 68 110 Q64 114 60 112 Q56 114 52 110Z" fill="#ff9de0" />
          {/* arms */}
          <ellipse cx="26" cy="110" rx="8" ry="20" fill="#e0a0e8" transform="rotate(15 26 110)" />
          <ellipse cx="94" cy="110" rx="8" ry="20" fill="#e0a0e8" transform="rotate(-15 94 110)" />
          {/* hands */}
          <circle cx="22" cy="128" r="7" fill="#fde8d8" />
          <circle cx="98" cy="128" r="7" fill="#fde8d8" />
          {/* legs */}
          <rect x="44" y="150" width="14" height="26" rx="7" fill="#fde8d8" />
          <rect x="62" y="150" width="14" height="26" rx="7" fill="#fde8d8" />
          {/* shoes */}
          <ellipse cx="51" cy="176" rx="10" ry="5" fill="#e080c0" />
          <ellipse cx="69" cy="176" rx="10" ry="5" fill="#e080c0" />
          {/* heart accessories */}
          <text x="16" y="108" fontSize="10" fill="#ff9de0" opacity="0.8">♥</text>
          <text x="96" y="108" fontSize="10" fill="#ff9de0" opacity="0.8">♥</text>
        </svg>
      </div>

      {/* ── Laptop ── */}
      <button
        onClick={() => setShowPortfolio(true)}
        className="absolute bottom-[24%] left-[12%] focus:outline-none transition-transform hover:scale-110 active:scale-95"
        style={{ zIndex: 10 }}
        aria-label="パソコンを開く"
      >
        {laptopGlow && (
          <div className="absolute inset-0 rounded-2xl animate-ping" style={{ background: 'rgba(160,200,255,0.4)', animationDuration: '0.8s' }} />
        )}
        <svg width="100" height="72" viewBox="0 0 100 72" fill="none" style={{ filter: 'drop-shadow(0 4px 14px rgba(120,160,240,0.5))' }}>
          {/* lid open - screen */}
          <path d="M10 8 Q10 4 14 4 L86 4 Q90 4 90 8 L90 50 Q90 54 86 54 L14 54 Q10 54 10 50 Z" fill="#d0c0f8" />
          {/* screen bezel */}
          <path d="M14 8 Q14 6 16 6 L84 6 Q86 6 86 8 L86 50 Q86 52 84 52 L16 52 Q14 52 14 50 Z" fill="#1a0838" />
          {/* screen content - portfolio preview */}
          <rect x="16" y="8" width="68" height="42" rx="1" fill="#f8f0ff" />
          {/* nav bar */}
          <rect x="16" y="8" width="68" height="7" fill="#e8d8ff" />
          <circle cx="21" cy="11.5" r="2" fill="#ff9de0" />
          <circle cx="27" cy="11.5" r="2" fill="#ffe0a0" />
          <circle cx="33" cy="11.5" r="2" fill="#a0e8c0" />
          <rect x="39" y="9" width="30" height="5" rx="2.5" fill="white" opacity="0.6" />
          {/* portfolio cards */}
          <rect x="18" y="18" width="30" height="18" rx="3" fill="#f0d8f8" />
          <rect x="52" y="18" width="30" height="18" rx="3" fill="#d8e8ff" />
          <rect x="18" y="39" width="30" height="8" rx="3" fill="#d8f8e8" />
          <rect x="52" y="39" width="30" height="8" rx="3" fill="#fff0d8" />
          {/* kawaii emoji on cards */}
          <text x="33" y="30" textAnchor="middle" fontSize="8" fill="#c080e0">🌸</text>
          <text x="67" y="30" textAnchor="middle" fontSize="8" fill="#6080d0">⭐</text>
          {/* screen glare */}
          <path d="M18 10 L40 10 L36 30 L18 30 Z" fill="white" opacity="0.04" />
          {/* hinge */}
          <rect x="8" y="53" width="84" height="3" rx="1.5" fill="#b8a8e8" />
          {/* base / keyboard */}
          <path d="M4 56 Q4 54 8 54 L92 54 Q96 54 96 56 L94 66 Q94 68 92 68 L8 68 Q6 68 6 66 Z" fill="#c8b8f0" />
          {/* keyboard rows */}
          {[0,1,2].map(row => (
            Array.from({ length: [10,9,8][row] }, (_, i) => (
              <rect key={`${row}-${i}`} x={9 + i * 8.5 + row * 2} y={57 + row * 3} width="7" height="2.5" rx="0.8" fill="#b0a0e0" />
            ))
          ))}
          {/* touchpad */}
          <rect x="38" y="64" width="24" height="3" rx="1.5" fill="#b0a0e0" />
          {/* sticker on lid */}
          <text x="76" y="48" fontSize="8">🌈</text>
        </svg>
        <div className="text-center mt-0.5 text-xs font-bold text-[#8070d0]">タップ ✦</div>
      </button>

      {/* ── Tape Recorder ── */}
      <button
        onClick={() => setShowRecorder(true)}
        className="absolute bottom-[23%] right-[15%] focus:outline-none transition-transform hover:scale-110 active:scale-95"
        style={{ zIndex: 10 }}
        aria-label="レコーダーを開く"
      >
        {/* glow pulse */}
        {recorderGlow && (
          <div className="absolute inset-0 rounded-2xl animate-ping" style={{ background: 'rgba(200,140,240,0.4)', animationDuration: '0.8s' }} />
        )}
        <svg width="80" height="64" viewBox="0 0 80 64" fill="none" style={{ filter: 'drop-shadow(0 4px 12px rgba(180,100,220,0.5))' }}>
          {/* body */}
          <rect x="2" y="10" width="76" height="48" rx="10" fill="#e0a8f8" />
          <rect x="4" y="12" width="72" height="44" rx="8" fill="#d490f0" />
          {/* speaker grille left */}
          <rect x="8" y="18" width="22" height="28" rx="4" fill="#c070d8" />
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1="10" y1={22 + i * 5} x2="28" y2={22 + i * 5} stroke="#b060c8" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          {/* speaker grille right */}
          <rect x="50" y="18" width="22" height="28" rx="4" fill="#c070d8" />
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1="52" y1={22 + i * 5} x2="70" y2={22 + i * 5} stroke="#b060c8" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          {/* cassette window */}
          <rect x="32" y="16" width="16" height="12" rx="3" fill="#1a0838" />
          <circle cx="36" cy="22" r="3.5" stroke="#c0a0e0" strokeWidth="1.5" />
          <circle cx="44" cy="22" r="3.5" stroke="#c0a0e0" strokeWidth="1.5" />
          <line x1="36" y1="22" x2="44" y2="22" stroke="#c0a0e0" strokeWidth="1" />
          {/* buttons */}
          <circle cx="36" cy="46" r="5" fill="#f090d8" />
          <circle cx="44" cy="46" r="5" fill="#a060e0" />
          <rect x="30" y="42" width="4" height="8" rx="2" fill="#ff80b0" />
          <rect x="46" y="42" width="4" height="8" rx="2" fill="#80c0f0" />
          {/* REC light */}
          <circle cx="40" cy="34" r="3" fill="#ff6080" opacity="0.9" />
          {/* tape label */}
          <rect x="33" y="52" width="14" height="4" rx="2" fill="#f8c0e8" />
          {/* kawaii face on cassette */}
          <text x="36" y="26" fontSize="5" fill="#c0a0e0">•‿•</text>
        </svg>
        <div className="text-center mt-1 text-xs font-bold text-[#c070d8]">タップ ✦</div>
      </button>

      {/* ── Floating hearts ── */}
      {[
        { x: 10, y: 35, s: 14, d: '2s', dl: '0s' },
        { x: 82, y: 42, s: 10, d: '2.5s', dl: '1s' },
        { x: 45, y: 25, s: 12, d: '3s', dl: '0.5s' },
      ].map((h, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${h.x}%`, top: `${h.y}%`, animation: `float ${h.d} ease-in-out ${h.dl} infinite` }}
        >
          <svg width={h.s} height={h.s} viewBox="0 0 20 20" fill="none">
            <path d="M10 16S2 11 2 6a4 4 0 018 0 4 4 0 018 0c0 5-8 10-8 10z" fill="#ffb0d0" opacity="0.8" />
          </svg>
        </div>
      ))}

      {/* ── Status bar ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-3 pb-1 pointer-events-none" style={{ zIndex: 20 }}>
        <span className="font-bold text-xs text-white/70">9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-white/70 text-xs">📶</span>
          <span className="text-white/70 text-xs">🔋</span>
        </div>
      </div>

      {/* ── App title ── */}
      <div className="absolute top-10 left-0 right-0 flex flex-col items-center pointer-events-none" style={{ zIndex: 5 }}>
        <div className="text-white/90 font-bold text-xl tracking-wider" style={{ textShadow: '0 2px 8px rgba(160,80,200,0.4)' }}>
          ✦ ゆめかわルーム ✦
        </div>
        <div className="text-white/60 text-xs mt-0.5">my dreamy space ♡</div>
      </div>

      {/* ── Portfolio Modal ── */}
      {showPortfolio && <PortfolioModal onClose={() => setShowPortfolio(false)} />}

      {/* ── Recorder Modal ── */}
      {showRecorder && <RecorderModal onClose={() => setShowRecorder(false)} />}
    </div>
  )
}
