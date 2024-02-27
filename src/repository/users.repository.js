// import { dataSource } from "../typeorm/index.js";

export class UsersRepository {
    constructor(dataSource) {
        this.dataSource = dataSource
    }
    findUserByEmail = async (email) => {
        const user = await this.dataSource.getRepository('users').findOne({
            where: {
                email,
            }
        })
        return user;
    }

    findUserByKakao = async (kakao) => {
        const user = await this.dataSource.getRepository('users').findOne({
            where: {
                kakao,
            }
        })
        return user;
    }

    findUserByUserId = async (userId) => {
        const user = await this.dataSource.getRepository('users').findOne({
            where: {
                userId,
            }
        })
        return user;
    }

    createUser = async (data) => {
        await this.dataSource.getRepository('users').insert(data);
    }

    updateUserByUserId = async (userId, data) => {
        await this.dataSource.getRepository('users').update({
            userId: +userId,
        }, data)
    }

    updateUserByEmail = async (email, data) => {
        await this.dataSource.getRepository('users').update({
            email: email,
        }, data)
    }

    deleteUser = async (userId) => {
        await this.dataSource.getRepository('users').delete({
            userId: +userId,
        })
    }
}