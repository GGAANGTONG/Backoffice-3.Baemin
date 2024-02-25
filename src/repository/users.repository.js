import { dataSource } from "../typeorm";

class UsersRepository {
    findUserByEmail = async (email) => {
        const user = await dataSource.getRepository('Users').findOne({
            where: {
                email: email
            }
        })

        return user;
    }

    findUserByEmailAndPassword = async (email, password) => {
        const user = await dataSource.getRepository('Users').findOne({
            where: {
                email,
                password,
            }
        })
    }

    createUser = async (data) => {
        await dataSource.getRepository('Users').insert(data);
    }

    updateUser = async (userId, data) => {
        await dataSource.getRepository('Users').update({
            where: {
                userId: userId,
            },
        }, data)
    }

    deleteUser = async (userId) => {
        await dataSource.getRepository('Users').delete({
            where: {
                userId: userId
            }
        });
    }
}

const usersRepository = new UsersRepository();
export default usersRepository;