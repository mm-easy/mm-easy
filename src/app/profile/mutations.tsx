import { updateProfile } from '@/api/users';
import { ProfileToUpdate } from '@/types/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/** 프로필 업데이트 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loggedInUser'] });
    }
  });

  return updateProfileMutation;
};
