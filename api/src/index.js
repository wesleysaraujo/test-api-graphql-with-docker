import startServer from './start-server.js'
import typeDefs from './graphql/type-defs.js'
import resolvers from './graphql/resolvers.js'

// Apollo Server
startServer({typeDefs, resolvers})