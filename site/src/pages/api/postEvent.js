import DOMPurify from "isomorphic-dompurify";

export default function handler(req, res) {

    res.status(200).json({
        name: DOMPurify.sanitize(req.body.name),
	    startTime: DOMPurify.sanitize(req.body.startTime),
	    postDate: DOMPurify.sanitize(req.body.postDate),
	    dorm_id: DOMPurify.sanitize(req.body.dorm_id),
	    location: DOMPurify.sanitize(req.body.location),
        organizer: DOMPurify.sanitize(req.body.organizer)
    })
}