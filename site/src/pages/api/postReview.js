import DOMPurify from 'isomorphic-dompurify';

const URL = "https://localhost:5050";

export default function handler(req, res) {
    const body = req.body;

    res.status(200).json({
        user: DOMPurify.sanitize(body.user),
        text: DOMPurify.sanitize(body.text),
        date: DOMPurify.sanitize(body.date),
        rating: DOMPurify.sanitize(body.rating)
    })
}