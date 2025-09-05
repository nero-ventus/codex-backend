const request = require("supertest");
const app = require("../app");

describe("User Routes", () => {
    it("should authenticate the user", async () => {
        const response = await request(app)
            .post("/user/authenticateUser")
            .send({ email: "hroberto672@gmail.com", password: "1234" });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toStrictEqual({ firstName: "Roberto", lastName: "Hernandez Villa" });
    });

    it("should not authenticate the user", async () => {
        const response = await request(app)
            .post("/user/authenticateUser")
            .send({ email: "hroberto672@gmail.com", password: "123" });
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Authentication failed. Invalid password.");
    });

    it("should logout the user", async () => {
        const response = await request(app)
            .post("/user/logoutUser");
        expect(response.statusCode).toBe(200);
        expect(response.headers["set-cookie"]).toStrictEqual([
            'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None'
        ]);
    });
});