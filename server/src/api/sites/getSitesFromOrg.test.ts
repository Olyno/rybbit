import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../db/clickhouse/clickhouse.js", () => ({
  clickhouse: { query: vi.fn() },
}));
vi.mock("../../db/postgres/postgres.js", () => ({
  db: {},
}));
vi.mock("../../lib/auth-utils.js", () => ({
  getOrganizationSitesForCaller: vi.fn(),
}));
vi.mock("../../lib/logger/logger.js", () => ({
  createServiceLogger: () => ({
    warn: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  }),
}));

import { clickhouse } from "../../db/clickhouse/clickhouse.js";
import { getSessionCountMap } from "./getSitesFromOrg.js";

const queryMock = vi.mocked(clickhouse.query);

function resultSet(rows: unknown[]) {
  return { json: async () => rows } as never;
}

describe("getSessionCountMap", () => {
  beforeEach(() => {
    queryMock.mockReset();
  });

  it("skips ClickHouse when there are no sites", async () => {
    const map = await getSessionCountMap([]);

    expect(map.size).toBe(0);
    expect(queryMock).not.toHaveBeenCalled();
  });

  it("maps site_id to total_sessions", async () => {
    queryMock.mockResolvedValue(
      resultSet([
        { site_id: 1, total_sessions: 7 },
        { site_id: 2, total_sessions: 0 },
      ])
    );

    const map = await getSessionCountMap([1, 2]);

    expect(map.get(1)).toBe(7);
    expect(map.get(2)).toBe(0);
  });

  it("ignores rows that are not numeric site/count pairs", async () => {
    queryMock.mockResolvedValue(
      resultSet([{ site_id: null, total_sessions: "abc" }, { site_id: 2, total_sessions: 3 }, null])
    );

    const map = await getSessionCountMap([1, 2]);

    expect(map.size).toBe(1);
    expect(map.get(2)).toBe(3);
  });

  it("returns an empty map instead of throwing when events does not exist", async () => {
    queryMock.mockRejectedValue(
      Object.assign(new Error("Unknown table expression identifier 'events'"), { code: 60 })
    );

    await expect(getSessionCountMap([1])).resolves.toEqual(new Map());
  });
});
