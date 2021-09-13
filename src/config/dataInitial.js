const bcrypt = require("bcryptjs");
const db = require("./db");

const User = require("../api/users/user.model");
const Genre = require("../api/genres/genre.model");
const Movie = require("../api/movies/movie.model");
const Role = require("../api/roles/role.model");
const Character = require("../api/characters/character.model");

async function initialData() {
  await db.sync();
  const users = await User.count();

  if (users > 0) {
    return;
  }

  //create default movies
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

  //create default characters
  await Promise.all([
    Character.create({
      name: "iron man",
      imagen: "http://sdadsadasd",
      age: "50",
      history: "dasdsadsadsadsad",
      weight: 78
    }),
    Character.create({
      name: "spider man",
      imagen: "http://sdadsadasd",
      age: "30",
      history: "dasdsadsadsadsad",
      weight: 60
    }),
    Character.create({
      name: "ant man",
      imagen: "http://sdadsadasd",
      age: "40",
      history: "dasdsadsadsadsad",
      weight: 80
    })
  ]);

  //create default genres
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
  
  //create user
  const passwordHash = bcrypt.hashSync("123456", 8);

  User.create({
    email: "admin@admin.com",
    nickname: "admin",
    password: passwordHash
  });

  //create default roles
  await Promise.all([
    Role.create({ name: "admin" }),
    Role.create({ name: "user" })
  ]);
}

module.exports = { initialData };
