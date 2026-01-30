
export type CellType = 'EMPTY' | 'WALL' | 'START' | 'END';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Position {
  x: number;
  y: number;
}

export interface LevelData {
  id: number;
  grid: CellType[][];
  startPos: Position;
  endPos: Position;
  message: string;
}

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  GAME_OVER = 'GAME_OVER',
  LEVEL_SELECT = 'LEVEL_SELECT'
}
