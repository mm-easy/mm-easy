import { supabase } from '@/utils/supabase/supabase';

import type { TypingGame } from '@/types/game';

/** game_tires 테이블에서 상위점수 3명 target_date기준 일주일단위로 가져오기 */
export const getGameScore = async (): Promise<TypingGame[]> => {
  const targetDate = new Date('2024-04-18').toISOString().slice(0, 10); 
  try {
    let { data: gameScore, error } = await supabase.rpc('get_game_tries_with_details', { target_date: targetDate }).limit(3);

    if (error) throw error;

    return gameScore;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** game_tries 테이블에서 나의 점수만(score컬럼) 가져오기 */
export const getMyGameScore = async (user_id: string) => {
  try {
    let { data: myScores, error } = await supabase.from('game_tries').select('score').eq('user_id', user_id);

    if (error) throw error;
    const totalScore = myScores?.reduce((acc, cur) => acc + parseInt(cur.score), 0);
    return totalScore;
  } catch (error) {
    console.error(error);
    return null;
  }
};
