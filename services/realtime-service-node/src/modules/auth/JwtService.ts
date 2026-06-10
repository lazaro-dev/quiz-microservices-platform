import jwt from "jsonwebtoken";
import { Env } from "@/config/Env";
import { JwtPayload } from "@/modules/auth/JwtPayload";
import { AuthUser } from "./AuthUser";

export class JwtService {

    public verify(token: string): AuthUser {
        const payload = jwt.verify(token, Env.JWT_SECRET) as JwtPayload;

        return {
            id: Number(payload.sub),
            username: payload.username,
            role: payload.role,
        };
    }
}