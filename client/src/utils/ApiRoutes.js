export const host = "http://localhost:3000";

//user routes
export const verify = `${host}/api/verify`;
export const verifyotp = `${host}/user/verify-otp`;
export const loginorSinupRoute = `${host}/user/loginorsignup`;
export const setAdmin = `${host}/user/change-status`;

// news routes
export const addNewsRoute = `${host}/news/create-news`;
export const DeleteNewsRoute = `${host}/api/message/getmsg`;
export const getNewsRoute = `${host}/news/getAllNews`;

// member routes
export const addMemberRoute = `${host}/committee/addmember`;
export const getMembersRoute = `${host}/committee/getmembers`;
export const deleteMemberRoute = `${host}/committee/deletemember`;

// retirment routes

export const addRetrimentRoute = `${host}/committee/addretirment`;
export const getRetrimentRoute = `${host}/committee/getretirments`;
export const deleteRetrimentRoute = `${host}/committee/deleteretirment`;
