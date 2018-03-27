import { Application } from 'express'
import { GET, PathParam } from 'typescript-rest'

import { AuthHandler, AuthPath } from '../'

export class RootController {
  @AuthPath('/')
  @GET
  public sayHello (): string {
    return 'Hello, World!'
  }

  @AuthPath('/:name')
  @GET
  public sayHelloTo (@PathParam('name') name: string): string {
    return `Hello ${name}!`
  }
}

@AuthPath('/hello')
export class MockController {

  @AuthPath('/')
  @GET
  public sayHello (): string {
    return 'Hello, World!'
  }

  @AuthPath('/:name')
  @GET
  public sayHelloTo (@PathParam('name') name: string): string {
    return `Hello ${name}!`
  }
}

describe('AuthHandler', () => {
  it('Should build paths', () => {
    const AppMock = jest.fn<Application>(() => ({
      use: jest.fn()
    }))

    const app = new AppMock()

    AuthHandler.configure(app, 'rofl')

    expect(app.use).toHaveBeenCalledTimes(4)
    expect(app.use).toHaveBeenCalledWith('/', expect.any(Function))
    expect(app.use).toHaveBeenCalledWith('/:name', expect.any(Function))
    expect(app.use).toHaveBeenCalledWith('/hello/', expect.any(Function))
    expect(app.use).toHaveBeenCalledWith('/hello/:name', expect.any(Function))
  })
})
