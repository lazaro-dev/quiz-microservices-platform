import jwt from "jsonwebtoken";

import { JwtService } from "@/modules/auth/JwtService";

describe("JwtService", () => {

    const jwtService = new JwtService();

    it("Deve validar o token", () => {

        const token = jwt.sign(
            {
                sub: "1",
                username: "Lazaro",
                role: "USER",
            },
            process.env.JWT_SECRET!
        );

        const result =
            jwtService.verify(token);

        expect(result.id)
            .toBe(1);

        expect(result.username)
            .toBe("Lazaro");

        expect(result.role)
            .toBe("USER");

    });

});