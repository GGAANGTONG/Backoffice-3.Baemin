import { dataSource } from "../typeorm/index.js";

class UsersRepository {
    findUserByEmail = async (email) => {
        const user = await dataSource.getRepository('users').findOne({
            where: {
                email,
            }
        })
        return user;
    }

    findUserByKakao = async (kakao) => {
        const user = await dataSource.getRepository('users').findOne({
            where: {
                kakao,
            }
        })
        return user;
    }

    findUserByUserId = async (userId) => {
        const user = await dataSource.getRepository('users').findOne({
            where: {
                userId,
            }
        })
        return user;
    }

    createUser = async (data) => {
        await dataSource.getRepository('users').insert(data);
    }

    updateUserByUserId = async (userId, data) => {
        await dataSource.getRepository('users').update({
            userId: +userId,
        }, data)
    }

    updateUserByEmail = async (email, data) => {
        await dataSource.getRepository('users').update({
            email: email,
        }, data)
    }

    deleteUser = async (userId) => {
        await dataSource.getRepository('users').delete({
            userId: +userId,
        })
    }
}
const usersRepository = new UsersRepository();
export default usersRepository;