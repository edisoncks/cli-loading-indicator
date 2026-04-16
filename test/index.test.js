import { describe, it, expect } from "vitest";
import LoadingIndicator from "../index.js";

describe("LoadingIndicator", () => {
  it("should have correct default patterns for large size", () => {
    const loader = new LoadingIndicator({ size: "large" });
    expect(loader.patterns).toHaveLength(8);
    expect(loader.size).toBe("large");
  });

  it("should have correct default patterns for small size", () => {
    const loader = new LoadingIndicator({ size: "small" });
    expect(loader.patterns).toHaveLength(6);
    expect(loader.size).toBe("small");
  });

  it("should default to large size", () => {
    const loader = new LoadingIndicator();
    expect(loader.size).toBe("large");
  });

  it("should reverse patterns when rotation is cw", () => {
    const loaderNormal = new LoadingIndicator({
      size: "large",
      rotation: "ccw",
    });
    const loaderCw = new LoadingIndicator({ size: "large", rotation: "cw" });
    expect(loaderCw.patterns[0]).toBe(
      loaderNormal.patterns[loaderNormal.patterns.length - 1],
    );
  });

  it("should use custom format function if provided", () => {
    const format = (pattern) => `loading: ${pattern}`;
    const loader = new LoadingIndicator({ format });
    expect(loader.format("test")).toBe("loading: test");
  });

  it("should default interval to 70ms", () => {
    const loader = new LoadingIndicator();
    expect(loader.interval).toBe(70);
  });

  it("should use custom interval if provided", () => {
    const loader = new LoadingIndicator({ interval: 100 });
    expect(loader.interval).toBe(100);
  });
});
