import Jwt, { JwtPayload } from "jsonwebtoken";
import client from "../client";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = Jwt.verify(token, process.env.SECRET_KEY) as ExtendedJwtPayload;
    interface ExtendedJwtPayload extends JwtPayload {
      id: number;
    }

    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {}
};

export const protectedResolver = (resolver) => {
  return (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return resolver(root, args, context, info);
  };
};
