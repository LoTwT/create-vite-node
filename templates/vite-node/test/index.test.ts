import { describe, it, expect } from "vitest"

describe("default test", () => {
  const add = (a: number, b: number) => a + b

  it("1 + 1 = 2", () => {
    expect(add(1, 1)).toBe(2)
  })
})
