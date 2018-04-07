import * as express from 'express'
import { GET, POST, Path, PathParam } from 'typescript-rest'

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

  @AuthPath('/:name')
  @POST
  public postHelloTo (@PathParam('name') name: string): string {
    return `Said hello to ${name}!`
  }
}

describe('decorators', () => {
  it('Should build paths', () => {
    const AppMock = jest.fn<express.Application>(() => ({
      use: jest.fn()
    }))

    const app = new AppMock()

    AuthHandler.configure(app, 'rofl')

    expect(app.use).toHaveBeenCalledTimes(4)
    expect(app.use).toHaveBeenCalledWith('/', expect.any(Function))
    expect(app.use).toHaveBeenCalledWith('/:name', expect.any(Function))
    expect(app.use).toHaveBeenCalledWith('/hello', expect.any(Function))
    expect(app.use).toHaveBeenCalledWith('/hello/:name', expect.any(Function))
  })
})
