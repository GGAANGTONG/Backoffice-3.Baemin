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

describe('UsersRepository_test_code', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('findUserByEmail', async () => {
        let testUser = {
            userId: 1,
            email: 'test@example.com',
            kakao: 'test_kakao_id',
        };
        const expectedReturn = 'email'
        mockdataSource.getRepository('users').findOne.mockResolvedValueOnce(expectedReturn)
        const user = await usersRepository.findUserByEmail(testUser.email);
        expect(user).toBe(expectedReturn);
    });

    it('findUserByKakao', async () => {
        let testUser = {
            userId: 1,
            email: 'test@example.com',
            kakao: 'test_kakao_id',
        };
        const expectedReturn = 'kakao'
        mockdataSource.getRepository('users').findOne.mockResolvedValueOnce(expectedReturn)
        const user = await usersRepository.findUserByKakao(testUser.kakao);
        expect(user).toBe(expectedReturn);
    });

    it('findUserByUserId', async () => {
        let testUser = {
            userId: 1,
            email: 'test@example.com',
            kakao: 'test_kakao_id',
        };
        const expectedReturn = 'userId'
        mockdataSource.getRepository('users').findOne.mockResolvedValueOnce(expectedReturn)
        const user = await usersRepository.findUserByUserId(testUser.kakao);
        expect(user).toBe(expectedReturn);
    });

    it('createUser', async () => {
        let testUser = {
            userId: 1,
            email: 'test@example.com',
            kakao: 'test_kakao_id',
        };
        const expectedReturn = testUser;
        mockdataSource.getRepository('users').insert.mockResolvedValueOnce(expectedReturn);
        const user = await usersRepository.createUser(testUser);
        expect(user).toEqual(expectedReturn);
    });

    it('updateUserByUserId', async () => {
        let testUser = {
            userId: 1,
            email: 'test@example.com',
            kakao: 'test_kakao_id',
        };
        const updatedData = {
            userId: 1,
            email: 'updatedtest@example.com',
            kakao: 'updatedtest_kakao_id',
        };
        mockdataSource.getRepository('users').update.mockResolvedValueOnce(updatedData);
        const user = await usersRepository.updateUserByUserId(testUser.userId, updatedData);
        expect(user).toEqual(updatedData);
    });

    it('updateUserByEmail', async () => {
        let testUser = {
            userId: 1,
            email: 'test@example.com',
            kakao: 'test_kakao_id',
        };
        const updatedData = {
            userId: 1,
            email: 'updatedtest@example.com',
            kakao: 'updatedtest_kakao_id',
        };
        mockdataSource.getRepository('users').update.mockResolvedValueOnce(updatedData);
        const user = await usersRepository.updateUserByEmail(testUser.email, updatedData);
        expect(user).toEqual(updatedData);
    });

    it('deleteUser', async () => {
        let testUser = {
            userId: 1,
            email: 'test@example.com',
            kakao: 'test_kakao_id',
        };
        const expectedReturn = null;
        mockdataSource.getRepository('users').delete.mockResolvedValueOnce(expectedReturn);
        const user = await usersRepository.deleteUser(testUser.userId);
        expect(user).toBe(expectedReturn);
    });
});

