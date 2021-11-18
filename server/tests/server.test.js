const { app, client } = require("./testServer")
const request = require("supertest")

afterAll((done) => {
  client.end(done)
})

describe('Tests for rps-metric endpoint', function() {
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
})

describe("Tests for rps-error endpoint", function() {
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
})

describe("Tests for latency endpoint", function () {
  test("valid latency request responds with 200", async () => {
    const res = await request(app).get('/latency?timeframe=4=hours');
    expect(200)
    expect(res.body[0].id).toEqual("500 ms")
    expect(res.body.length).toEqual(3)
    expect(res.header['content-type']).toBe("application/json; charset=utf-8")
  })

  test("Req to latency with no timeframe returns a 404", async() => {
    const res = await request(app).get('/latency/');
      expect(404)
      expect(res.text).toEqual("You must provide a given timeframe")
  })
})

describe("Testing for error handling 404/500", function() {
  test("testing 404 response for incorrect endpoint", async() => {
    const res = await request(app).get('/thisisanerror');
      expect(404)
      expect(res.body.error).toEqual("Could not find this route.")
  })
})
