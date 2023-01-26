const supertest = require("supertest");
const app = require("../server.js");
const request = supertest(app);
const path = require("path");
const fs = require("fs");
const os = require("os");

describe("settings test suite", () => {
  test("tests get /settings endpoint", async () => {
    const response = await request.get("/api/v1/settings");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  test("tests post /settings endpoint", async () => {
    const payload = {
      email_dir: "qwerty",
      resume_dir: "qwertyresume",
      internship_period: "02/12/2023 - 10/12/2024",
    };
    const res = await request
      .post("/api/v1/settings")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);

    const userHomeDir = os.homedir();
    expect(
      fs.existsSync(
        path.join(userHomeDir, "qwerty", "02-12-2023 to 10-12-2024")
      )
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(userHomeDir, "qwertyresume", "02-12-2023 to 10-12-2024")
      )
    ).toBe(true);
  });

  test("tests post /settings endpoint no internship period", async () => {
    const payload = {
      email_dir: "qwerty",
      resume_dir: "02/12/2023 - 10/12/2024",
    };
    const res = await request
      .post("/api/v1/settings")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('["internship_period"]');
  });

  test("tests post /settings endpoint no resume dir", async () => {
    const payload = {
      email_dir: "qwerty",
      internship_period: "02/12/2023 - 10/12/2024",
    };
    const res = await request
      .post("/api/v1/settings")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('["resume_dir"]');
  });

  test("tests post /settings endpoint no email dir", async () => {
    const payload = {
      resume_dir: "qwerty",
      internship_period: "02/12/2023 - 10/12/2024",
    };
    const res = await request
      .post("/api/v1/settings")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('["email_dir"]');
  });

  test('tests post /settings endpoint missing "/" in period', async () => {
    const payload = {
      email_dir: "qwerty",
      resume_dir: "qwerty",
      internship_period: "02122023 - 10122024",
    };
    const res = await request
      .post("/api/v1/settings")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('["missing /"]');
  });

  test('tests post /settings endpoint missing "-" in period', async () => {
    const payload = {
      email_dir: "qwerty",
      resume_dir: "qwerty",
      internship_period: "02/12/2023 10/12/2024",
    };
    const res = await request
      .post("/api/v1/settings")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('["missing -"]');
  });
});
