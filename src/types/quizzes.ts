export type Quiz = {
  id?: string;
  creator_id: string;
  level: number;
  title: string;
  info: string;
  thumbnail_img_url: string | null;
};

export type Option = {
  id: string;
  content: string;
  is_answer: boolean;
};

export type OptionsToInsert = Pick<Option, 'content' | 'is_answer'> & {
  question_id: string;
};

export enum QuestionType {
  objective = 'objective',
  subjective = 'subjective'
}

export type Question = {
  id?: string;
  type: QuestionType;
  title: string;
  img_file: File | null;
  img_url: string;
  correct_answer: string;
  options: Option[];
};

export type QuestionsToInsert = Pick<Question, 'title' | 'correct_answer'> & {
  quiz_id: string;
  question_type: QuestionType;
};
