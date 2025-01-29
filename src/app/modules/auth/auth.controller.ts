import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;
  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successful",
    data: {
      accessToken,
    },
  });
});

export const AuthControllers = { loginUser };
