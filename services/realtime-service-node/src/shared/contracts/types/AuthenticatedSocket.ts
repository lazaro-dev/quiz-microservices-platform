import { Socket } from "socket.io";
import { AuthUser } from "@/modules/auth/AuthUser";

export interface AuthenticatedSocket
    extends Socket {

    data: {
        user: AuthUser;
    };
}