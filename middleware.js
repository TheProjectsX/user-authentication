import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/nextauth/login",
  },
});

// The Matcher can't match "/next-auth" - so needed to use "/nextauth" instead...
export const config = { matcher: ["/nextauth"] };
