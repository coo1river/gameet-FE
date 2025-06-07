import { MatchingCodeOptions } from "@/hooks/pages/code/useMatchingCodeOptions";
import { UseFormReturn } from "react-hook-form";

export interface ProfileFormType {
  email: string;
  nickname: string;
  age: number;
  show_age: boolean;
  gender: "M" | "F" | "N";
  game_platforms: string[];
  preferred_genres: string[];
  play_style: string;
  game_skill_level: string;
  is_adult_match_allowed: boolean;
  is_voice: boolean;
}

export interface UserInfoFormProps {
  methods: UseFormReturn<ProfileFormType>;
  setStep: (step: number) => void;
  nicknameChecked: boolean;
  handleNicknameCheck: () => void;
}

export interface GameInfoFormProps {
  methods: UseFormReturn<ProfileFormType>;
  codeOptions: MatchingCodeOptions | null;
  setStep?: (step: number) => void;
  handleSubmit: (data: ProfileFormType) => void;
}

export interface ProfileFormType {
  game_platforms: string[];
  preferred_genres: string[];
  play_style: string;
  game_skill_level: string;
  is_voice: boolean;
  is_adult_match_allowed: boolean;
}
