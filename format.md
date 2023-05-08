
This would be the expected result of calling `/wiki`:

```json
[
  "maple-hall",
  "alder-hall",
  ...
  // array of strings
]
```

This would be the expected result of calling `/wiki?dorm=something`:
```json
// for a single dorm:
{
  "id": "dorm",
  "reviews": [
      "id": { // of review
        "date": 5-4-23, 
        "name": "john",
        "id": 125151,   // of user
        "rating": 4.5,  // 1 - 5, decimal?
        "content": "good place",
        "other stuf": ...,
      }, 
      ...
  ]
  "description": "...",
  ...
  
}
```

Posting (or adding a review/event) is kinda similar. We will hopefully generate
a json to send to the backend that follows the same format:

```json
// a single review post
{
  "dorm-name": "maple-hall" // this should match exactly
  "review-id": 53453,
  "date": 5-4-23, 
  "review-name": "john",
  "user-id": 125151,   // of user
  "rating": 4.5,  // 1 - 5, decimal?
  "content": "good place",
  "other stuff": ...,
}
```
This entry should be stored in the array `"reviews"` of the according dorm;
recieve this -> get dorm from `"dorm-name"` -> append this to `dorm["reviews"]`.