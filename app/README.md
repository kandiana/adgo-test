# Проект был создан с помощью CRA

Перед запуском проекта необходимо запустить API сервер.

## Запуск проекта:
Проект запускается в режиме разработки из папки `app` последовательным выполнением команд `npm i` и `npm start`.  
По умолчанию, проект запустится на порту 3001.   
Значение порта можно поменять в файле `.env`  

Запуск в production режиме на данный момент не предусмотрен.  

## Комментарии:

- На данный момент ошибки соединения с API сервером просто выводятся в консоль. Дополнительная обработка не предусмотрена.  
- Так как в запросах можно указывать несколько операционных систем и браузеров, в форме возможно выбрать несколько значений в соответствующих полях ввода (`Operating system(s)` и `Browser(s)`). Для этого необходимо зажать клавишу `Ctrl`.  
- Значение поля `Platform` влияет на доступные варианты в полях ввода `Operating system(s)` и `Browser(s)`.  
- Сохранение формы в сторе производится только по нажатию кнопки `Save and get statistics`, после чего отправляется запрос на сервер. При переключении страниц используются данные формы, сохраненные в сторе, текущие изменения формы не учитываются.  

