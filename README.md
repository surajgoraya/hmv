# hmv - How Many Vaccines?
hmv or HowManyVaccines is a small webpage which uses data gathered by [covid19tracker.ca](http://covid19tracker.ca) to show quick stats about vaccination in Canada 🇨🇦 🍁!

This small web app is very limited, and sites like [covid19tracker.ca](http://covid19tracker.ca) are vastly more full featured and have amazing in-depth stats. This web app really serves as a chance for me to learn VueJS (which is part of what this webapp is built upon). I personally recommend you use sites like [covid19tracker.ca](http://covid19tracker.ca) or [CBC's Vaccination Tracker](https://newsinteractives.cbc.ca/coronavirustracker/).

## Data Source
Data is provided by [covid19tracker.ca](http://covid19tracker.ca), I cannot thank them enough for such as wonderful and open [API](http://api.covid19tracker.ca), this project would not be possible without them!

## Should I use this?

Probably not, no. While it does get it's data directly from [covid19tracker.ca](http://covid19tracker.ca), I would still recommend using [covid19tracker.ca](http://covid19tracker.ca) or [CBC's Vaccination Tracker](https://newsinteractives.cbc.ca/coronavirustracker/). There is always a possibility of me making mistakes as well as the code not being anywhere near production ready. This was really an excuse for me to experiment with VueJS.

## Stack
- VueJS (Frontend)
- NodeJS (Backend)

## How to run 
1. run `yarn install` in both the `frontend` directory and the server root.
2. run `yarn serve` in the `frontend` directory.
3. In another terminal run `yarn watch` in the root directory of the project.