import app from "app"
import { number } from "joi"
import { FruitInput } from "services/fruits-service"
import supertest from "supertest"

//suite
describe("fruit tests", () => {

    // tests
    it("should create a valid fruit", async () => {
        const body: FruitInput = {
            name: "abacate",
            price: 1400
        }

        const { status } = await supertest(app).post("/fruits").send(body)
        expect(status).toBe(201)
    })

    it("should return all fruits", async () => {
        const { body, status } = await supertest(app).get("/fruits");
        expect(body.length).toBe(1);
        expect(status).toBe(200);
    })

    it("should return a single fruit", async () => {
        const { body, status } = await supertest(app).get("/fruits/1")
        expect(status).toBe(200)
        expect(body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number)
        })
    })
})