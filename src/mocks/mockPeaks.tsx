function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPeak() {
  return { position: getRandomNumber(5, 40), intensity: getRandomNumber(0, 1e4) };
}

export const mockData = {
  foo: Array.from({ length: 5 }, getRandomPeak),
  bar: Array.from({ length: 5 }, getRandomPeak),
  baz: Array.from({ length: 5 }, getRandomPeak),
};

mockData['foo'].push({ position: 5, intensity: 9000 });

export const mockCharts = Array.from(['foo', 'bar', 'baz'], (entry) => {
  return {
    name: entry,
    url: 'fakeUrl',
    userId: 'fakeUserId',
    id: 'fakeId',
  };
});
