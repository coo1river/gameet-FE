"use client";

import { apiRequest } from "@/app/api/apiRequest";
import { connectSocket, getStompClient } from "@/app/api/socket";
import Buttons from "@/components/common/button/Buttons";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ParticipantInfo = {
  match_participant_id: number;
  user_profile_id: number;
};

export default function ChatRoom({ matchRoomId }: ChatRoomProps) {
  const { token, userProfileId } = useAuthStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const subscriptionRef = useRef<any>(null);
  const hasSentEnterMessageRef = useRef(false);
  const router = useRouter();

  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo | null>(null);
  const [opponentProfile, setOpponentProfile] = useState<OpponentProfile | null>(null);
  const [messages, setMessages] = useState<ChatPayload[]>([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  // 참가자 정보 조회 및 입장 메시지 전송
  useEffect(() => {
    if (!matchRoomId || hasSentEnterMessageRef.current) return;

    const fetchInfo = async () => {
      try {
        const participant = await apiRequest<ParticipantInfo>(
          `/chat/participantId/${matchRoomId}`,
          "GET",
        );
        setParticipantInfo(participant.data);

        const opponentRes = await apiRequest<OpponentProfile>(
          `/users/profile/${participant.data.user_profile_id}`,
          "GET",
        );
        setOpponentProfile(opponentRes.data);

        const client = getStompClient() ?? (await connectSocket());

        if (!hasSentEnterMessageRef.current) {
          const entryMsg: ChatMessage = {
            matchParticipantId: participant.data.match_participant_id,
            messageType: "ENTER",
            content: `${opponentRes.data.nickname ?? "상대방"}님이 입장하셨습니다.`,
          };
          client.send("/app/chat.send", { Authorization: token! }, JSON.stringify(entryMsg));
          hasSentEnterMessageRef.current = true;
        }
      } catch (err) {
        console.error("참가자 정보 조회 실패:", err);
      }
    };

    fetchInfo();
  }, [matchRoomId]);

  // 메시지 구독
  useEffect(() => {
    if (!matchRoomId) return;

    const setupSocket = async () => {
      const client = getStompClient() ?? (await connectSocket());

      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      subscriptionRef.current = client.subscribe(
        `/topic/chat.room.${matchRoomId}`,
        msg => {
          const body: ChatPayload = JSON.parse(msg.body);
          setMessages(prev => [...prev, body]);
        },
        { Authorization: token! },
      );
    };

    setupSocket();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [matchRoomId, token]);

  // 스크롤 이동
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const client = getStompClient();
    if (!client || !input.trim() || !participantInfo) return;

    const msg: ChatMessage = {
      matchParticipantId: participantInfo.match_participant_id,
      messageType: "TALK",
      content: input,
    };
    client.send("/app/chat.send", { Authorization: token! }, JSON.stringify(msg));
    setInput("");
  };

  const handleMatchEnd = async () => {
    try {
      await apiRequest(`/chat/${matchRoomId}/complete`, "PATCH");
      router.push("/");
    } catch (err) {
      console.error("매칭 종료 실패:", err);
      alert("매칭 종료 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-4">
      <div
        className="w-[700px] max-w-full rounded-2xl h-[450px] overflow-y-auto mb-4 p-4"
        style={{ backgroundColor: "#403a45", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
      >
        {messages.map((msg, idx) => {
          const myId = participantInfo?.match_participant_id;
          if (!myId) return null;

          const isMine = msg.matchParticipantId === myId;
          const time = msg.sendAt ? new Date(msg.sendAt).toLocaleTimeString() : "";

          if ((msg.messageType === "ENTER" || msg.messageType === "QUIT") && isMine) {
            return null;
          }

          if (msg.messageType === "ENTER" || msg.messageType === "QUIT") {
            return (
              <div key={idx} className="w-full flex justify-center my-2">
                <span className="text-xs text-gray-400 bg-[#2a2a2a] px-3 py-1 rounded-full">
                  {msg.content}
                </span>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className={`mb-2 flex ${isMine ? "justify-end" : "justify-start"} items-end gap-1`}
            >
              {isMine && time && <span className="text-xs text-gray-400 mb-0.5">{time}</span>}
              <div
                className={`max-w-[60%] p-3 rounded-lg text-sm break-words relative ${
                  isMine
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-[#2e2e2e] text-primary rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
              {!isMine && time && <span className="text-xs text-gray-400 mb-0.5">{time}</span>}
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      <div className="w-[700px] max-w-full flex items-end gap-2 relative">
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => setShowOptions(prev => !prev)}
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-md text-xl font-bold select-none text-white"
            style={{
              backgroundColor: "#403a45",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            +
          </button>
          {showOptions && (
            <div className="absolute bottom-full mb-2 flex flex-col z-10">
              {[
                { label: "약속 설정", onClick: () => alert("약속 설정") },
                { label: "신고", onClick: () => alert("신고") },
                { label: "매칭 종료", onClick: handleMatchEnd },
              ].map(({ label, onClick }) => (
                <button
                  key={label}
                  type="button"
                  className="w-32 bg-[#353238] text-white px-4 py-2 rounded shadow hover:bg-[#4a4645]"
                  onClick={() => {
                    onClick();
                    setShowOptions(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-grow"
        />
        <Buttons onClick={handleSend}>전송</Buttons>
      </div>
    </div>
  );
}
