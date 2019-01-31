// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/quantified_self',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres:/postgres://yxovmbfskfuvso:1a71ca6f93c0f3eb8bd886fb10db0866f4c3bc3202f9cf013bac2baa09912c68@ec2-174-129-224-157.compute-1.amazonaws.com:5432/d73oimguek2kqf',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    ssl: true
  }
};
