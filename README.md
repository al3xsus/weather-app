# Simple weather app

___

[Версия на русском языке](README_ru.md)

___

[https://al3xsus.github.io/weather-app/](https://al3xsus.github.io/weather-app/)

___

Weather app, based on browser's latitude and longitude. Ultra-simple, get info from [https://api.darksky.net](https://api.darksky.net) through the [https://yacdn.org/serve/](https://yacdn.org/serve/) proxy, use skycons [https://darkskyapp.github.io/skycons/](https://darkskyapp.github.io/skycons/). 

## How it works

Based on this tutorial [https://www.youtube.com/watch?v=wPElVpR1rwA](https://www.youtube.com/watch?v=wPElVpR1rwA), but I also added error handling, loading variables from JSON document and so on. You should create file `settings.local.json` from `settings.local.template.json` and add your Dark Sky API secret key to make it work