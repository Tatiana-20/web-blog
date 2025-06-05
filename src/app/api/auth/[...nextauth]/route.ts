import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Login, RefreshToken } from "@/services/auth";
import { jwtDecode } from "jwt-decode";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await Login({
            email: credentials?.email || "",
            password: credentials?.password || "",
          });

          if (user && user.access_token) {
            const decodedToken: { rol: string; sub: string } = jwtDecode(
              user.access_token
            );

            return {
              id: decodedToken.sub,
              name: user.user,
              email: user.email,
              accessToken: user.access_token,
              refreshToken: user.refresh_token,
              role: decodedToken.rol,
            };
          } else {
            throw new Error(user.message || "Credenciales inválidas");
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "Error al iniciar sesión");
          }
          throw new Error("Error al iniciar sesión");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
      }

      interface DecodedToken {
        exp: number;
        sub: string;
        email: string;
        rol: string;
      }
      const decodedAccessToken: DecodedToken | null = token.accessToken
        ? (jwtDecode(token.accessToken) as DecodedToken)
        : null;
      const now = Math.floor(Date.now() / 1000);

      if (
        decodedAccessToken &&
        decodedAccessToken.exp &&
        decodedAccessToken.exp > now
      ) {
        return token;
      }

      if (token.refreshToken) {
        try {
          const newAccessToken = await RefreshToken(
            token.refreshToken as string
          );
          if (newAccessToken && newAccessToken.access_token) {
            token.accessToken = newAccessToken.access_token;
            return token;
          }
        } catch (error) {
          console.error("Error al refrescar el token:", error);
        }
      }

      return { ...token, error: "RefreshAccessTokenError" };
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
