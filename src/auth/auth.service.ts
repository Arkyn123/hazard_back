import { Injectable, Response, UnauthorizedException } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import fetch from 'node-fetch'

@Injectable()
export class AuthService {
    constructor() { }

    async login(auth_data: AuthDto) {
        try {
            return await this.getToken(auth_data)
        } catch (e) {
            console.warn(e.message)
            throw new UnauthorizedException('Ошибка авторизации!')
        }
    }

    private async getToken(auth_data: AuthDto) {
        return await fetch(process.env.AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(auth_data)
        }).then((res: Response) => res.text())
    }
}
