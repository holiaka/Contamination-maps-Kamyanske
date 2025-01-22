export const attributeSchema = {
  gamma: {
    title: 'Ambien dose equivalent rate in air, μSv/h',
    list: [
      {
        no: 1,
        color: '#006420',
        value: '<=0.24',
        lowerLevel: 0.0,
        upperLevel: 0.24,
      },
      {
        no: 2,
        color: '#b1bd40',
        value: '0.24-0.56',
        lowerLevel: 0.24,
        upperLevel: 0.56,
      },
      {
        no: 3,
        color: '#fdec00',
        value: '0.56-1.28',
        lowerLevel: 0.56,
        upperLevel: 1.28,
      },
      {
        no: 4,
        color: '#ff0415',
        value: '1.28-5.12',
        lowerLevel: 1.28,
        upperLevel: 5.12,
      },
      {
        no: 5,
        color: '#8f384c',
        value: '5.12-13.8',
        lowerLevel: 5.12,
        upperLevel: 13.8,
      },
      {
        no: 6,
        color: '#800085',
        value: '13.8-138',
        lowerLevel: 13.8,
        upperLevel: 138,
      },
      {
        no: 7,
        color: '#45024b',
        value: '>138',
        lowerLevel: 138,
        upperLevel: 10000,
      },
    ],
  },

  beta: {
    title: 'Beta-particles flex, pcs/sq.m/min',
    list: [
      { no: 1, color: '#006420', value: '<=200' },
      { no: 2, color: '#b1bd40', value: '200-800' },
      { no: 3, color: '#fdec00', value: '800-2000' },
      { no: 4, color: '#ff0415', value: '2000-8000' },
      { no: 5, color: '#8f384c', value: '8000-10000' },
      { no: 6, color: '#45024b', value: '>10000' },
    ],
  },
};
