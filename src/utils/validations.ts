import { RegisterOptions } from "react-hook-form";

export const emailValid: RegisterOptions = {
  required: "이메일은 필수입니다.",
  pattern: {
    value: /^(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣])[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "이메일 형식이 올바르지 않습니다.",
  },
};

export const passwordValid: RegisterOptions = {
  required: "비밀번호는 필수 입력 항목입니다.",
  minLength: {
    value: 8,
    message: "최소 8자 이상 입력해 주세요.",
  },
  maxLength: {
    value: 15,
    message: "최대 15자까지 입력 가능합니다.",
  },
  pattern: {
    value: /^(?=.*[!@#$%^&*])/,
    message: "1개 이상의 특수문자를 포함해야 합니다.",
  },
};

export const passwordCheckValid = (getPassword: () => string): RegisterOptions => ({
  required: "비밀번호 확인은 필수 입력 항목입니다.",
  validate: (value: string) => value === getPassword() || "비밀번호가 일치하지 않습니다.",
});

export const nicknameValid: RegisterOptions = {
  required: "닉네임은 필수 입력 항목입니다.",
  minLength: {
    value: 2,
    message: "최소 2자 이상 입력해 주세요.",
  },
  maxLength: {
    value: 8,
    message: "최대 8자까지 입력 가능합니다.",
  },
};

export const authCodeValid: RegisterOptions = {
  required: "인증번호는 필수 입력 항목입니다.",
};

export const selectValid: RegisterOptions = {
  required: "항목을 선택해 주세요.",
};
