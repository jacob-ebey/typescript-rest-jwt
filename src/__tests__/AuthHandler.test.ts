import { Application, Request } from 'express'
import { AuthHandler, AuthPath } from '../'
import * as expressJWT from 'express-jwt'

jest.mock('express-jwt', () => jest.fn())

export class RootController {
  @AuthPath('/')
  public sayHello (): void {
    // rofl to stop tslint yelling at empty blocks
  }
}

describe('AuthHandler', () => {
  const token = 'RoflToken'

  it('Should parse token from headers', () => {
    
    const RequestMock = jest.fn<Request>(() => ({
      headers: {
        authorization: `Bearer ${token}`
      }
    }))
    
    const ops = AuthHandler.createDefaultJWTOptions('rofl')
    const parsed: string = ops.getToken!(new RequestMock())

    expect(parsed).toEqual(token)
  })

  it('Should parse null from headers', () => {
    const RequestMock = jest.fn<Request>(() => ({
      headers: {}
    }))
    
    const ops = AuthHandler.createDefaultJWTOptions('rofl')
    const parsed: string = ops.getToken!(new RequestMock())

    expect(parsed).toBeUndefined()
  })

  it('Should not blowup for `Bearer`', () => {
    const RequestMock = jest.fn<Request>(() => ({
      headers: {
        authorization: 'Bearer'
      }
    }))
    
    const ops = AuthHandler.createDefaultJWTOptions('rofl')
    const parsed: string = ops.getToken!(new RequestMock())

    expect(parsed).toBeUndefined()
  })

  it('Should not blowup for empty token', () => {
    const RequestMock = jest.fn<Request>(() => ({
      headers: {
        authorization: 'Bearer '
      }
    }))
    
    const ops = AuthHandler.createDefaultJWTOptions('rofl')
    const parsed: string = ops.getToken!(new RequestMock())

    expect(parsed).toEqual('')
  })

  it('Should parse query if no header', () => {
    const RequestMock = jest.fn<Request>(() => ({
      headers: {},
      query: {
        token
      }
    }))
    
    const ops = AuthHandler.createDefaultJWTOptions('rofl')
    const parsed: string = ops.getToken!(new RequestMock())

    expect(parsed).toEqual(token)
  })

  it('Should not blow up if no query', () => {
    const RequestMock = jest.fn<Request>(() => ({
      headers: {},
    }))
    
    const ops = AuthHandler.createDefaultJWTOptions('rofl')
    const parsed: string = ops.getToken!(new RequestMock())

    expect(parsed).toBeUndefined()
  })

  it('Should not blow up if no token in query', () => {
    const RequestMock = jest.fn<Request>(() => ({
      headers: {},
      query: {}
    }))
    
    const ops = AuthHandler.createDefaultJWTOptions('rofl')
    const parsed: string = ops.getToken!(new RequestMock())

    expect(parsed).toBeUndefined()
  })

  it('Should use default options when string', () => {
    const AppMock = jest.fn<Application>(() => ({
      use: jest.fn()
    }))

    const app = new AppMock()

    AuthHandler.configure(app, 'rofl')

    expect(expressJWT).toHaveBeenCalledWith(expect.any(Object))
  })

  it('Should use provided options when object', () => {
    const AppMock = jest.fn<Application>(() => ({
      use: jest.fn()
    }))

    const app = new AppMock()

    const ops = {
      secret: 'rofl'
    }

    AuthHandler.configure(app, ops)

    expect(expressJWT).toHaveBeenCalledWith(ops)
  })
})