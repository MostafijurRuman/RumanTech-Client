import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { myReviewService } from "@/modules/profile/services/review.service";

export function useMyReviews() {
  return useQuery({ queryKey: ["my-reviews"], queryFn: myReviewService.list });
}

export function useMyReviewActions() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
  return {
    update: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: { rating?: number; comment?: string } }) => myReviewService.update(id, payload),
      onSuccess: async (response) => {
        toast.success(response.message);
        await invalidate();
      },
    }),
    deleteReview: useMutation({
      mutationFn: myReviewService.delete,
      onSuccess: async (response) => {
        toast.success(response.message);
        await invalidate();
      },
    }),
  };
}
