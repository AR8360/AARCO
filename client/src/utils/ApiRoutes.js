export const host = "http://localhost:3000";

//user routes
export const verify = `${host}/api/verify`;
export const verifyotp = `${host}/user/verify-otp`;
export const loginorSinupRoute = `${host}/user/loginorsignup`;
export const setAdmin = `${host}/user/change-status`;

// news routes
export const addNewsRoute = `${host}/news/create-news`;
export const DeleteNewsRoute = `${host}/news/delete-news`;
export const getNewsRoute = `${host}/news/getAllNews`;

// member routes
export const addMemberRoute = `${host}/committee/addmember`;
export const getMembersRoute = `${host}/committee/getmembers`;
export const deleteMemberRoute = `${host}/committee/deletemember`;

// retirment routes
export const addRetrimentRoute = `${host}/committee/addretirment`;
export const getRetrimentRoute = `${host}/committee/getretirments`;
export const deleteRetrimentRoute = `${host}/committee/deleteretirment`;

// committee routes
export const getCommitteeRoute = `${host}/committee/getcommittee`;
export const createCommitteeRoute = `${host}/committee/createcommittee`;
export const deleteCommitteeRoute = `${host}/committee/deletecommittee`;

//gallery routes
export const gallery = `${host}/gallery`;

//pdf routes
export const addPdfRoute = `${host}/pdf`;
export const getPdfRoute = `${host}/pdf`;
export const deletePdfRoute = `${host}/pdf`;
