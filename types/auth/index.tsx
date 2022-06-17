export interface VerifyOTPPayload {
  otp: string
}

export interface VerifyOTPPayloadForgetPassword {
  otp: string
  idUser: string | null
}

export interface AuthForgetPassword {
  email: string
}

export interface ResetPassword {
  password: string
  passwordConfirm: string
  idUser: string | null
}
export interface AuthEmailPayload {
  email: string,
  password: string
}

export interface VerifyOTPPayload {
  otp: string
}
