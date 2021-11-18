const { app, client } = require("./testServer")
const request = require("supertest")

afterAll((done) => {
  client.end(done)
})

test("valid timeframe responds 200 for rps", async () => {
  const res = await request(app).get('/rps-metric?timeframe=15-minutes');
    expect(200)
    expect(res.body[0].id).toEqual("Requests Per Second")
    expect(res.header['content-type']).toBe("application/json; charset=utf-8")
})

test("Req to rps_metric with no timeframe returns a 404", async() => {
  const res = await request(app).get('/rps-metric/');
    expect(404)
    expect(res.text).toEqual("You must provide a given timeframe")
})

test("valid timeframe responds 200 for eps", async () => {
  const res = await request(app).get('/rps-error?timeframe=1-hour');
    expect(200)
    expect(res.body[0].id).toEqual("Errors Per Second")
    expect(res.header['content-type']).toBe("application/json; charset=utf-8")
})

test("Req to rps_error with no timeframe returns a 404", async() => {
  const res = await request(app).get('/rps-error/');
    expect(404)
    expect(res.text).toEqual("You must provide a given timeframe")
})