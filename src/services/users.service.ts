import { getRepository } from "typeorm"
import { UserEntity } from "../entity/users.entity"
import HttpException from "../exception/HttpException"
import bcrypt from 'bcrypt'
import config from '../configs/development.json'
import jwt from 'jsonwebtoken'

class UserService {
    public users = UserEntity

    public createUser = async (data: any): Promise<any> => {
        const userRepository = getRepository(this.users)
        const findUser = await userRepository.findOne({ where: { email: data.email, isActive: true } })
        if (findUser) throw new HttpException(400, 'User already exists', 'FAILURE')
        const password = await bcrypt.hash(data.password, 10)
        return await userRepository.save({ ...data, password })
    }

    public createToken(user: any) {
        const dataStoredInToken = { id: user.id };
        const secretKey = config['secretKey'];
        const expiresIn = "365 days";
        return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
    }

    public async loginUser(data: any): Promise<{ token: string; findUser: any }> {
        if (!data) throw new HttpException(200, "Please confirm user data", 'FAILURE');

        const userRepository = getRepository(this.users);
        const findUser = await userRepository.findOne({ where: { email: data.email, isActive: true } });
        if (!findUser) throw new HttpException(200, 'User not found', 'FAILURE');

        const isPasswordMatching: boolean = await bcrypt.compare(data.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(200, 'Invalid username or password', 'FAILURE');

        const tokenData = this.createToken(findUser);
        return { token: tokenData.token, findUser };
    }

}

export default UserService