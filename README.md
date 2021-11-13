# Story API 
---

## Overview
> StoryAPI is Express.js simple REST API using `clean architecture` code design.

- Routes mapping via [express-routes-mapper](https://github.com/aichbauer/express-routes-mapper)
- Support for [sqlite](https://www.sqlite.org/)
- Environments for `development` only
- Built with [npm scripts](#npm-scripts)
- Example with data from [HackerNews/API](https://github.com/HackerNews/API)

## Prerequisites 
- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.postman.com/downloads) 
- [Visual Studio Code](https://code.visualstudio.com)

## Installation
Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/faisalsyfl/StoryAPI.git
```

then

```sh
# cd into project root
$ npm i
# copy .env.example to .env
$ cp .env.example .env
# simply, start the development server
$ npm run dev
```

## Usage
- `/api/v1/fetchSources`

```javascript
# HackerNews Source Top Stories
[ 29210352, 29210704, 29209455, ...]
```
```javascript
{
    "msg": "Success fetch topstories.json into database"
}
```
- `/api/v1/fetchStories`

```javascript
# HackerNews Source Stories :id
{
  "by" : "dhouston",
  "descendants" : 71,
  "id" : 8863,
  "kids" : [ 9224, 8917, 8952, 8958, 8884, 8887, 8869, 8940, 8908, 9005, 8873, 9671, 9067, 9055, 8865, 8881, 8872, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8870, 8878, 8980, 8934, 8943, 8876 ],
  "score" : 104,
  "time" : 1175714200,
  "title" : "My YC app: Dropbox - Throw away your USB drive",
  "type" : "story",
  "url" : "http://www.getdropbox.com/u/2/screencast.html"
}
```
```javascript
{
    "msg": "Sucessfully added 500row."
}
```

- `/api/v1/topstories`

```javascript
[29210352,29210704,29209455,29210189,29208518,29209353,29210125,29210494,29198951,29209415]
```
- `/api/v1/story/:id`

```javascript
{
    "id": 29198951,
    "by": "nz",
    "descendants": 0,
    "type": "story",
    "time": 1636722908,
    "kids": null,
    "url": "https://gist.github.com/jm3/6724931",
    "score": 13,
    "title": "Gin, television, and social surplus, or, “looking for the mouse”"
}
```
- POST `api/v1/story/:id/favorite`

```javascript
{
    "msg": "Sucesssfully change Gin, television, and social surplus, or, “looking for the mouse” favorite."
}
```

-  `api/v1/story?isFavorite=1`

```javascript
[
    {
        "id": 29198951,
        "by": "nz",
        "descendants": 0,
        "kids": null,
        "score": 13,
        "time": 1636722908,
        "title": "Gin, television, and social surplus, or, “looking for the mouse”",
        "type": "story",
        "url": "https://gist.github.com/jm3/6724931",
        "isFavorite": 1,
        "createdAt": "2021-11-13T16:50:36.316Z",
        "updatedAt": "2021-11-13T16:50:58.140Z"
    }
]
```


