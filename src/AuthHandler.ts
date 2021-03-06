import { Application, Request } from 'express'
import * as expressJWT from 'express-jwt'

export interface ICache {
  // tslint:disable-next-line no-any
  [key: string]: any
}

export class AuthHandler {
  private static cache: Map<string, ICache> = new Map<string, ICache>()

  public static addPath (path: string, target: ICache, propertyKey?: string) {
    const className = target.name || target.constructor.name
    const cache: ICache = AuthHandler.cache.get(className) || {}

    if (!propertyKey) {
      const props = Object.getOwnPropertyNames(target.prototype)

      props.forEach((p: string) => {
        if (p !== 'constructor' && p in cache) {
          cache[p] = `${path}${cache[p]}`.replace(/\/+$/, '')
        }
      })

      return
    }

    cache[propertyKey] = path
    AuthHandler.cache.set(className, cache)
  }

  public static readonly createDefaultJWTOptions = (secret: string): expressJWT.Options => ({
    secret,
    credentialsRequired: true,
    getToken: (req: Request): string | undefined => {
      if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
        return (req.headers.authorization as string).split(' ')[1]
      } else if (req.query && req.query.token) {
        return req.query.token
      }

      return undefined
    }
  })

  public static configure (app: Application, options: string | expressJWT.Options) {
    const ops = typeof options === 'string'
      ? AuthHandler.createDefaultJWTOptions(options)
      : options

    const unique = new Set<string>()

    AuthHandler.cache.forEach((cache: ICache) => {
      // tslint:disable-next-line forin
      for (const route in cache) {
        unique.add(cache[route])
      }
    })

    unique.forEach((route: string) => {
      app.use(route, expressJWT(ops))
    })
  }
}
