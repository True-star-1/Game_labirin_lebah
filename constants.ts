
import { LevelData, CellType } from './types';

const E: CellType = 'EMPTY';
const W: CellType = 'WALL';
const S: CellType = 'START';
const G: CellType = 'END';

export const LEVELS: LevelData[] = [
  {
    id: 1,
    grid: [
      [S, E, E],
      [W, W, E],
      [G, E, E]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 2 },
    message: "Ayo bantu Lebah ke Bunga!"
  },
  {
    id: 2,
    grid: [
      [S, E, E, W],
      [W, W, E, W],
      [E, E, E, W],
      [G, W, W, W]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 3 },
    message: "Bagus! Terus maju!"
  },
  {
    id: 3,
    grid: [
      [S, E, E, E],
      [W, W, W, E],
      [E, E, E, E],
      [E, W, W, W],
      [G, E, E, E]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 4 },
    message: "Kamu hebat! Ayo lagi!"
  },
  {
    id: 4,
    grid: [
      [S, E, E, E, E],
      [E, W, W, W, E],
      [E, E, E, E, E],
      [W, W, W, W, E],
      [G, E, E, E, E]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 4 },
    message: "Madu menunggumu!"
  },
  {
    id: 5,
    grid: [
      [S, W, E, E, E],
      [E, W, E, W, E],
      [E, E, E, W, E],
      [W, W, W, W, E],
      [E, E, E, E, G]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 4, y: 4 },
    message: "Hati-hati tembok!"
  },
  {
    id: 6,
    grid: [
      [S, E, E, W, E],
      [W, W, E, W, E],
      [E, E, E, E, E],
      [E, W, W, W, W],
      [G, E, E, E, E]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 4 },
    message: "Setengah jalan lagi!"
  },
  {
    id: 7,
    grid: [
      [E, E, E, E, E],
      [E, W, W, W, S],
      [E, E, E, W, E],
      [G, W, E, E, E],
      [E, E, E, W, E]
    ],
    startPos: { x: 4, y: 1 },
    endPos: { x: 0, y: 3 },
    message: "Ayo berputar sedikit!"
  },
  {
    id: 8,
    grid: [
      [S, E, E, E, E, E],
      [W, W, W, W, W, E],
      [E, E, E, E, E, E],
      [E, W, W, W, W, W],
      [E, E, E, E, E, G]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 5, y: 4 },
    message: "Wah, labirinnya makin panjang!"
  },
  {
    id: 9,
    grid: [
      [S, E, W, E, E, E],
      [E, E, W, E, W, E],
      [W, E, W, E, W, E],
      [E, E, E, E, W, E],
      [W, W, W, W, W, E],
      [G, E, E, E, E, E]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 5 },
    message: "Jangan menyerah!"
  },
  {
    id: 10,
    grid: [
      [E, E, E, E, E, G],
      [E, W, W, W, W, W],
      [E, W, E, E, E, E],
      [E, W, E, W, W, E],
      [E, W, E, E, W, E],
      [S, E, E, E, W, E]
    ],
    startPos: { x: 0, y: 5 },
    endPos: { x: 5, y: 0 },
    message: "Level 10! Keren!"
  },
  {
    id: 11,
    grid: [
      [S, E, E, E, E, W],
      [W, W, W, W, E, W],
      [E, E, E, E, E, W],
      [E, W, W, W, W, W],
      [E, E, E, E, E, E],
      [W, W, W, W, W, G]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 5, y: 5 },
    message: "Ayo terbang lebih jauh!"
  },
  {
    id: 12,
    grid: [
      [S, W, E, E, E, E],
      [E, W, E, W, W, E],
      [E, W, E, E, W, E],
      [E, W, W, E, W, E],
      [E, E, E, E, W, E],
      [W, W, W, W, W, G]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 5, y: 5 },
    message: "Cari jalan keluarnya!"
  },
  {
    id: 13,
    grid: [
      [E, E, E, W, S, E],
      [E, W, E, W, E, E],
      [E, W, E, W, W, E],
      [E, W, E, E, E, E],
      [E, W, W, W, W, E],
      [G, E, E, E, E, E]
    ],
    startPos: { x: 4, y: 0 },
    endPos: { x: 0, y: 5 },
    message: "Hampir sampai!"
  },
  {
    id: 14,
    grid: [
      [S, E, E, E, W, E, E],
      [W, W, W, E, W, E, W],
      [E, E, E, E, E, E, W],
      [E, W, W, W, W, W, W],
      [E, E, E, E, E, E, G]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 6, y: 4 },
    message: "Pelan-pelan saja."
  },
  {
    id: 15,
    grid: [
      [E, E, E, E, E, E, G],
      [E, W, W, W, W, W, W],
      [E, W, S, E, E, E, E],
      [E, W, E, W, W, W, E],
      [E, E, E, E, E, E, E]
    ],
    startPos: { x: 2, y: 2 },
    endPos: { x: 6, y: 0 },
    message: "Hebat sekali!"
  },
  {
    id: 16,
    grid: [
      [S, E, E, E, E, E, E],
      [W, W, W, W, W, W, E],
      [E, E, E, E, E, E, E],
      [E, W, W, W, W, W, W],
      [E, E, E, E, E, E, G]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 6, y: 4 },
    message: "Ular tangga labirin!"
  },
  {
    id: 17,
    grid: [
      [S, E, W, E, E, E, E],
      [E, E, W, E, W, W, E],
      [W, E, W, E, E, W, E],
      [E, E, E, W, E, W, E],
      [E, W, W, W, E, W, E],
      [G, E, E, E, E, E, E]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 5 },
    message: "Ayo lebih teliti!"
  },
  {
    id: 18,
    grid: [
      [G, E, E, E, E, E, E],
      [W, W, W, W, W, W, E],
      [E, E, E, E, E, E, E],
      [E, W, W, W, W, W, W],
      [E, E, E, E, E, E, S]
    ],
    startPos: { x: 6, y: 4 },
    endPos: { x: 0, y: 0 },
    message: "Cepat ambil madunya!"
  },
  {
    id: 19,
    grid: [
      [E, E, S, E, E, E, E],
      [E, W, W, W, W, W, E],
      [E, W, E, E, E, W, E],
      [E, W, E, G, E, W, E],
      [E, W, E, E, E, W, E],
      [E, W, W, W, W, W, E],
      [E, E, E, E, E, E, E]
    ],
    startPos: { x: 2, y: 0 },
    endPos: { x: 3, y: 3 },
    message: "Level 19! Wow!"
  },
  {
    id: 20,
    grid: [
      [S, E, E, E, E, E, E],
      [E, W, W, W, W, W, E],
      [E, W, G, E, E, E, E],
      [E, W, W, W, W, W, W],
      [E, E, E, E, E, E, E],
      [W, W, W, W, W, W, E],
      [E, E, E, E, E, E, E]
    ],
    startPos: { x: 0, y: 0 },
    endPos: { x: 2, y: 2 },
    message: "Level TERAKHIR! Juara!"
  }
];
