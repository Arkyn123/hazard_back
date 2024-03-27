import { SetMetadata } from "@nestjs/common"

//https://docs.nestjs.com/security/authentication#enable-authentication-globally
//мы экспортировали две константы. Один из них — это наш ключ метаданных с именем ROLES_KEY, а другой — сам наш новый декоратор, который мы собираемся вызвать Roles
export const ROLES_KEY = 'roles'
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)