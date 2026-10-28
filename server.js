require('dotenv').config({ quiet: true });

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const projects = require('./data/projects');
const sheets = require('./lib/sheets');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        page: 'home',
        projects: projects.filter((project) => project.featured),
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', { page: 'portfolio', projects });
});

app.get('/contact', (req, res) => {
    res.render('contact', { page: 'contact', error: null, contact: {} });
});

app.post('/thanks', async (req, res) => {
    const contact = {
        firstName: (req.body.firstName || '').trim(),
        lastName: (req.body.lastName || '').trim(),
        email: (req.body.email || '').trim(),
    };

    // Keep the user on the form until every field is filled in.
    if (!contact.firstName || !contact.lastName || !contact.email) {
        return res.status(400).render('contact', {
            page: 'contact',
            error: 'Please fill in your first name, last name, and email.',
            contact,
        });
    }

    if (!sheets.isConfigured()) {
        console.warn('Google Sheets is not configured, contact was not saved:', contact);
        return res.render('thanks', { page: 'contact', contact });
    }

    try {
        await sheets.appendContact(contact);
        res.render('thanks', { page: 'contact', contact });
    } catch (err) {
        // Only forward to the thanks page if the contact was actually saved.
        console.error('Google Sheets error:', err.message);
        res.status(502).render('contact', {
            page: 'contact',
            error: 'Something went wrong sending your info. Please try again.',
            contact,
        });
    }
});

app.use((req, res) => {
    res.status(404).render('404', { page: null });
});

if (require.main === module) {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`listening at http://localhost:${PORT}`);
    });
}

module.exports = app;
