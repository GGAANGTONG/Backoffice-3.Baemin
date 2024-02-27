import { jest } from "@jest/globals";



// Mocking the request and response objects
const req = {
    body: {
        email: 'test@example.com',
        cocoa: 'cocoa',
        password: 'password',
        passwordCheck: 'password',
        name: 'Test User',
        role: 'User',
        address: '123 Street, City',
    },
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
};

describe('UsersController', () => {
    describe('signUp', () => {
        it('should sign up a new user', async () => {
            await UsersController.signUp(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });

        // Add more test cases for different scenarios
    });

    describe('signIn', () => {
        it('should sign in a user', async () => {
            await UsersController.signIn(req, res);
            expect(res.cookie).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalled();
        });

        // Add more test cases for different scenarios
    });

    describe('getInfo', () => {
        it('should get user information', async () => {
            await UsersController.getInfo(req, res);
            expect(res.json).toHaveBeenCalled();
        });

        // Add more test cases for different scenarios
    });
});