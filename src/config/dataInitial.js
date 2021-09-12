const bcrypt = require("bcryptjs");
const db = require("./db");

const User = require("../api/users/user.model");
const Genre = require("../api/genres/genre.model");
const Movie = require("../api/movies/movie.model");

async function initialData() {
  await db.sync();
  const users = await User.count();

  if (users > 0) {
    return;
  }
  await Promise.all([
    Movie.create({
      title: "avengers",
      rank: "4",
      description: "a history ...."
    }),
    Movie.create({
      title: "avengers: endgame",
      rank: "2",
      description: "a history ...."
    }),
    Movie.create({
      title: "iron man",
      rank: "5",
      description: "a history ...."
    }),
    Movie.create({
      title: "spider man",
      rank: "1",
      description: "a history ...."
    }),
    Movie.create({
      title: "guardians of the galaxy",
      rank: "4",
      description: "a history ...."
    })
  ]);

  await Promise.all([
    Genre.create({ name: "terror" }),
    Genre.create({ name: "fantasy" }),
    Genre.create({ name: "comedy" }),
    Genre.create({ name: "scify" }),
    Genre.create({ name: "suspense" }),
    Genre.create({ name: "drama" }),
    Genre.create({ name: "romance" }),
    Genre.create({ name: "action" })
  ]);
  const passwordHash = bcrypt.hashSync("123456", 8);

  User.create({
    email: "admin@admin.com",
    nickname: "admin",
    password: passwordHash
  });
}

module.exports = { initialData };
