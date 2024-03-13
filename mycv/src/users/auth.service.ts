import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }


    async signUp(email: string, password: string) {
        // See if email is in user
        const users = await this.usersService.find(email)
        if (users.length > 0) {
            throw new BadRequestException('email in use')
        }

        // Hash the users password
        //Generate a salt
        const salt = randomBytes(8).toString('hex')

        // Hash  the salt and password together
        const hash = await scrypt(password, salt, 32) as Buffer

        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex')

        // Create a new user and save it
        const user = await this.usersService.create(email, result)

        // return the user
        return user

    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email)
        console.log('user: ',user)

        if (!user) {
            throw new UnauthorizedException('email or password not correct')
        }

        const [salt, storedHash] = user.password.split('.')

        const hash = await scrypt(password, salt, 32) as Buffer

        if (storedHash !== hash.toString('hex')) {
            throw new UnauthorizedException('email or password not correct')
        }

        return user

    }
}