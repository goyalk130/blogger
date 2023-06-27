import { CredentialsProvider } from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"


export const nNextAuythOptions= {
    providers:[

            GoogleProvider({
                clientId:process.env.GOOGLE_CLIENT_ID,
                clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                authorization:{
                  params:{
                    scope: 'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/blogger',
                    prompt:"consent",
                    access_type:"offline",
                    response_type: "code",
                  }
                }
            })
    ],
    callbacks: {
      
        async jwt({ token, user, account, profile}) {
          // Persist the OAuth access_token and or the user id to the token right after signin
          console.log(29,token,30,profile,31,user)
          if (user) {
            token.user = user;
            const u = user
            token.role = u.role;
        }
        if (account) {
            token.accessToken = account.access_token
            token.refreshToken = account.refresh_token
        }
        return token;
        },async session({ session, token, user,account }) {
          console.log(36,token,session,user,account)
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user = token.user
            
            return session
          }
      }
}
