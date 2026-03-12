"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Play, Square, Share2, Users, DollarSign } from "lucide-react";

const COMPARISONS = [
  { threshold: 400, label: "吉野家の牛丼1杯分", icon: "🍱" },
  { threshold: 1000, label: "贅沢なランチ代", icon: "🍛" },
  { threshold: 5000, label: "飲み会1回分", icon: "🍺" },
  { threshold: 30000, label: "地方の家賃0.5ヶ月分", icon: "🏠" },
  { threshold: 50000, label: "新人エンジニアの月給の1/4", icon: "💻" },
  { threshold: 150000, label: "ハイスペックMacBook Proが買えます", icon: "🍎" },
  { threshold: 300000, label: "給料1ヶ月分が溶けました", icon: "💸" },
  { threshold: 1000000, label: "中古車が1台買えました", icon: "🚗" },
];

export default function Home() {
  const [attendees, setAttendees] = useState(5);
  const [avgHourlyRate, setAvgHourlyRate] = useState(4000);
  const [totalCost, setTotalCost] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showReport, setShowReport] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        const perSecondCost = (attendees * avgHourlyRate) / 3600;
        setTotalCost((prev) => prev + perSecondCost);
        
        // 音を鳴らす（ユーザー操作後のみ可能）
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, attendees, avgHourlyRate]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setShowReport(false);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setShowReport(true);
  };

  const currentComparison = [...COMPARISONS]
    .reverse()
    .find((c) => totalCost >= c.threshold);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden font-sans">
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3" />

      <AnimatePresence>
        {!isRunning && !showReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 bg-zinc-900/80 border border-zinc-800 p-8 rounded-2xl backdrop-blur-xl w-full max-w-md shadow-2xl shadow-red-900/20"
          >
            <div className="flex items-center gap-2 mb-6 text-red-500">
              <AlertTriangle size={24} />
              <h1 className="text-xl font-bold tracking-tight">絶望の会議設定</h1>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm text-zinc-400 mb-2 block flex items-center gap-2">
                  <Users size={16} /> 参加人数
                </label>
                <input
                  type="number"
                  value={attendees}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400 mb-2 block flex items-center gap-2">
                  <DollarSign size={16} /> 平均時給 (円)
                </label>
                <input
                  type="number"
                  value={avgHourlyRate}
                  onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
                  className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                />
                <p className="mt-2 text-xs text-zinc-500">
                  ※全員の平均的なコストを入力してください
                </p>
              </div>
              <button
                onClick={handleStart}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 glow-red"
              >
                <Play size={20} fill="currentColor" />
                会議を開始（燃焼開始）
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(isRunning || totalCost > 0) && !showReport && (
        <div className="relative w-full max-w-4xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <h2 className="text-zinc-500 text-sm uppercase tracking-[0.4em] mb-4">
              Current Burning Cost
            </h2>
            <div className="flex items-baseline justify-center gap-2 text-red-600 font-digital text-7xl md:text-9xl tracking-tighter filter drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
              <span className="text-4xl md:text-6xl mr-2">￥</span>
              {Math.floor(totalCost).toLocaleString()}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {currentComparison && (
              <motion.div
                key={currentComparison.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-zinc-900/50 border border-zinc-800 px-6 py-4 rounded-full flex items-center gap-3 mb-12 backdrop-blur-md"
              >
                <span className="text-2xl">{currentComparison.icon}</span>
                <p className="text-zinc-300 font-medium">
                  {currentComparison.label} が消滅しました
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4">
            {isRunning ? (
              <button
                onClick={handleStop}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition-all"
              >
                <Square size={20} fill="currentColor" />
                一時停止
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition-all"
              >
                <Play size={20} fill="currentColor" />
                再開
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-xl font-bold transition-all border-4 border-black"
            >
              損切りして会議を終わらせる
            </button>
          </div>

          <div className="fixed bottom-0 left-0 w-full h-[30vh] pointer-events-none overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent" />
            <div className="fire-animation" />
          </div>
        </div>
      )}

      <AnimatePresence>
        {showReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white text-black p-6 md:p-10 rounded-none w-full max-w-2xl shadow-[10px_10px_0px_#8B0000] md:shadow-[20px_20px_0px_#8B0000] border-4 border-black font-serif my-auto"
            >
              <div className="border-b-4 border-black pb-4 mb-6 md:mb-8">
                <h1 className="text-2xl md:text-4xl font-black uppercase text-center tracking-widest">
                  無駄会議・損害報告書
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 text-base md:text-lg">
                <div className="space-y-4">
                  <p className="border-b border-zinc-300 pb-1">
                    <span className="font-bold mr-4">参加者:</span> {attendees} 名
                  </p>
                  <p className="border-b border-zinc-300 pb-1">
                    <span className="font-bold mr-4">平均単価:</span> ￥{avgHourlyRate.toLocaleString()} /h
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="border-b border-zinc-300 pb-1">
                    <span className="font-bold mr-4 text-red-700">確定損害額:</span> ￥{Math.floor(totalCost).toLocaleString()}
                  </p>
                  <p className="border-b border-zinc-300 pb-1">
                    <span className="font-bold mr-4">結論:</span> Slackで済む内容
                  </p>
                </div>
              </div>

              <div className="bg-zinc-100 p-4 md:p-6 italic text-center mb-8 border-l-8 border-red-600 text-sm md:text-base">
                 "{currentComparison ? currentComparison.label : "貴重な時間"}を無駄にしました。次からはメールでお願いします。"
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`【無駄会議・損害報告書】\n参加者: ${attendees}名\n損害額: ￥${Math.floor(totalCost).toLocaleString()}\n結論: Slackで済む内容でした\n\n#絶望の会議コスト計算機 #無駄会議`)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-full bg-[#1DA1F2] text-white py-4 font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
                >
                  <Share2 size={20} />
                  X(Twitter)に損害を報告する
                </button>
                <button
                  onClick={() => {
                    setShowReport(false);
                    setTotalCost(0);
                  }}
                  className="text-zinc-500 text-sm hover:underline"
                >
                  現実に戻る（最初からやり直す）
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .glow-red {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
        }
        @keyframes fire {
          0% { transform: translateY(0) scaleX(1); }
          50% { transform: translateY(-10px) scaleX(1.1); }
          100% { transform: translateY(0) scaleX(1); }
        }
        .fire-animation {
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
          height: 100px;
          background: radial-gradient(circle at center, #ff0000, transparent);
          filter: blur(40px);
          animation: fire 3s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}
