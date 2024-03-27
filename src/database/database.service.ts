import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/postgres/hazard'
import { AsyncLocalStorage } from 'async_hooks'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

const customPrismaClient = (prismaClient: DatabaseHazard) => {
    const original = new PrismaClient()
    const prisma = prismaClient.$extends({
        query: {
            $allModels: {
                async create({ args, query, model }) {
                    prismaClient.cache.del(model)

                    args.data.createdBy = prismaClient.emp
                    args.data.updatedBy = prismaClient.emp
                    return query(args);
                },
                async update({ args, query, model }) {
                    prismaClient.cache.del(model)

                    return query({ ...args, data: { ...args.data, updatedBy: prismaClient.emp } })
                },
                async delete({ args, model }) {
                    prismaClient.cache.del(model)

                    return (original as any)[model].update({ data: { deletedAt: new Date(), deletedBy: prismaClient.emp }, where: args.where })
                },
                async deleteMany({ args, model }) {
                    prismaClient.cache.del(model)

                    return (original as any)[model].updateMany({ data: { deletedAt: new Date(), deletedBy: prismaClient.emp }, where: args.where })
                },
                async findMany({ args, query, model }) {
                    return prismaClient.cache.wrap(
                        model,
                        () => query({
                            ...args, where: { deletedAt: null, deletedBy: null }
                        }),
                        prismaClient.config.get<number>('CACHE_TTL')
                    )
                },
                async findUnique({ args, query }) {
                    args.where.deletedAt = null
                    args.where.deletedBy = null

                    return query(args)
                },
                async findFirst({ args, query }) {
                    args.where.deletedAt = null
                    args.where.deletedBy = null

                    return query(args)
                },

            }
        }
    })
    return prisma
}

@Injectable()
export class DatabaseHazard extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(
        protected readonly als: AsyncLocalStorage<any>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        public readonly conf: ConfigService
    ) {
        super({
            log: ['query', 'info', 'warn', 'error'],
        })
    }

    private customPrismaClient: ReturnType<typeof customPrismaClient>

    get emp() {
        return this.als.getStore()?.emp;
    }

    get cache() {
        return this.cacheManager
    }

    get config() {
        return this.conf
    }

    get client() {
        return this.customPrismaClient ??= customPrismaClient(this)
    }

    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}