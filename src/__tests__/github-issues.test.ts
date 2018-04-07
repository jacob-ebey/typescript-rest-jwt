import * as express from 'express'
import { GET, POST, Path, PathParam } from 'typescript-rest'

import { AuthHandler, AuthPath } from '../'

export class RootController {
  @AuthPath('/:name')
  @GET
  public sayHelloTo (@PathParam('name') name: string): string {
    return `Hello ${name}!`
  }

  @AuthPath('/:name')
  @POST
  public postHelloTo (@PathParam('name') name: string): string {
    return `Hello ${name}!`
  }
}

describe('github issue resolutions', () => {
  it('#2', () => {
    const AppMock = jest.fn<express.Application>(() => ({
      use: jest.fn()
    }))

    const app = new AppMock()

    AuthHandler.configure(app, 'rofl')

    expect(app.use).toHaveBeenCalledTimes(1)
    expect(app.use).toHaveBeenCalledWith('/:name', expect.any(Function))
  })
})