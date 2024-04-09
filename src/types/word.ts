export type Word = {
    id: number;
    text: string;
    top: number;
    left: number;
  }

export enum Difficulty {
    VeryEasy = 1,
    Easy,
    Medium,
    Hard,
    VeryHard,
  }