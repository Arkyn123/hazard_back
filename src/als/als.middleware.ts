import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AsyncLocalStorage } from 'async_hooks'
import { Cache } from 'cache-manager'

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  constructor(
    private readonly als: AsyncLocalStorage<any>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly config: ConfigService
  ) { }

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization as string
    const bearer = authHeader?.split(' ')[0]
    const token = authHeader?.split(' ')[1]

    if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('Пользователь не авторизован!')

    const store = await this.cacheManager.wrap(token, async () => await this.decodeToken(token), this.config.get('CACHE_TTL'))

    console.log(req.originalUrl)
    console.log(store)
    await this.cacheManager.set(token, store, this.config.get('CACHE_TTL'))

    this.als.run(store, () => next())
  }

  private async decodeToken(token: string) {
    return await fetch(process.env.DECODE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then(res => {
        if (!res.ok) throw new UnauthorizedException('Ошибка в декодировании токена!')
        return res.json()
      })
  }
}