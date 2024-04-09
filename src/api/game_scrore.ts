import { supabase } from "@/utils/supabase/supabase";

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
  