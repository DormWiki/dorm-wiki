// defining the object that holds the Authentication options
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
 providers: [
  // set up the GoogleProvider module where we pass our Client ID and Secret 
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
 ],
 session: {
  // store and manage user session in your app
  strategy: 'jwt',
 },
 callbacks: {
  async signIn({account, profile}) {
    if (account.provider === 'google' &&
        profile.email.endsWith('@uw.edu')) {
      return Promise.resolve(true)
    } else {
       return Promise.resolve(false)
    }
  }
}
};
export default NextAuth(authOptions);