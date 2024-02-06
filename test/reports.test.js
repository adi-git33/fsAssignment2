const request = require('supertest');
const app = require('../app/app');
const reportsRepository = require('../repository/reports.repository');
const {
  BodyNotSend, ServerError, NotFoundError, BadRequestError,
} = require('../errors/errors');

jest.mock('../repository/reports.repository');

// Get all reports test
describe('GET /reports', () => {
  beforeEach(() => jest.clearAllMocks());

  // Success 200
  it('should return all reports', async () => {
    const mockReports = [
      {
        user_id: 1,
        damage_id: 1,
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
        user_id: 5,
        damage_id: 2,
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
    reportsRepository.prototype.findReports.mockResolvedValue(mockReports);

    const res = await request(app).get('/reports');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockReports);
  });

  // Failure 404
  it('should return 404 when no reports are found', async () => {
    const mockReports = [];
    reportsRepository.prototype.findReports.mockResolvedValue(mockReports);

    const res = await request(app).get('/reports');
    expect(res.statusCode).toEqual(404);
  });

  // Failure 500
  it('should return 500 when an error occurs', async () => {
    reportsRepository.prototype.findReports.mockRejectedValue(new ServerError('internal server error'));

    const res = await request(app).get('/reports');
    expect(res.statusCode).toEqual(500);
  });
});
