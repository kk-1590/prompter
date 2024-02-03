import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user"; 
import mongoose from "mongoose";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

//   connectToDB();


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callback: {
    async session({ session }) {
      const sessionUser = await mongoose.model('User').findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      console.log("jhhjhk");
      try {
        //serverless route -> Lambda -> dynamodb
        console.log("hkhjhkhjh");
        await connectToDB();
        console.log("kjkj");

        // check if user already exists

        const userExists = await mongoose.model('User').findOne({
          email: profile.email,
        });

        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("hjhhj", error);
        return false;
      }
    },
  },

  //   callbacks: {},
});

export {handler as GET, handler as POST};
