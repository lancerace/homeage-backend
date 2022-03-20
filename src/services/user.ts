import { DBErrorHandling } from '../utils/db';
import User from "../entities/user"
import { ERole } from '../interfaces/user';
import { getConnection, getRepository } from 'typeorm';



async function addUser(fullName: string, nric: string, role: ERole): Promise<User> {
        const user: User = await getRepository(User).save({
            fullName: fullName,
            nric: nric,
            role: role
        });

        console.log("adduser");
        return user;
}

async function getUser(nric: string, userId?: number): Promise<User> {
    const query = getRepository(User).createQueryBuilder('user');
    if (userId)
        query.where(`user.userId = :userId`, { userId })

    query.where(`user.nric = :nric`, { nric })


    return await query.getOne();
}


async function updateUser(userId: number, fullName: string, nric: string):Promise<any>{

   return getConnection().createQueryBuilder().update(User)
    .set({ fullName,nric }).where("userId = :userId", { userId }).returning(['*']).execute();
}


export default { addUser, getUser, updateUser }