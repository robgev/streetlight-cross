const inputs = [
  {
    name: 'Initial car Speed',
    min: 20,
    max: 80,
    fieldKey: 'v0',
  },
  {
    name: 'Initial distance from the intersection',
    min: 7,
    max: 50,
    fieldKey: 'd0',
  },
  {
    name: 'Width of intersection',
    min: 7,
    max: 50,
    fieldKey: 'L',
  },
  {
    name: 'Duration of yellow light ',
    min: 2,
    max: 4,
    fieldKey: 'Ty',
  },
  {
    name: 'Car’s ability to accelerate',
    min: 1,
    max: 3,
    fieldKey: 'aa',
  },
  {
    name: 'Car’s ability to decelerate',
    min: 1,
    max: 3,
    fieldKey: 'ad',
  },
]

export default inputs;
