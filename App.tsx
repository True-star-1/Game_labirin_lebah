
import React, { useState, useEffect, useCallback } from 'react';
import { LEVELS } from './constants';
import { GameState, Position, Difficulty } from './types';
import MazeCell from './components/MazeCell';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [unlockedLevelIdx, setUnlockedLevelIdx] = useState(0);
  const [beePos, setBeePos] = useState<Position>(LEVELS[0].startPos);
  const [facing, setFacing] = useState<'LEFT' | 'RIGHT'>('LEFT');
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [movesLeft, setMovesLeft] = useState(0);

  // Load persistence from localStorage on mount
  useEffect(() => {
    const savedDifficulty = localStorage.getItem('bee_maze_difficulty') as Difficulty;
    if (savedDifficulty) {
      setDifficulty(savedDifficulty);
    }

    const savedUnlocked = localStorage.getItem('bee_maze_unlocked');
    if (savedUnlocked) {
      setUnlockedLevelIdx(parseInt(savedUnlocked, 10));
    }
  }, []);

  const currentLevel = LEVELS[currentLevelIdx];

  const calculateMaxMoves = (level: typeof currentLevel) => {
    return (level.grid.length + level.grid[0].length) * 2;
  };

  const handleStartGame = () => {
    setGameState(GameState.PLAYING);
    setBeePos(currentLevel.startPos);
    if (difficulty === 'HARD') {
      setMovesLeft(calculateMaxMoves(currentLevel));
    }
  };

  const checkWin = useCallback((pos: Position) => {
    if (pos.x === currentLevel.endPos.x && pos.y === currentLevel.endPos.y) {
      setGameState(GameState.LEVEL_COMPLETE);
      setScore(prev => prev + (difficulty === 'HARD' ? 20 : 10));
      
      const nextUnlocked = Math.max(unlockedLevelIdx, currentLevelIdx + 1);
      setUnlockedLevelIdx(nextUnlocked);
      localStorage.setItem('bee_maze_unlocked', nextUnlocked.toString());
    }
  }, [currentLevel, difficulty, unlockedLevelIdx, currentLevelIdx]);

  const handleMove = (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (gameState !== GameState.PLAYING) return;
    if (difficulty === 'HARD' && movesLeft <= 0) return;

    let newPos = { ...beePos };
    switch (direction) {
      case 'UP': newPos.y -= 1; break;
      case 'DOWN': newPos.y += 1; break;
      case 'LEFT': 
        newPos.x -= 1; 
        setFacing('LEFT');
        break;
      case 'RIGHT': 
        newPos.x += 1; 
        setFacing('RIGHT');
        break;
    }

    if (
      newPos.y < 0 || newPos.y >= currentLevel.grid.length ||
      newPos.x < 0 || newPos.x >= currentLevel.grid[0].length
    ) return;

    if (currentLevel.grid[newPos.y][newPos.x] === 'WALL') return;

    setBeePos(newPos);
    
    if (difficulty === 'HARD') {
      setMovesLeft(prev => prev - 1);
    }

    checkWin(newPos);
  };

  useEffect(() => {
    if (difficulty === 'HARD' && gameState === GameState.PLAYING && movesLeft <= 0) {
      const timer = setTimeout(() => {
        alert("Yah, gerakannya habis! Coba lagi ya.");
        restartLevel();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [movesLeft, difficulty, gameState]);

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      const nextIdx = currentLevelIdx + 1;
      setCurrentLevelIdx(nextIdx);
      setBeePos(LEVELS[nextIdx].startPos);
      if (difficulty === 'HARD') {
        setMovesLeft(calculateMaxMoves(LEVELS[nextIdx]));
      }
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.GAME_OVER);
    }
  };

  const selectLevel = (idx: number) => {
    if (idx <= unlockedLevelIdx) {
      setCurrentLevelIdx(idx);
      setBeePos(LEVELS[idx].startPos);
      setGameState(GameState.PLAYING);
      if (difficulty === 'HARD') {
        setMovesLeft(calculateMaxMoves(LEVELS[idx]));
      }
    }
  };

  const restartLevel = () => {
    setBeePos(currentLevel.startPos);
    if (difficulty === 'HARD') {
      setMovesLeft(calculateMaxMoves(currentLevel));
    }
    setGameState(GameState.PLAYING);
  };

  const changeDifficulty = (d: Difficulty) => {
    setDifficulty(d);
    localStorage.setItem('bee_maze_difficulty', d);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': handleMove('UP'); break;
        case 'ArrowDown': handleMove('DOWN'); break;
        case 'ArrowLeft': handleMove('LEFT'); break;
        case 'ArrowRight': handleMove('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [beePos, gameState, currentLevel, movesLeft, difficulty]);

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden select-none">
      
      {/* Header - Berwarna Kuning Terang (mirip screenshot) */}
      <div className="bg-[#facc15] pt-12 pb-10 px-6 rounded-b-[3.5rem] shadow-lg z-20 shrink-0">
        <h1 className="font-fredoka text-3xl text-[#854d0e] text-center tracking-wide uppercase drop-shadow-sm">
          MADU LEBAH CERIA 🐝
        </h1>
        <div className="flex justify-between items-center mt-6 px-2">
          <div className="bg-white/90 px-5 py-2 rounded-full shadow-sm text-[#854d0e] font-bold text-sm">
            Level {currentLevelIdx + 1}
          </div>
          <div className="bg-white/90 px-5 py-2 rounded-full shadow-sm text-[#854d0e] font-bold text-sm flex items-center gap-2">
            <span>🍯</span> {score}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#f0f9ff] to-white relative overflow-y-auto">
        
        {gameState === GameState.MENU && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Maskot Lebah Besar */}
            <div className="text-[12rem] animate-bounce-slow drop-shadow-2xl">🐝</div>
            
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-[#854d0e] font-fredoka">Halo Teman!</h2>
              <p className="text-lg text-[#a16207] px-6 leading-relaxed max-w-[400px]">
                Ayo bantu Lebah kecil mencari bunga matahari yang penuh madu.
              </p>
            </div>

            <div className="w-full space-y-6 max-w-[340px]">
              <button 
                onClick={handleStartGame}
                className="w-full bg-[#facc15] hover:bg-[#eab308] text-[#854d0e] font-fredoka text-4xl py-6 rounded-[2.5rem] shadow-xl border-b-[12px] border-[#a16207] active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-4"
              >
                <span>MULAI</span>
                <span className="text-3xl">▶</span>
              </button>

              <button 
                onClick={() => setGameState(GameState.LEVEL_SELECT)}
                className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white font-fredoka text-2xl py-5 rounded-[2.5rem] shadow-xl border-b-[12px] border-[#0284c7] active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-4"
              >
                <span>PILIH LEVEL</span>
                <span className="text-2xl">🗺️</span>
              </button>
            </div>

            {/* Selector Difficulty Mini */}
            <div className="w-full max-w-[340px] bg-white/60 p-5 rounded-[2.5rem] border-2 border-[#fef3c7] shadow-inner mt-4">
              <p className="text-[11px] font-bold text-[#a16207] uppercase tracking-[0.2em] text-center mb-4">Tingkat Kesulitan</p>
              <div className="grid grid-cols-3 gap-3">
                {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => changeDifficulty(d)}
                    className={`py-3 rounded-2xl text-[10px] font-bold transition-all uppercase ${
                      difficulty === d 
                      ? 'bg-[#eab308] text-white shadow-md scale-105' 
                      : 'bg-white text-[#a16207] border border-[#fef3c7] hover:bg-[#fefce8]'
                    }`}
                  >
                    {d === 'EASY' ? 'Mudah' : d === 'MEDIUM' ? 'Normal' : 'Sulit'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameState === GameState.LEVEL_SELECT && (
          <div className="flex-1 flex flex-col p-8 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-fredoka text-3xl text-[#854d0e]">Pilih Level</h2>
              <button 
                onClick={() => setGameState(GameState.MENU)}
                className="text-[#a16207] font-bold text-sm bg-yellow-100 px-6 py-3 rounded-full hover:bg-yellow-200"
              >
                KEMBALI
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4 pb-10">
              {LEVELS.map((level, idx) => {
                const isUnlocked = idx <= unlockedLevelIdx;
                return (
                  <button
                    key={level.id}
                    onClick={() => isUnlocked && selectLevel(idx)}
                    disabled={!isUnlocked}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-[2rem] font-fredoka transition-all
                      ${isUnlocked 
                        ? 'bg-[#facc15] text-[#854d0e] shadow-lg border-b-[6px] border-[#a16207] active:translate-y-1 active:border-b-0 text-3xl' 
                        : 'bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed'}
                    `}
                  >
                    <span>{idx + 1}</span>
                    {!isUnlocked && <span className="text-xs mt-1">🔒</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {gameState === GameState.PLAYING && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in slide-in-from-bottom duration-300">
            <div className="w-full flex justify-between items-center mb-8 px-2 max-w-[400px]">
               <div className="bg-white/90 px-5 py-3 rounded-full shadow-md border border-sky-100">
                 <p className="text-sm font-bold text-sky-800">{currentLevel.message}</p>
               </div>
               {difficulty === 'HARD' && (
                 <div className={`ml-4 text-xs font-bold px-5 py-3 rounded-2xl shadow-md border-2 ${movesLeft < 5 ? 'bg-red-500 text-white border-red-600 animate-pulse' : 'bg-red-50 text-red-700 border-red-200'}`}>
                   Langkah: {movesLeft}
                 </div>
               )}
            </div>

            <div 
              className="grid gap-0 border-[12px] border-[#166534] rounded-[3.5rem] overflow-hidden shadow-2xl bg-white mb-10"
              style={{
                gridTemplateColumns: `repeat(${currentLevel.grid[0].length}, 1fr)`,
                width: 'min(380px, 95%)'
              }}
            >
              {currentLevel.grid.map((row, y) => 
                row.map((cell, x) => (
                  <MazeCell 
                    key={`${x}-${y}`} 
                    type={cell} 
                    isCurrent={beePos.x === x && beePos.y === y}
                    isEnd={currentLevel.endPos.x === x && currentLevel.endPos.y === y}
                    facing={facing}
                    difficulty={difficulty}
                  />
                ))
              )}
            </div>
            
            <div className="mt-auto w-full max-w-[340px] pb-12">
              <Controls onMove={handleMove} disabled={false} />
            </div>
          </div>
        )}

        {gameState === GameState.LEVEL_COMPLETE && (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in zoom-in duration-300">
            <div className="relative mb-12">
              <div className="text-[12rem] drop-shadow-2xl">🌻</div>
              <div className="absolute top-0 -right-6 text-7xl animate-bounce">✨</div>
              <div className="absolute bottom-6 -left-6 text-7xl animate-bounce-slow">✨</div>
            </div>
            
            <h2 className="font-fredoka text-6xl text-green-600 mb-6 drop-shadow-sm">HEBAT!</h2>
            <p className="text-2xl text-gray-700 font-medium mb-12">Lebah mendapatkan madunya!</p>
            
            <div className="w-full max-w-[340px] space-y-6">
              <button 
                onClick={nextLevel}
                className="w-full bg-[#22c55e] text-white font-fredoka text-3xl py-7 rounded-[3rem] shadow-xl border-b-[12px] border-[#15803d] active:border-b-0 active:translate-y-2 transition-all"
              >
                LANJUTKAN ▶
              </button>
              <button 
                onClick={() => setGameState(GameState.LEVEL_SELECT)}
                className="text-[#15803d] font-bold underline text-lg block mx-auto py-2"
              >
                Kembali ke Pilih Level
              </button>
            </div>
          </div>
        )}

        {gameState === GameState.GAME_OVER && (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in zoom-in duration-500">
            <div className="text-[12rem] mb-12 drop-shadow-2xl">🍯🏆</div>
            <h2 className="font-fredoka text-6xl text-[#eab308] mb-6">JUARA!</h2>
            <p className="text-2xl text-gray-700 mb-16 leading-relaxed font-medium px-4">
              Kamu sangat pintar! Semua tantangan sudah terlewati.
            </p>
            <button 
              onClick={() => {
                setCurrentLevelIdx(0);
                setScore(0);
                setGameState(GameState.MENU);
              }}
              className="w-full max-w-[360px] bg-[#0ea5e9] text-white font-fredoka text-4xl py-8 rounded-[3.5rem] shadow-2xl border-b-[12px] border-[#0369a1] active:border-b-0 active:translate-y-2 transition-all"
            >
              MAIN LAGI 🔄
            </button>
          </div>
        )}
      </div>

      {/* Footer Area - Mirip Screenshot */}
      <div className="shrink-0 p-10 bg-white border-t border-gray-100 flex flex-col items-center z-30">
        <div className="flex gap-12 mb-8">
          <button 
            onClick={restartLevel}
            disabled={gameState !== GameState.PLAYING}
            className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-3 ${gameState === GameState.PLAYING ? 'text-[#a16207] active:scale-95' : 'text-gray-200'}`}
          >
            <span className="text-lg">🔄</span> ULANGI
          </button>
          <div className="w-[2px] h-5 bg-gray-200 self-center"></div>
          <button 
            onClick={() => setGameState(GameState.MENU)}
            className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-3 active:scale-95"
          >
            <span className="text-lg">🏠</span> MENU
          </button>
        </div>
        {/* Dekorasi garis bawah tombol home mobile */}
        <div className="w-24 h-2 bg-gray-100 rounded-full"></div>
      </div>

    </div>
  );
};

export default App;
