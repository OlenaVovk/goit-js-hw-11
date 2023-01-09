Доброго дня! В ході роботи у мене виникли проблеми, при установці
simplelightbox:

Біля імпорту бібліотеки в самому JS-файлі з'являється "..." підкреслення і опис
проблеми: Could not find a declaration file for module 'simplelightbox'.
'c:/GitHub/goit-js-hw-11/node_modules/simplelightbox/dist/simple-lightbox.js'
implicitly has an 'any' type. Try `npm i --save-dev @types/simplelightbox` if it
exists or add a new declaration (.d.ts) file containing
`declare module 'simplelightbox';`ts(7016)

Тоді і в терміналі теж: $ npm i --save-dev @types/simplelightbox npm ERR! code
E404 npm ERR! 404 Not Found - GET
https://registry.npmjs.org/@types%2fsimplelightbox - Not found  
npm ERR! 404 npm ERR! 404 '@types/simplelightbox@\*' is not in this registry.
npm ERR! 404 npm ERR! 404 Note that you can also install from a npm ERR! 404
tarball, folder, http url, or git url.

npm ERR! A complete log of this run can be found in: npm ERR!
C:\Users\Оленка\AppData\Local\npm-cache_logs\2023-01-05T21_38_50_311Z-debug-0.log

Таке ж і з бібліотекою baguetteBox. Я не можу розібратись у чому моя проблема.
Підключила наразі simplelightbox через посилання.

І друга проблема, я не можу подружити плавний скрол ні з lightbox, ні з
бібліотекою simplelightbox. Я так розумію, що його треба зупинити на час
відкриття великого зображення, але у мене не виходить. Підскажіть будь ласка як
це зробити.

Наперед дякую! І веселих свят!
