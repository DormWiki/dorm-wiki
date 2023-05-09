import DOMPurify from 'isomorphic-dompurify';

const URL = "http://localhost:5050";

export default  function handler(req, res) {
    const body = req.body;
    let data = new FormData();
    data.append("ID", DOMPurify.sanitize(body.ID));
    data.append("user", DOMPurify.sanitize(body.user));
    data.append("text", DOMPurify.sanitize(body.text));
    data.append("date", DOMPurify.sanitize(body.date));
    data.append("rating", DOMPurify.sanitize(body.rating));
    fetch(URL + "/postReview", { 
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        }, 
        data: data })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return res.status(200).send('success');
        })
        .catch ((e) =>  {return res.status(500).send('error');});

}