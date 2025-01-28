import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDb(req?.file, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registration successful",
    data: result,
  });
});

export const AuthControllers = { registerUser };
