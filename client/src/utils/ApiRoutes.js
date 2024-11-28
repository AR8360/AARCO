// export const host = "https://aarco.onrender.com";
export const host = "http://localhost:3000";
//user routes
export const login = `${host}/user/login`;
export const verify = `${host}/api/verify`; // verify if user is admin
export const generateOtp = `${host}/user/generate-otp`; //generate otp for forgot password
export const verifyOtp = `${host}/user/verify-otp`; //verify otp for forgot password
export const register = `${host}/user/register`;
export const getallUnregisterUser = `${host}/user/all-unregister-user`;
export const verifyUnregisterEmail = `${host}/user/verify-unregister-email`;
export const deleteUnregisterUser = `${host}/user/delete-unregister-user`;
export const approverMember = `${host}/user/approve-user`;
export const setAdmin = `${host}/user/change-status`;
export const logoutRoute = `${host}/user/logout`;

// new member routes
export const addNewMemberRoute = `${host}/newuser/add`;

// news routes
export const addNewsRoute = `${host}/news/create-news`;
export const DeleteNewsRoute = `${host}/news/delete-news`;
export const getNewsRoute = `${host}/news/getAllNews`;

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
