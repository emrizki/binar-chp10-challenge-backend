# Binar_Chapter_9_BackEnd

## Note
 * bash path `/api`

 ## Setup for development
 * clone repo `git clone https://github.com/Binar-Academy-Team-1/Binar_Chapter_9_BackEnd.git`
 * instal dependensis `npm install`
 * duplikat file `.env.example` lalu rename menjadi `.env`
 * sesuaikan isi file `.env` dengan database masing masing
 * create database `sequelize db:create`
 * jalankan migration `npm run db:migrate:development`
 * jalankan seeder `npm run db:seed:development`
 * checkout ke branch development `git checkout develoopment`
 * jalankan aplikasi `npm run dev`

 ## Available Script
 * `npm run dev` to run app with env development
 * `npm run db:migrate:development` to migrate db for env development
 * `npm run db:undo:migrate:development` to undo migration for env development
 * `npm run db:seed:development` to seed db for env development

## Access swagger documentation
 * pastikan telah menginstall sewgger-ui
 * jika belum, jalankan `npm install`
 * masuk ke endpoint `/docs` untuk melihat dokumentasi swegger
