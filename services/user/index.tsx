import Api from "../index";
import {UploadRefPayload} from "../../types/upload";

const updateUser = async (userId: number, params: any) => {
  const url = `/api/users/${userId}`;
  return await Api.put(url, params);
}

export default {
  updateUser
}
