import { ChartDataPoint } from '@components/data/DataTypes';
import { Point, Points, PointName } from '@components/data/DataTypes';
import { CHART_COLORS } from '@utils/constants';

const toTitle = (title: string): string => {
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const getPeakColor = (peaks: ChartDataPoint[], width: number): Array<string> => {
  return peaks.map((item, index, list) => {
    return item.position - list[index - 1]?.position < 2 * width ||
      list[index + 1]?.position - item.position < 2 * width
      ? 'yellow'
      : 'green';
  });
};

const getChartColor = (index: number) => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

const taxicabDist = (a: Point, b: Point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const getClosestPoint = (position: Point, points: Points): PointName | null => {
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

export { toTitle, getPeakColor, getChartColor, taxicabDist, getClosestPoint };
