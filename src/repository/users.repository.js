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

    findUserByEmailAndPassword = async (email, password) => {
        const user = await dataSource.getRepository('users').findOne({
            where: {
                email,
                password,
            }
        })
    }

    createUser = async (data) => {
        await dataSource.getRepository('users').insert(data);
    }

    updateUser = async (userId, data) => {
        await dataSource.getRepository('users').update({
            userId: +userId,
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