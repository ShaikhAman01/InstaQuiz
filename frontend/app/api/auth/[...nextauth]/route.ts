import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

// Define authOptions
export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account?.provider === 'google') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: profile?.email, name: profile?.name })
        })

        const text = await res.text()
        console.log('[DEBUG] Raw response:', text)

        if (!res.ok) {
          console.error('API Error:', res.status, text)
          return token
        }

        let dbUser
        try {
          dbUser = JSON.parse(text)
        } catch (e) {
          console.error('Failed to parse JSON:', text)
          return token
        }

        token.userId = dbUser.id
        token.isAdmin = dbUser.isAdmin
      }

      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.userId
      session.user.isAdmin = token.isAdmin
      return session
    },
    async redirect({ baseUrl, session }: any) {
      if (session?.user) {
        return `${baseUrl}/quiz/create`
      }
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  }
}

// Create the NextAuth handler
const handler = NextAuth(authOptions)

// Export GET and POST handlers
export { handler as GET, handler as POST }