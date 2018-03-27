TypeScript Rest JWT
===

[![CircleCI](https://circleci.com/gh/jacob-ebey/typescript-rest-jwt.svg?style=svg)](https://circleci.com/gh/jacob-ebey/typescript-rest-jwt)

JWT authentication for typescript-rest via decorators.


Precursor
---

To get started with typescript-rest-jwt, visit [typescript-rest](https://github.com/thiagobustamante/typescript-rest)
for a detailed getting started guide of the underlying library.


Usage
---

Install:

```
npm install -s typescript-rest-jwt
```

Update an existing controller:

```typescript
import { GET, Path, PathParam } from 'typescript-rest'

@Path('/hello')
export class HelloController {

  @Path('/')
  @GET
  public sayHello(): string {
    return 'Hello, World!'
  }

  @Path('/:name')
  @GET
  public sayHelloTo (@PathParam('name') name: string): string {
    return `Hello ${name}!`
  }
}
```

```typescript
import { Context, GET, Path } from 'typescript-rest'
import { AuthPath } from 'typescript-rest-jwt'

// You must update the class level Path to also be an AuthPath, even
// if you still have unsecured routes.
@AuthPath('/hello')
export class HelloController {
  // Inject the service context to get access to the user info
  @Context
  public context: ServiceContext

  // Still unsecured
  @Path('/')
  @GET
  public sayHello(): string {
    return 'Hello, World!'
  }

  @AuthPath('/secured')
  @GET
  public sayHelloTo (): string {
    return `Hello ${this.context.request.user.name}!`
  }
}
```

Before your call to typescript-rest's Server.buildServices, we need to configure
our AuthHandler:

```typescript
import { AuthHandler } from 'typescript-rest-jwt'

...

AuthHandler.configure(app, jwtConfig)
Server.buildServices(app, ...controllers)
```

AuthHandler.configure either accepts ```string``` secret or ```expressJWT.Options```.


License
---

MIT
