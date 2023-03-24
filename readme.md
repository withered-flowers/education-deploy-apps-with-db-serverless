# Education Deploy Apps With DB (Serverless)

## Table of Contents

- [Persyaratan Dasar](#persyaratan-dasar)
- [Disclaimer](#disclaimer)
- [Perkenalan](#perkenalan)
- [Let's Demo](#lets-demo)

## Persyaratan Dasar

- Mengerti perintah dasar pada Linux
- Menginstall nodejs dan postgresql
- Memiliki akun github
- Mengerti penggunaan command line `git`
- Memiliki akun Vercel yang sudah ter-link dengan github
- Menggunakan Aplikasi berbasis Express (dan Sequelize)

## Disclaimer

Pada pembelajaran ini disediakan sebuah kode sederhana yang sudah siap dan bisa digunakan.

Aplikasi ini menggunakan:

- `ExpressJS` sebagai Backend Framework
- `Sequelize` sebagai Object Relational Mapper-nya (ORM)
- `PostgreSQL` sebagai Database

Aplikasi ini nanti akan di-deploy pada `Vercel` dan untuk Database akan menggunakan `Supabase`.

Apabila belum memiliki akun `Supabase`, Sangat disarankan untuk `Login with Github` dalam pembelajaran ini agar cepat terkoneksi dengan `Supabase`.

## Perkenalan

Pada pembelajaran sebelumnya (https://github.com/withered-flowers/education-deploy-apps-serverless), kita sudah belajar bagaimana cara mendeploy aplikasi berbasis Express secara Serverless (Function) dengan menggunakan Vercel.

Tapi, aplikasi sebelumnya kita masih belum menggunakan database secara lansgung yah (hanya menarik data langsung dari pihak ketiga saja).

Nah pada pembelajaran ini kita akan mencoba untuk mendeploy aplikasi berbasis Express yang menggunakan Sequelize dan PostgreSQL sebagai databasenya yah ke Vercel, sebagai Serverless Function (lagi) yah.

Jadi tanpa ba bi bu lagi, yuk kita masuk ke demo !

## Let's Demo

Dalam demo ini, secara garis besarnya yang akan kita lakukan adalah sebagai berikut:

- Melakukan migrasi database dari komputer lokal ke Supabase
- Melakukan perubahan kode
- Deploy aplikasi ke Vercel

Disclaimer:

- Untuk deploy serverless function dengan database **UNTUK SETIAP PROVIDER AKAN MEMILIKI CARANYA TERSENDIRI** dan **TRICKNYA SENDIRI**
- Cara yang digunakan di sini adalah cara untuk mendeploy pada `Vercel` dan databasenya ada di `Supabase`, bila menggunakan yang lain akan ada penyesuaian tersendiri yah !

## Langkah 1 - Inisialisasi Project
