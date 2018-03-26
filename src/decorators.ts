import { Path } from 'typescript-rest'
import { AuthHandler } from './AuthHandler'

/**
 * Add auth to a route
 *
 * @param target The prototype of the class
 * @param propertyKey The name of the method
 * @param descriptor The descriptor
 */
export function AuthPath (path: string) {
  // tslint:disable-next-line no-any
  return function (target: any, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {
    AuthHandler.addPath(path, target, propertyKey)

    Path(path)(target, propertyKey, descriptor)
  }
}
