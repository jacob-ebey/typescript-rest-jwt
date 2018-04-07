import * as typescriptRestJWT from 'typescript-rest-jwt'

describe('deployed-package', () => {
  it('Should have AuthHandler', () => {
    expect(typescriptRestJWT.AuthHandler).toBeTruthy()
  })

  it('Should have AuthPath', () => {
    expect(typescriptRestJWT.AuthPath).toBeTruthy()
  })
})
