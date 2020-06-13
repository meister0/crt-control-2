# Итоговое задание по блоку "HTML, CSS и сборщики"

Верстка макета с использованием Sass, Gulp

## Команды запуска проекта:

    npm i // Установка всех пакетов
    gulp  // Сборка проекта, минификация, запуск local server 
    
## Примечания:

- Поначалу были проблемы с продумыванием фреймворка, наименования классов в нем, но с ними справился ( правда не знаю насколько хорошо )
- Взамен коммерческим шрифтам из проекта был выбран Open Sans
- Была проблема с svg иконкой со знаком вопроса:
    - Из-за того, что ее структура была не такой, как у других, ее свойство/атрибут fill заливал не внутреннюю область иконки, а только контур, поэтому были скачаны все состояния этой иконки для решения этой проблемы.
- У элементов, которые отвечают за роутинг страниц, убрал hover и active, т.к. посчитал, что они не должны присутствовать на них.

###### Made by Dmitry Ovchinnikov
