import NextAuth from "next-auth";
import { nNextAuythOptions } from "../../../../../libs/auth";

const handler = NextAuth(nNextAuythOptions)

export {handler as GET, handler as POST}