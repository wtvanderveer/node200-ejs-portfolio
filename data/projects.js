// Add a project here and it shows up on the portfolio page.
// Set `live` to the Render URL once a project is hosted, and `featured: true`
// to also show it on the home page.
const GITHUB = 'https://github.com/wtvanderveer';

module.exports = [
    {
        name: 'Mortgage Calculator',
        description: 'A React app that works out monthly mortgage payments from the loan amount, rate, and term.',
        tech: ['React'],
        github: `${GITHUB}/react100-mortgage-calculator-project`,
        live: '',
        featured: true,
    },
    {
        name: 'San Diego Top Spots',
        description: 'A React app listing the best places to visit in San Diego, loaded from JSON data.',
        tech: ['React'],
        github: `${GITHUB}/react100-san-diego-top-spots-project`,
        live: '',
        featured: true,
    },
    {
        name: 'VSTDA To-Do App',
        description: 'A very simple to-do app in React with priorities and editable items.',
        tech: ['React'],
        github: `${GITHUB}/react100-vstda-project`,
        live: '',
        featured: true,
    },
    {
        name: 'Change Calculator',
        description: 'A React app that calculates the change owed and breaks it down into bills and coins.',
        tech: ['React'],
        github: `${GITHUB}/react100-change-calculator-project`,
        live: '',
        featured: false,
    },
    {
        name: 'VSTDA API',
        description: 'A REST API in Express for the to-do app, with create, read, update, and delete routes.',
        tech: ['Node', 'Express'],
        github: `${GITHUB}/node101-vstda-api`,
        live: '',
        featured: false,
    },
    {
        name: 'Movie Finder Data',
        description: 'An Express server that looks up movies from the OMDb API and caches the results.',
        tech: ['Node', 'Express'],
        github: `${GITHUB}/node101-movie-finder-data`,
        live: '',
        featured: false,
    },
    {
        name: 'Astro Weight Calculator',
        description: 'Works out what you would weigh on each planet in the solar system.',
        tech: ['JavaScript'],
        github: `${GITHUB}/astro-weight-calculator`,
        live: '',
        featured: false,
    },
    {
        name: 'MySQL Exercises',
        description: 'SQL queries written against sample databases, covering joins, grouping, and filtering.',
        tech: ['MySQL'],
        github: `${GITHUB}/db100-mysql-exercises`,
        live: '',
        featured: false,
    },
];
