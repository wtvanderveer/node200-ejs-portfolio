jest.mock('../lib/sheets');

const request = require('supertest');
const sheets = require('../lib/sheets');
const app = require('../server');

const contact = { firstName: 'Sarah', lastName: 'Person', email: 'sarah_person@work.com' };

beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('pages', () => {
    test('GET / shows the home page with a GitHub link', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toContain('https://github.com/wtvanderveer');
    });

    test('GET /portfolio lists projects', async () => {
        const res = await request(app).get('/portfolio');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Mortgage Calculator');
    });

    test('GET /contact shows the form fields', async () => {
        const res = await request(app).get('/contact');
        expect(res.status).toBe(200);
        expect(res.text).toContain('name="firstName"');
        expect(res.text).toContain('name="lastName"');
        expect(res.text).toContain('name="email"');
    });

    test('unknown routes return 404', async () => {
        const res = await request(app).get('/does-not-exist');
        expect(res.status).toBe(404);
    });
});

describe('POST /thanks', () => {
    test('saves the contact and thanks them by name', async () => {
        sheets.isConfigured.mockReturnValue(true);
        sheets.appendContact.mockResolvedValue();

        const res = await request(app).post('/thanks').type('form').send(contact);

        expect(res.status).toBe(200);
        expect(res.text).toContain('Thank you, Sarah Person!');
        expect(sheets.appendContact).toHaveBeenCalledWith(contact);
    });

    test('stays on the form when a field is missing', async () => {
        const res = await request(app).post('/thanks').type('form').send({ firstName: 'Sarah' });

        expect(res.status).toBe(400);
        expect(res.text).toContain('Please fill in');
        expect(sheets.appendContact).not.toHaveBeenCalled();
    });

    test('stays on the form when Google Sheets fails', async () => {
        sheets.isConfigured.mockReturnValue(true);
        sheets.appendContact.mockRejectedValue(new Error('boom'));

        const res = await request(app).post('/thanks').type('form').send(contact);

        expect(res.status).toBe(502);
        expect(res.text).toContain('Something went wrong');
        expect(res.text).toContain('value="Sarah"');
    });

    test('escapes HTML in the submitted name', async () => {
        sheets.isConfigured.mockReturnValue(false);

        const res = await request(app)
            .post('/thanks')
            .type('form')
            .send({ ...contact, firstName: '<script>alert(1)</script>' });

        expect(res.text).not.toContain('<script>alert(1)</script>');
    });
});
