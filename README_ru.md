# Простое приложение (сайт) с текущей погодой

___

[https://al3xsus.github.io/weather-app/](https://al3xsus.github.io/weather-app/)

___

Приложение с прогнозом (показом) погоды. Местоположение (широта и долгота) берется из браузера. Очень простое, использует данные по API [https://api.darksky.net](https://api.darksky.net) через прокси [https://yacdn.org/serve/](https://yacdn.org/serve/), использует skycons [https://darkskyapp.github.io/skycons/](https://darkskyapp.github.io/skycons/). 

## Как это работает

Основано на данном туториале [https://www.youtube.com/watch?v=wPElVpR1rwA](https://www.youtube.com/watch?v=wPElVpR1rwA), но я ещё добавил обработку ошибок, загрузку настроек из JSON-файла и т.д. Для начала работы нужно создать файл `settings.local.json` из шаблона `settings.local.template.json` и прописать туда свой Dark Sky API secret key.