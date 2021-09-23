const request = require("supertest");

const app = require("../src/app");

describe("tests public endpoints", () => {
  /**
   * test get all characters
   */
  it("expect json containing list of all movies", (done) => {
    request(app)
      .get("/api/movies")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  /**
   * test get all movies endpoint
   */
  it("expect json containing list of all characters", (done) => {
    request(app)
      .get("/api/characters")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

/**
 *
 */
describe("tests protected endpoints", () => {
  let token = null;
  let loginUser = {
    email: "admin@admin.com",
    password: "123456"
  };
  /**
   * login with user admin, received token
   */
  before((done) => {
    request(app)
      .post("/api/auth/login")
      .send(loginUser)
      .end(function (err, res) {
        token = res.body.token;
        done();
      });
  });
  /**
   * test get all users endpoint
   */
  it("test get all users, require token", (done) => {
    request(app)
      .get("/api/users")
      .set("x-access-token", token)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  /**
   * test create user endpoint
   */
  it("create user, require token and admin role", (done) => {
    let newUser = {
      email: "jamon1@pio.com",
      password: "123456",
      nickname: "theKiller",
      role: "user"
    };

    request(app)
      .post("/api/users")
      .set("x-access-token", token)
      .send(newUser)
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
