import { join } from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const typesArray = loadFilesSync(join(__dirname, "./**/*.graphql"));
const resolverArray = loadFilesSync(join(__dirname, "./**/*.resolvers.*"));

export const typeDefs = mergeTypeDefs(typesArray);
export const resolvers = mergeResolvers(resolverArray);

// import userTypeDefs from "./user";
// import userResolvers from "./user/resolvers/auth.resolvers";

// import ProductTypeDefs from "./product";
// import ProductResolvers from "./product/resolvers/product.resolvers";

// const typeDefs = [userTypeDefs, ProductTypeDefs];
// const resolvers = [userResolvers, ProductResolvers];

// export { typeDefs, resolvers };
