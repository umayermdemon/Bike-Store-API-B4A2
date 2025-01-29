import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDb(req?.file, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registration successful",
    data: result,
  });
});
const getUser = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await UserServices.getUserFromDb(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User is retrieved successful",
    data: result,
  });
});

export const UserControllers = { registerUser, getUser };
