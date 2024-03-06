db.createUser({
  user: 'mock-api',
  pwd: 'M0ck4P1',
  roles: [
    {
      role: 'readWrite',
      db: 'mock-api',
    },
  ],
});
