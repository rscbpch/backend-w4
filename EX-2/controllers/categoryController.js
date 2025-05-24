import { categories, articles } from '../models/data.js';

export function getAllCategories(req, res) {
    res.json(categories);
}

export function getCategoryById(req, res) {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
}

export function createCategory(req, res) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newCategory = {
        id: categories.length ? categories[categories.length - 1].id + 1 : 1,
        name
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
}

export function updateCategory(req, res) {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) return res.status(404).json({ error: 'Category not found' });
    const { name } = req.body;
    if (name) category.name = name;
    res.json(category);
}

export function deleteCategory(req, res) {
    const idx = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Category not found' });
    categories.splice(idx, 1);
    res.status(204).send();
}

export function getArticlesByCategory(req, res) {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(c => c.id === categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    const categoryArticles = articles.filter(a => a.categoryId === categoryId);
    res.json(categoryArticles);
}