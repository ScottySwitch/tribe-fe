import category from "services/category";
import user from "services/user";
import Api from "../index";

const qs = require('qs');

const createDealFavourite = async (dealId) => {
	let userInfo = JSON.parse(localStorage.getItem("user") || '{}')  
	const url = `/api/user-deal-favourites`;
	return await Api.post(url, {
		data: {
			user: userInfo.id,
			deal: dealId
		}
	});
}

export default {
    createDealFavourite,
}
