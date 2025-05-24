import { journalists, articles } from '../models/data.js';

export function getAllJournalists(req, res) {
    res.json(journalists);
}

export function getJournalistById(req, res) {
    const journalist = journalists.find(j => j.id === parseInt(req.params.id));
    if (!journalist) return res.status(404).json({ error: 'Journalist not found' });
    res.json(journalist);
}

export function createJournalist(req, res) {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newJournalist = {
        id: journalists.length ? journalists[journalists.length - 1].id + 1 : 1,
        name,
        email
    };
    journalists.push(newJournalist);
    res.status(201).json(newJournalist);
}

export function updateJournalist(req, res) {
    const journalist = journalists.find(j => j.id === parseInt(req.params.id));
    if (!journalist) return res.status(404).json({ error: 'Journalist not found' });
    const { name, email } = req.body;
    if (name) journalist.name = name;
    if (email) journalist.email = email;
    res.json(journalist);
}

export function deleteJournalist(req, res) {
    const idx = journalists.findIndex(j => j.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Journalist not found' });
    journalists.splice(idx, 1);
    res.status(204).send();
}

export function getArticlesByJournalist(req, res) {
    const journalistId = parseInt(req.params.id);
    const journalist = journalists.find(j => j.id === journalistId);
    if (!journalist) return res.status(404).json({ error: 'Journalist not found' });
    const journalistArticles = articles.filter(a => a.journalistId === journalistId);
    res.json(journalistArticles);
}