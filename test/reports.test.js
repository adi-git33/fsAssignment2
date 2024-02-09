const request = require('supertest');
const app = require('../app/app');
const reportsRepository = require('../repository/reports.repository');
const { ServerError } = require('../errors/errors');

jest.mock('../repository/reports.repository');

// Get all reports test
describe('GET /reports', () => {
  beforeEach(() => jest.clearAllMocks());

  // Success 200
  it('should return all reports', async () => {
    const mockReports = [
      {
        _id: '5f882587d4d1c02da0f64c8b',
        user_id: 1,
        damage_type: 'property',
        damage_cause: 'missile',
        location: {
          city: 'Ashkelon',
          street: 'x',
          building_number: 10,
        },
        damage_desc: 'windows were broken due to missile parts',
      },
      {
        _id: '65c0c795c54499e0ac89cc19',
        user_id: 5,
        damage_type: 'property',
        damage_cause: 'fire',
        location: {
          city: 'Beeri',
          street: 'b',
          building_number: 5,
        },
        damage_desc: 'house was set on fire',
      },
    ];
    reportsRepository.findReports.mockResolvedValue(mockReports);

    const res = await request(app).get('/reports');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockReports);
  });

  // Failure 404
  it('should return 404 when no reports are found', async () => {
    const mockReports = [];
    reportsRepository.findReports.mockResolvedValue(mockReports);

    const res = await request(app).get('/reports');
    expect(res.statusCode).toEqual(404);
  });

  // Failure 500
  it('should return 500 when an error occurs', async () => {
    reportsRepository.findReports.mockRejectedValue(new ServerError('internal server error'));

    const res = await request(app).get('/reports');
    expect(res.statusCode).toEqual(500);
  });
});

// Get report by id
describe('GET /reports/:reportId', () => {
  beforeEach(() => jest.clearAllMocks());

  // Success 200
  it('should return report with specific id', async () => {
    const mockReports = [
      {
        _id: '65c0c795c54499e0ac89cc18',
        user_id: 1,
        damage_type: 'property',
        damage_cause: 'missile',
        location: {
          city: 'Ashkelon',
          street: 'x',
          building_number: 10,
        },
        damage_desc: 'windows were broken due to missile parts',
      },
      {
        _id: '65c0c795c54499e0ac89cc1b',
        user_id: 5,
        damage_type: 'property',
        damage_cause: 'fire',
        location: {
          city: 'Beeri',
          street: 'b',
          building_number: 5,
        },
        damage_desc: 'house was set on fire',
      },
    ];

    reportsRepository.retrieveReport.mockResolvedValue(mockReports[0]);

    const res = await request(app).get('/reports/65c0c795c54499e0ac89cc18');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockReports[0]);
  });

  // Failure 404
  it('should return 404 if id wasnt found', async () => {
    const mockReports = [
      {
        _id: '65c0c795c54499e0ac89cc18',
        user_id: 1,
        damage_type: 'property',
        damage_cause: 'missile',
        location: {
          city: 'Ashkelon',
          street: 'x',
          building_number: 10,
        },
        damage_desc: 'windows were broken due to missile parts',
      },
      {
        _id: '65c0c795c54499e0ac89cc1b',
        user_id: 5,
        damage_type: 'property',
        damage_cause: 'fire',
        location: {
          city: 'Beeri',
          street: 'b',
          building_number: 5,
        },
        damage_desc: 'house was set on fire',
      },
    ];
    reportsRepository.retrieveReport.mockResolvedValue(mockReports[14]);

    const res = await request(app).get('/reports/5f882587d4d1c02da0f64c8b');
    expect(res.statusCode).toEqual(404);
  });

  // Failure 400
  it('should return 400 if id isnt by the format', async () => {
    const mockReports = [];
    reportsRepository.retrieveReport.mockResolvedValue(mockReports);

    const res = await request(app).get('/reports/123');
    expect(res.statusCode).toEqual(400);
  });

  // Failure 500
  it('should return 500 when an error occurs', async () => {
    reportsRepository.retrieveReport.mockRejectedValue(new ServerError('internal server error'));

    const res = await request(app).get('/reports/5f882587d4d1c02da0f64c8b');
    expect(res.statusCode).toEqual(500);
  });
});

// Create new report
describe('POST /reports', () => {
  beforeEach(() => jest.clearAllMocks());

  // Success 200
  it('should return 200', async () => {
    const mockReports = {
      user_id: 6,
      damage_type: 'car',
      damage_cause: 'damage',
      location: {
        city: 'Cfar Gaza',
        street: 'P',
        building_number: 1,
      },
      damage_desc: 'car was set on fire',
    };
    reportsRepository.createReport.mockResolvedValue(mockReports);

    const res = await request(app).post('/reports').send(mockReports);
    expect(res.statusCode).toEqual(200);
  });

  // Failure 400
  it('missing argument - should return 400', async () => {
    const mockReports = {
      user_id: 6,
      damage_type: 'car',
      damage_cause: '',
      location: {
        city: '',
        street: 'P',
        building_number: 1,
      },
      damage_desc: 'car was set on fire',
    };
    reportsRepository.createReport.mockResolvedValue(mockReports);

    const res = await request(app).post('/reports').send(mockReports);
    expect(res.statusCode).toEqual(400);
  });

  // Failure 400
  it('empty request body - should return 400', async () => {
    const mockReports = { };
    reportsRepository.createReport.mockResolvedValue(mockReports);

    const res = await request(app).post('/reports').send(mockReports);
    expect(res.statusCode).toEqual(400);
  });
});

// Delete exiting report
describe('DELETE /reports/:reportId', () => {
  beforeEach(() => jest.clearAllMocks());

  // Success 200
  it('should return deleted report with specific id', async () => {
    const mockReports = [
      {
        _id: '65c0c795c54499e0ac89cc18',
        user_id: 1,
        damage_type: 'property',
        damage_cause: 'missile',
        location: {
          city: 'Ashkelon',
          street: 'x',
          building_number: 10,
        },
        damage_desc: 'windows were broken due to missile parts',
      },
      {
        _id: '65c0c795c54499e0ac89cc1b',
        user_id: 5,
        damage_type: 'property',
        damage_cause: 'fire',
        location: {
          city: 'Beeri',
          street: 'b',
          building_number: 5,
        },
        damage_desc: 'house was set on fire',
      },
    ];

    reportsRepository.deleteReport.mockResolvedValue(mockReports);

    const res = await request(app).delete('/reports/65c0c795c54499e0ac89cc18');
    expect(res.statusCode).toEqual(200);
  });

  // Failure 404
  it('should return 404 if id wasnt found', async () => {
    reportsRepository.deleteReport.mockResolvedValue(null);

    const res = await request(app).delete('/reports/5f882587d4d1c02da0f64c8b');
    expect(res.statusCode).toEqual(404);
  });

  // Failure 400
  it('should return 400 if id isnt by the format', async () => {
    const mockReports = [];
    reportsRepository.deleteReport.mockResolvedValue(mockReports);

    const res = await request(app).delete('/reports/1523');
    expect(res.statusCode).toEqual(400);
  });

  // Failure 500
  it('should return 500 when an error occurs', async () => {
    reportsRepository.deleteReport.mockRejectedValue(new ServerError('internal server error'));

    const res = await request(app).delete('/reports/5f882587d4d1c02da0f64c8b');
    expect(res.statusCode).toEqual(500);
  });
});

// Update exiting report
describe('PUT /reports/:reportId', () => {
  beforeEach(() => jest.clearAllMocks());

  // Success 200
  it('should return updated report with specific id', async () => {
    const mockReports = {
      _id: '65c0c795c54499e0ac89cc18',
      user_id: 1,
      damage_type: 'property',
      damage_cause: 'missile',
      location: {
        city: 'Ashkelon',
        street: 'x',
        building_number: 10,
      },
      damage_desc: 'windows were broken due to missile parts',
    };

    reportsRepository.updateReport.mockResolvedValue(mockReports);

    const res = await request(app).put('/reports/65c0c795c54499e0ac89cc18').send(mockReports);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockReports);
  });

  // Failure 404
  it('should return 404 if id wasnt found', async () => {
    const mockReports = {
      _id: '65c0c795c54499e0ac89cc18',
      user_id: 1,
      damage_type: 'property',
      damage_cause: 'missile',
      location: {
        city: 'Ashkelon',
        street: 'x',
        building_number: 10,
      },
      damage_desc: 'windows were broken due to missile parts',
    };

    reportsRepository.updateReport.mockResolvedValue(null);

    const res = await request(app).put('/reports/5f882587d4d1c02da0f64c8b').send(mockReports);
    expect(res.statusCode).toEqual(404);
  });

  // Failure 400
  it('should return 400 if id isnt by the format', async () => {
    const mockReports = [];
    reportsRepository.updateReport.mockResolvedValue(mockReports);

    const res = await request(app).put('/reports/1523').send(mockReports);
    expect(res.statusCode).toEqual(400);
  });

  // Failure 400
  it('empty request body - should return 400', async () => {
    const mockReports = { };
    reportsRepository.updateReport.mockResolvedValue(mockReports);

    const res = await request(app).put('/reports/5f882587d4d1c02da0f64c8b').send(mockReports);
    expect(res.statusCode).toEqual(400);
  });
});
