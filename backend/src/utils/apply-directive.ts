import { GraphQLSchema } from "graphql";
import auth from "../directives/auth-user";

const directiveObj: {
  [key: string]: (
    schema: GraphQLSchema,
    directiveName: string
  ) => GraphQLSchema;
} = {
  auth,
  // validateEmail,
  // validatePassword,
};

const applyDirective = (
  schema: GraphQLSchema,
  directiveNames: string[] = Object.keys(directiveObj)
): GraphQLSchema => {
  return directiveNames.reduce((currentSchema, directiveName) => {
    const directive = directiveObj[directiveName];
    if (directive) {
      return directive(currentSchema, directiveName);
    }
    return currentSchema;
  }, schema);
};

export default applyDirective;
