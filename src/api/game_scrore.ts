import { supabase } from '@/utils/supabase/supabase';

export const getGameScore = async () => {
  try {
    let { data: gameScore, error } = await supabase
      .from('game_tries')
      .select('*')
      .order('score', { ascending: false })
      .limit(3);

    if (error) throw error;

    return gameScore;
  } catch (error) {
    console.error(error);
    return null;
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
