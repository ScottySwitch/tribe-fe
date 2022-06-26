import Api from "../";
import {
  AuthEmailPayload, 
  VerifyOTPPayload,
  AuthForgetPassword,
  VerifyOTPPayloadForgetPassword,
  ResetPassword,
  AuthPhonePayload,
  AuthForgetPasswordByPhone
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

const signUpByPhone = async (params: AuthPhonePayload) => {
  localStorage.removeItem("token");
  const url = `/api/auth/local/register`;
  return await Api.post(url, {
    username: params.phone_number,
    email: params.email,
    password: params.password,
    phone_number: params.phone_number
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

const loginByPhone = async (params: AuthPhonePayload) => {
  localStorage.removeItem("token");
  const url = `/api/auth/local`;
  return await Api.post(url, {
    identifier: params.phone_number,
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

const forgetPasswordByPhone = async (params: AuthForgetPasswordByPhone) => {
  const url = `/api/auth/forgot-password-by-phone`;
  return await Api.post(url, {
    phone_number: params.phone_number,
  });
}

const otpEmailConfirmForgetPassword = async (params: VerifyOTPPayloadForgetPassword) => {
  const url = `/api/otp-email-forgetpassword`;
  return await Api.post(url, {
    otp: params.otp,
    userId: params.userId
  });
}

const resetPassword = async (params: ResetPassword) => {
  const url = `/api/auth/reset-password`;
  return await Api.post(url, {
    password: params.password,
    passwordConfirmation: params.passwordConfirm,
    userId: params.userId
  });
}

const loginFacebookCallback = async (accessToken: any) => {
  localStorage.removeItem('token');
  const url = `/api/auth/facebook/callback?access_token=${accessToken}`;
  let user = await Api.get(url);
  if (user.data) {
    let { jwt } = user.data;
    localStorage.setItem("token", jwt)
    await getMe();
    window.location.href = '/signup/setup-profile';
  }
}

const loginGoogleCallback = async (accessToken: any) => {
  localStorage.removeItem('token');
  const url = `/api/auth/google/callback?access_token=${accessToken}`;
  let user = await Api.get(url);
  if (user.data) {
    let { jwt } = user.data;
    localStorage.setItem("token", jwt)
    await getMe();
    window.location.href = '/signup/setup-profile';
  }
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
  forgetPasswordByPhone,
  resetPassword,
  signUpByPhone,
  loginByPhone,
  loginFacebookCallback,
  loginGoogleCallback
}
