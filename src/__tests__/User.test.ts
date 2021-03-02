import {app} from '../app';
import request from 'supertest';

import createConnection from '../database';

describe("Users", async () => {
    beforeAll(async() =>{
        const connection = await createConnection();
        await connection.runMigrations();   
    });

    it("Should be able to create a new user", async () =>{
        const response = await request(app).post("/users")
        .send({
            email: "user@exemple.com",
            name: "User Exemple",
        })
        expect(response.status).toBe(201);
    })

    it("Should not be able to crate a new user with exists email",async () =>{
        const response = await request(app).post("/users")
        .send({
            email: "user@exemple.com",
            name: "User Exemple",
        })
        expect(response.status).toBe(400);
    })
})