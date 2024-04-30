import { useMutation } from '@tanstack/react-query';
import { ProfileToUpdate } from '@/types/users';
import { updateProfile } from '@/api/users';

/** 프로필 업데이트 */
export const useUpdateProfile = () => {
  const updateProfileMutation = useMutation({
    mutationFn: async ({ id, newProfile }: { id: string; newProfile: ProfileToUpdate }) => {
      try {
        const result = await updateProfile(id, newProfile);
        if (result) {
          return result;
        }
      } catch (error) {
        console.error('프로필 업데이트 실패', error);
        throw error;
      }
    }
  });

  return updateProfileMutation;
};
