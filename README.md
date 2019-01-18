# Adot Test technique api


## Start the API
```js
npm install
npm start
```
##  API Infos

The API will get a localization (lat, lon) and send back the the closest localization number of impressions and clicks find on the events.csv file

the API will listen on **localhost** : port **3000**

There is only one adress available
```
http://localhost:3000/pointinfo
```
Who waiting a JSON array post method
```JSON
[
  {
    "lat": 48.86,
    "lon": 2.35,
    "name": "Chatelet"
  },
  {
    "lat": 48.8759992,
    "lon": 2.3481253,
    "name": "Arc de triomphe"
  }
]
```

and send back a formated JSON object answer
```JSON
{
    "Chatelet": {
        "lat": 48.86,
        "lon": 2.35,
        "name": "Chatelet",
        "impression": 136407,
        "click": 16348
    },
    "Arc de triomphe": {
        "lat": 48.8759992,
        "lon": 2.3481253,
        "name": "Arc de triomphe",
        "impression": 63593,
        "click": 7646
    }
}
```

Request exemple with curl
```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '[{"lat": 48.8759992,"lon": 2.3481253,"name": "Arc de triomphe"}]' \
  http://localhost:3000/pointinfo
```
