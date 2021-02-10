import { HttpException, badRequest, notFound } from "../../src/util/errors"

describe("Error helpers", () => {
  it("should create an HttpException", () => {
    const error = new HttpException(404, "Message")
    expect(error.message).toEqual("Message")
  })

  it("should create an HttpException with a message containing data", () => {
    const error = new HttpException(404, "Message", "data")
    expect(error.message).toEqual("Message\ndata")
  })

  it("should not add undefined data", () => {
    const error = new HttpException(404, "Message", undefined)
    expect(error.message).toEqual("Message")
  })

  it("should create a bad request error", () => {
    expect(badRequest("foo").message).toContain("foo")
  })

  it("should create a not found error", () => {
    expect(notFound("foo").message).toContain("foo")
  })

  it("should handle no data", () => {
    expect(badRequest().message).toEqual("Bad Request")
    expect(badRequest(undefined).message).toEqual("Bad Request")

    expect(notFound().message).toEqual("Not Found")
    expect(notFound(undefined).message).toEqual("Not Found")

    expect(new HttpException(1, "foo", undefined).message).toEqual("foo")
    expect(new HttpException(1, "foo").message).toEqual("foo")
  })
})
