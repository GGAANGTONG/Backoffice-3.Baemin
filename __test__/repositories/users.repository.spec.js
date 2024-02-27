import { UsersRepository } from '../../src/repository/users.repository'
import { jest } from '@jest/globals';

let mockdataSource = {
    getRepository: function (users) {
        if (users) {
            return this;
        }
    },
    insert: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    // jest.fn()속성을 부여받으면 고유의 특성과 함께 추적이 가능해진다.
};

const usersRepository = new UsersRepository(mockdataSource)

describe('UsersRepository', () => {
    const testUser = {
        userId: 1,
        email: 'test@example.com',
        kakao: 'test_kakao_id',
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });
    // afterEach(() => {
    //     // Implement any cleanup logic after each test
    // });

    it('findUserByEmail', async () => {
        const expectedReturn = '굿'
        mockdataSource.getRepository('users').findOne.mockResolvedValueOnce(expectedReturn)
        const user = await usersRepository.findUserByEmail(testUser.email);
        expect(user).toBe(expectedReturn);
    });

    it('findUserByKakao', async () => {
        const expectedReturn = undefined
        mockdataSource.getRepository('users').findOne.mockResolvedValueOnce(expectedReturn)
        const user = await usersRepository.findUserByKakao(testUser.kakao);
        expect(user).toBe(expectedReturn);
    });

    it('findUserByUserId', async () => {
        const expectedReturn = '굿'
        mockdataSource.getRepository('users').findOne.mockResolvedValueOnce(expectedReturn)
        const user = await usersRepository.findUserByKakao(testUser.kakao);
        expect(user).toBe(expectedReturn);
    });

    it('createUser', async () => {
        const data = { /* your test user data */ };
        await usersRepository.createUser(data);
        const createdUser = await usersRepository.findUserByEmail(data.email);
        expect(createdUser).toBe(1);
    });

    it('updateUserByUserId', async () => {
        const updatedData = { /* your updated data */ };
        await usersRepository.updateUserByUserId(testUser.userId, updatedData);
        const updatedUser = await usersRepository.findUserByUserId(testUser.userId);
        expect(updatedUser).toBe(1);
    });

    it('updateUserByEmail', async () => {
        const updatedData = { /* your updated data */ };
        await usersRepository.updateUserByEmail(testUser.email, updatedData);
        const updatedUser = await usersRepository.findUserByEmail(testUser.email);
        expect(updatedUser).toBe(1);
    });

    it('deleteUserByUserId', async () => {
        const expectedReturn = '굿'
        mockdataSource.getRepository('users').delete.mockResolvedValueOnce(expectedReturn)
        const deletedUser = await usersRepository.deleteUser(testUser.userId);
        expect(deletedUser).toBe(expectedReturn);
    });
});