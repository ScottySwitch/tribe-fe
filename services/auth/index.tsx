import Api from "../";
import {
  AuthEmailPayload, 
  VerifyOTPPayload,
  AuthForgetPassword,
  VerifyOTPPayloadForgetPassword,
  ResetPassword
} from "../../types/auth";
import {UsersTypes} from "../../enums";

const signUpByEmail = async (params: AuthEmailPayload) => {
  localStorage.removeItem("token");
  const url = `/api/auth/local/register`;
  return await Api.post(url, {
    username: params.email,
    email: params.email,
    password: params.password,
  });
}

const otpEmailGenerate = async () => {
  const url = `/api/otp-email-generate`;
  return await Api.get(url);
}

const otpEmailConfirm = async (params: VerifyOTPPayload) => {
  const url = `/api/otp-email-confirm`;
  return await Api.post(url, {
    otp: params.otp
  });
}

const otpPhoneGenerate = async (phoneNumber: string) => {
  const url = `/api/otp-phone-generate?phone=${phoneNumber}`;
  return await Api.get(url);
}

const otpPhoneConfirm = async (params: VerifyOTPPayload) => {
  const url = `/api/otp-phone-confirm`;
  return await Api.post(url, {
    otp: params.otp
  });
}

const loginByEmail = async (params: AuthEmailPayload) => {
  localStorage.removeItem("token");
  const url = `/api/auth/local`;
  return await Api.post(url, {
    identifier: params.email,
    password: params.password,
  });
}

const getMe = async () => {
  const url = `/api/users/me`;
  const me = await Api.get(url);
  if (!me.data) {
    localStorage.removeItem('token');
    window.location.href = "/";
  }
  if (!me.data.avatar) {
    me.data.avatar = 'https://picsum.photos/200'
  } else {
    me.data.avatar = me.data.avatar
  }
  me.data.type = UsersTypes.NORMAL_USER // TODO: confirm this logic
  me.data.token = localStorage.getItem('token');
  localStorage.setItem("user", JSON.stringify(me.data))
  localStorage.setItem("user_id", me.data.id)
}

const forgetPasswordByEmail = async (params: AuthForgetPassword) => {
  const url = `/api/auth/forgot-password`;
  return await Api.post(url, {
    email: params.email,
  });
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
  signUpByEmail,
  otpEmailGenerate,
  otpEmailConfirm,
  otpPhoneGenerate,
  otpPhoneConfirm,
  loginByEmail,
  getMe,
  otpEmailConfirmForgetPassword,
  forgetPasswordByEmail,
  resetPassword
}
