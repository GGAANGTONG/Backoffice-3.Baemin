import { UsersService } from "../../src/service/users.service";
import { jest } from "@jest/globals";
import bcrypt from 'bcrypt'
import { UsersRepository } from "../../src/repository/users.repository";

let mockUsersRepository = {
    findUserByKakao: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserByUserId: jest.fn(),
    findUser: jest.fn(),
    deleteUser: jest.fn(),
    // jest.fn()속성을 부여받으면 고유의 특성과 함께 추적이 가능해진다.
};

const usersService = new UsersService(mockUsersRepository);

describe('UsersService_test_code', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('signUp', async () => {
        let testUser = {
            userId: 1,
            email: 'test@example.com',
            kakao: 'test_kakao_id',
        };
        const expectedReturn = 'email'
        mockdataSource.getRepository('users').findOne.mockResolvedValueOnce(expectedReturn)
        const user = await usersService.findUserByEmail(testUser.email);
        expect(user).toBe(expectedReturn);
    });
});
