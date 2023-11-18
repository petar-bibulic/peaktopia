import { ChartDataPoint, PointIndex } from '@components/data/DataTypes';
import { Point, NamedPoints, PointName } from '@components/data/DataTypes';
import { CHART_COLORS } from '@utils/constants';

export const toTitle = (title: string): string => {
  return title.charAt(0).toUpperCase() + title.slice(1);
};

export const getPeakColor = (peaks: ChartDataPoint[], width: number): Array<string> => {
  return peaks.map((item, index, list) => {
    return item.position - list[index - 1]?.position < 2 * width ||
      list[index + 1]?.position - item.position < 2 * width
      ? 'yellow'
      : 'green';
  });
};

export const getChartColor = (index: number) => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

export const taxicabDist = (a: Point, b: Point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export const getClosestPoint = (position: Point, points: NamedPoints): PointName | null => {
  let closest: PointName | null = null;
  for (const entry in points) {
    const entryPoint = points[entry];
    const dist = taxicabDist(position, entryPoint);
    if (closest?.point) {
      if (dist < taxicabDist(position, closest.point)) {
        closest = { name: entry, point: points[entry] };
      }
    } else {
      closest = { name: entry, point: points[entry] };
    }
  }

  return closest;
};

// calculate index of a closest peak to a click event
export const getNearestPeak = (position: Point, peaks: Point[]): PointIndex | null => {
  let closest: PointIndex | null = null;
  for (let i = 0; i < peaks.length; i++) {
    const point = peaks[i];
    const dist = taxicabDist(position, point);
    if (closest?.point) {
      if (dist < taxicabDist(position, closest.point)) {
        closest = { index: i, point: peaks[i] };
      }
    } else {
      closest = { index: i, point: peaks[i] };
    }
  }

  return closest;
};
