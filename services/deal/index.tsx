import Api from "../index";

const qs = require('qs');

const createDeal = async (params: any) => {
  const url = `/api/deals`;
  return await Api.post(url, {
    data: params
  });
}

const deleteDeal = async (dealId: any) => {
  const url = `/api/deals/${dealId}`;
  return await Api.delete(url);
}

export default {
  createDeal,
  deleteDeal
}
