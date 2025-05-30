import {
  GraphQLSchema,
  GraphQLFieldConfig,
  defaultFieldResolver,
  GraphQLError,
} from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import jwt from "jsonwebtoken";
import User from "../schema/models/user";
import dotenv from "dotenv";
import { payload } from "../utils/types";
import { Config } from "../config/config";
import CustomGraphqlError from "../shared-lib/errors";
import { getMessage } from "../utils/message";

dotenv.config();

const key = Config.JWT_SECRET;

export const auth = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig: GraphQLFieldConfig<any, any>) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async (source, args, context, info) => {
          try {
            const BearerToken: string | undefined =
              context.req?.headers?.authorization;
            if (!BearerToken?.startsWith("Bearer ")) {
              throw new CustomGraphqlError(getMessage("UNAUTHORIZED"), "UNAUTHORIZED");
            }
            const token: string = BearerToken.split(" ")[1];
            if (!key) {
              throw new CustomGraphqlError(
                "JWT_SECRET_NOT_FOUND",
                "JWT_SECRET_NOT_FOUND"
              );
            }
            let decoded: payload = { email: "" };
            await jwt.verify(token, key, (err, result) => {
              if (err && err.name === "TokenExpiredError") {
                throw new CustomGraphqlError(getMessage("TOKEN_EXPIRED"),"TOKEN_EXPIRED");
              }
              if (err && err.name === "JsonWebTokenError") {
                throw new CustomGraphqlError(getMessage("INVALID_TOKEN"), "INVALID_TOKEN");
              }
              decoded = result as payload;
              if (!decoded) {
                throw new CustomGraphqlError(getMessage("INVALID_TOKEN"), "INVALID_TOKEN");
              }
            });
            const user: User | null = await User.findOne({
              where: { email: decoded.email },
            });
            if (!user) {
              throw new CustomGraphqlError(getMessage("UNAUTHORIZED"), "UNAUTHORIZED");
            }
            context.req.user = user;
          } catch (error) {
            throw error;
          }
          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
};

export default auth;
