import '../../../mocks'
const request = require('supertest');
describe('Pre ride details API', () => {
  const baseUrl = '/api/v1';

  beforeEach(async () => {
    // await User.destroy({ truncate: true, force: true });
    // await Verification.destroy({ truncate: true, force: true });
    // await Ride.destroy({ truncate: true, force: true });
  });

  xit('Check pre ride details', async () => {
    // const { accessToken } = await createUserAndLogin();
    // const res = await request(app).get(`${baseUrl}/me/rides/pre`).query({
    //   origin: JSON.stringify({ lat: 32.052425936877434, lng: 34.766836166381836 }),
    //   destination: JSON.stringify({ lat: 32.092318912093184, lng: 34.77919578552246 }),
    // }).set('Authorization', `Bearer ${accessToken}`);
    // console.log('res', res.body);
    // expect(res.statusCode).toBe(200);
    // // expect(res.body).toEqual({ success: true });
  });
});
