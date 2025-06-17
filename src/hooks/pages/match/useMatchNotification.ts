import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { matchQueryKeys } from "./useMatchStatus";
import { MatchStatusType } from "@/types/match";
import { useMatchStatusStore } from "@/store/useMatchStatus";

export const useMatchNotification = () => {
  const queryClient = useQueryClient();
  const { setStatus } = useMatchStatusStore();
  const router = useRouter();

  // 매칭 알림 메시지 관리
  const handleMatchNotification = (notificationData: MatchStatusType) => {
    const status = notificationData.match_status;
    if (status === "MATCHED" || status === "FAILED") {
      const newMatchStatus: MatchStatusType = {
        match_status: notificationData.match_status,
        match_room_id: notificationData.match_room_id,
        elapsed_time: null,
      };

      queryClient.setQueryData(matchQueryKeys.status(), newMatchStatus);

      setStatus(newMatchStatus);

      if (notificationData.match_status === "MATCHED" && notificationData.match_room_id) {
        router.push(`/chat/${notificationData.match_room_id}`);
      }
    }
  };

  return { handleMatchNotification };
};
