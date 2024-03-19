import { CanActivate, ExecutionContext, ForbiddenException, Injectable, } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from './roles.decorator'


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
      if (!requiredRoles) return true

      const req = context.switchToHttp().getRequest()

      // const user = this.userService.findByEmp(req.user.emp)

      // return user.then(res => res.permissions.some(role => requiredRoles.includes(role.CODE))
      // ).then(access => {
      //   if (access) return access
      //   throw new ForbiddenException("Нет доступа!")
      // })

    } catch (e) {
      console.warn(e.message)
      throw e || new ForbiddenException("Нет доступа!")
    }
  }
}
