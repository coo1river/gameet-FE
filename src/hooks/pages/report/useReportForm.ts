"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/api/apiRequest";
import { useCommonCodeOptions } from "@/hooks/code/useCommonCodeOptions";
import { CommonCodeGroup } from "@/constants/code/CommonCodeGroup";
import { useConfirm } from "@/hooks/confirm/useConfirm";

export interface ReportFormData {
  report_reasons: string[];
}

export function useReportForm({
  closeAction,
  matchRoomId,
  setIsReportedAction,
}: {
  closeAction: () => void;
  matchRoomId: number | null;
  setIsReportedAction: (isReported: boolean) => void;
}) {
  const methods = useForm<ReportFormData>({
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      report_reasons: [],
    },
  });

  const codeOptions = useCommonCodeOptions(CommonCodeGroup.REPORT_REASON);

  const { ConfirmModal, confirm } = useConfirm();

  const reportMutation = useMutation({
    mutationFn: async (formData: ReportFormData) => {
      const { report_reasons } = formData;
      return await apiRequest("/match/report", "POST", {
        report_reasons,
        match_room_id: matchRoomId,
      });
    },
    onSuccess: () => {
      alert("신고 완료");
      console.log("신고 성공");
      setIsReportedAction(true);
      closeAction();
    },
    onError: (error: any) => {
      console.error("신고 실패:", error);
      setIsReportedAction(false);
    },
  });
  const onSubmit = async (formData: ReportFormData) => {
    const ok = await confirm({
      headerText: "🚨신고 확인",
      message: "신고는 한번만 할 수 있습니다.\n정말로 이 사용자를 신고하시겠습니까?",
    });

    if (ok) {
      reportMutation.mutate(formData);
    }
  };

  return {
    methods,
    onSubmit,
    reportError: reportMutation.error,
    codeOptions,
    ConfirmModal,
  };
}
