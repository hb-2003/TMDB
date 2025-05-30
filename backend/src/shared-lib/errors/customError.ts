import { GraphQLError } from "graphql";
class CustomGraphqlError extends GraphQLError {
  code: string;
  type: string;

  constructor(message: string, code: string = "CUSTOM_GRAPHQL_ERROR") {
    super(message, { extensions: { code, type: "CUSTOM_GRAPHQL_ERROR" } });
    this.code = code;
    this.type = "CUSTOM_GRAPHQL_ERROR";
  }
}

export default CustomGraphqlError;
