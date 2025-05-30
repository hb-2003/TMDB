import { login } from "./mutations/login";
import { refreshTokenThrowAccessToken } from "./mutations/refreshTokenThrowAccessToken";
import { register } from "./mutations/register";
import { resetPassword } from "./mutations/resetPassword";
import { resetPasswordUpdate } from "./mutations/resetPasswordUpdate";
import { resetPasswordVerify } from "./mutations/resetPasswordVerify";
import { sendVerificationEmail } from "./mutations/sendVerificationEmail";
import { verifyEmail } from "./mutations/verifyEmail";
const resolvers = {
  Query: {
    demo() {
      return "Hello World";
    },
  },
  Mutation: {
    register,
    verifyEmail,
    sendVerificationEmail,
    resetPassword,
    resetPasswordVerify,
    resetPasswordUpdate,
    login,
    refreshTokenThrowAccessToken,
  },
};

export default resolvers;
