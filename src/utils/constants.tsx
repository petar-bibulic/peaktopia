import { IconType } from 'react-icons';
import { HiTableCells } from 'react-icons/hi2';
import { BiBarChart, BiInfoSquare, BiBook, BiImage } from 'react-icons/bi';

const ICON_SIZE = 'text-2xl';

export const OFFSET = 0.05;
export const SEARCH_MAX_WIDTH = 0.1;
export const XDOMAIN_RANGE = [0, 1000];
export const YDOMAIN_RANGE = [0, 1000];
export const CHART_COLORS = ['#38bdf8', '#818CF8', '#F471B5', '#2DD4BF', '#F4BF50', '#FB7085'];
export const SLOW_SHIFT = 1;
export const FAST_SHIFT = 10;
export const SELECT_RANGE_CUTOFF = 50;
export const ANIMATION_DURATION = 1500;
export const NAV_LINKS: { name: string; url: string; image?: React.ReactElement }[] = [
  { name: 'Use', url: '', image: <BiBook className={ICON_SIZE} /> },
  { name: 'Tables', url: '', image: <HiTableCells className={ICON_SIZE} /> },
  { name: 'Charts', url: '/data/charts', image: <BiBarChart className={ICON_SIZE} /> },
  { name: 'Images', url: '/data/image', image: <BiImage className={ICON_SIZE} /> },
  { name: 'About', url: '', image: <BiInfoSquare className={ICON_SIZE} /> },
];
