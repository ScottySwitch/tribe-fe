import Api from "../";
import {AuthForgetPassword, ResetPassword, VerifyOTPPayloadForgetPassword} from "../../types/auth";

const forgetPasswordByEmail = async (params: AuthForgetPassword) => {
  const url = `/api/auth/forgot-password`;
  return await Api.post(url, {
    email: params.email,
  });
}

const otpPhoneGenerate = async () => {
  const url = `/api/otp-phone-generate`;
  return await Api.get(url);
}

const otpEmailConfirmForgetPassword = async (params: VerifyOTPPayloadForgetPassword) => {
  const url = `/api/otp-email-forgetpassword`;
  return await Api.post(url, {
    otp: params.otp,
    idUser: params.idUser
  });
}

const resetPassword = async (params: ResetPassword) => {
  const url = `/api/auth/reset-password`;
  return await Api.post(url, {
    password: params.password,
    passwordConfirmation: params.passwordConfirm,
    idUser: params.idUser
  });
}

export default {
  forgetPasswordByEmail,
  resetPassword,
  otpEmailConfirmForgetPassword,
  otpPhoneGenerate
}
