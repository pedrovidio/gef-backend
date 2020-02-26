module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gef',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
