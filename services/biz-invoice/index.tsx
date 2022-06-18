import Api from "../index";
import {AuthEmailPayload} from "../../types/auth";

const qs = require('qs');

const createBizInvoice = async (params: any) => {
  const url = `/api/biz-invoices`;
  return await Api.post(url, {
    data: {
        user: localStorage.getItem('user_id'),
        value: params.value,
        payment_method: params.paymentMethod,
        transaction_id: params.transaction_id,
        biz_listing: localStorage.getItem('biz_id')
    }
  });
}

export default {
    createBizInvoice
}
