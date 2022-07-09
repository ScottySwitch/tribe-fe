import category from "services/category";
import user from "services/user";
import Api from "../index";

const qs = require('qs');

const createFavourite = async () => {
	let userInfo = JSON.parse(localStorage.getItem("user") || '{}')  
	const url = `/api/user-listing-favourites`;
	return await Api.post(url, {
		data: {
			user: userInfo.id,
			biz_listing: userInfo.now_biz_listing.id
		}
	});
}

export default {
    createFavourite,

}
