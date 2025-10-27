"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { parseUtcTimestamp } from "@/lib/dateTimeUtils";

interface GrowthChartProps {
  data?: Array<{ createdAt: string }>;
  color?: string;
  title: string;
}

export function GrowthChart({ data, color = "#3b82f6", title }: GrowthChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Group data by date
    const dailyCounts = new Map<string, number>();

    data.forEach(item => {
      const date = parseUtcTimestamp(item.createdAt).toFormat("yyyy-MM-dd");
      dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
    });

    // Convert to chart format and sort by date
    const chartPoints = Array.from(dailyCounts.entries())
      .map(([date, count]) => ({
        x: date,
        y: count,
      }))
      .sort((a, b) => a.x.localeCompare(b.x));

    return [
      {
        id: title.toLowerCase(),
        data: chartPoints,
      },
    ];
  }, [data]);

  if (data === undefined) {
    return <div className="h-48 sm:h-64 flex items-center justify-center text-neutral-400 text-sm">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-48 sm:h-64 flex items-center justify-center text-neutral-400 text-sm">No data available</div>
    );
  }

  return (
    <div className="h-48 sm:h-64">
      <ResponsiveLine
        data={chartData}
        margin={{
          top: 10,
          right: 10,
          bottom: 40,
          left: 25,
        }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: false,
        }}
        enableSlices="x"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%m/%d",
          tickValues: "every 14 days",
          tickRotation: -45,
          tickSize: 5,
          tickPadding: 5,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        colors={[color]}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableGridX={false}
        enableGridY={true}
        gridYValues={5}
        theme={{
          background: "transparent",
          text: {
            fontSize: 11,
            fill: "#a3a3a3",
          },
          axis: {
            domain: {
              line: {
                stroke: "#525252",
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 11,
                fill: "#a3a3a3",
              },
            },
            ticks: {
              line: {
                stroke: "#525252",
                strokeWidth: 1,
              },
              text: {
                fontSize: 10,
                fill: "#a3a3a3",
              },
            },
          },
          grid: {
            line: {
              stroke: "#404040",
              strokeWidth: 1,
            },
          },
          crosshair: {
            line: {
              stroke: "#ffffff",
              strokeWidth: 1,
              strokeOpacity: 0.35,
            },
          },
          tooltip: {
            container: {
              background: "#262626",
              color: "#ffffff",
              fontSize: "11px",
              borderRadius: "4px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #404040",
              padding: "6px 8px",
            },
          },
        }}
        tooltip={({ point }) => (
          <div className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-xs sm:text-sm">
            <div className="font-medium text-white">{point.data.xFormatted}</div>
            <div className="text-neutral-300">
              {point.data.y} new {title.toLowerCase()}
            </div>
          </div>
        )}
      />
    </div>
  );
}
