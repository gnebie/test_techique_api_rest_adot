# test_techique_api_rest_adot


## Start the API
```js
npm install
npm start
```
##  API Infos

The API will get a localization (lat, lon) and send back the impressions and clicks number of the closest interest points find on the events.csv file

the interest points are all the points finds on the range on the localization circle area with a range radius of 0.075 

the API will listen on **localhost** : port **3000**

There is only one adress available
```
http://localhost:3000/pointinfo
```
Who waiting a JSON array post method
```JSON
[
  {
    "lat": 48.8759992,
    "lon": 2.3481253,
    "name": "Arc de triomphe"
  },
  {
    "lat": 48.86,
    "lon": 2.35,
    "name": "Chatelet"
  }
]
```

and send back a formated JSON object answer
```JSON
{
    "Arc de triomphe": {
        "lat": 48.8759992,
        "lon": 2.3481253,
        "name": "Arc de triomphe",
        "impression": 126043,
        "click": 15056
    },
    "Chatelet": {
        "lat": 48.86,
        "lon": 2.35,
        "name": "Chatelet",
        "impression": 136407,
        "click": 16350
    }
}
```
