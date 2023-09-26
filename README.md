## My Todo APP

Buatlah sebuah server untuk dapat melakukan penyimpanan dan perubahan data dari aplikasi yang kalian buat,

## Release 1 - CRUD of Your TODOS APP

buatlah sebuah API untuk:

- Create, lakukan POST sesuai api-doc.md
- Read, lakukan route GET sesuai api-doc.md
- Update, lakukan route PUT dan PATCH sesuai api-doc.md
- Delete, lkukan route DELETE sesuai api-doc.md

data cukup disimpan didalam array yang telah disediakan,
semua perubahan penambahan dilakukan dengan method javascript

- lakukan array.push({....}) untuk create
- lakukan indexing array[index] dengan metode array find untuk menemukan index yang kalian ingin lakukan perubahan untuk update dan delete
  untuk id tiap post cukup integer, misal post pertama kasih id 1, post selanjutnya cek postingan terakhir dan tambah increment ++ pada id sebelumnya, sehingga post kedua akan memiliki id 2 dan seterusnya,

  ### Postman Usage

  - didalam folder api-doc terdapat file dengan nama api.postman-collection.json
  - import file tersebut pada postman milik kalian dan lakukan semua kegiatan development pada postman collection yang telah disediakan

## Structure Data tiap Todos

const array = []

isi array
[{
id: <number>
title: <string>
description: <string>
status: <enum|string>
created_at: <Date>
updated_at: <Date>
}]

contoh

````json
[{
  "id":1,
  "title": "membuat API",
  "description": "membuat API menggunakan express js dan dilakukan hit menggunakan psotman",
  "status": "created",
  "created_at": "2023-09-25",
  "updated_at": "2023-09-25"
}]```
````
