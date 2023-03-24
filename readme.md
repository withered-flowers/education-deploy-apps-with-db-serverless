# Education Deploy Apps With DB (Serverless)

## Table of Contents

- [Persyaratan Dasar](#persyaratan-dasar)
- [Disclaimer](#disclaimer)
- [Perkenalan](#perkenalan)
- [Let's Demo](#lets-demo)
  - [Langkah 1 - Inisialisasi Project](#langkah-1---inisialisasi-project)
  - [Langkah 2 - Setup Database (Supabase)](#langkah-2---setup-database-supabase)

## Persyaratan Dasar

- Mengerti perintah dasar pada Linux
- Menginstall nodejs dan postgresql
- Memiliki akun github
- Mengerti penggunaan command line `git`
- Memiliki akun Vercel yang sudah ter-link dengan github
- Menggunakan Aplikasi berbasis Express (dan Sequelize)
- [OPTIONAL] sudah membaca pembelajaran yang sebelumnya tentang deployment di Vercel di https://education.withered-flowers.dev/education-deploy-apps-serverless

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

1. Karena pada akhirnya kita akan deploy aplikasi pada Vercel, maka kita akan membutuhkan sebuah repository git (Github / Gitlab / Bitbucket) terlebih dahulu. Pada pembelajaran ini kita menggunakan Github yah.

1. Membuat sebuah repository kosong yang baru baru pada Github dengan nama apapun.

   asumsi:

   - Nama user github: `nama-user-sendiri`
   - Nama repo: `nama-repo-sendiri`
   - Protocol: `https` (untuk SSH disesuaikan sendiri yah)

1. Memasukkan perintah berikut pada terminal yang digunakan

   ```bash
   # Clone Repo

   git clone https://github.com/withered-flowers/education-deploy-apps-with-db-serverless

   # Masuk ke Folder Clone

   cd education-deploy-apps-with-db-serverless

   # Masuk ke folder kode

   cd sources/a-start

   # Inisialisasi Git

   git init

   # Melakukan add dan commit untuk Repo

   git branch -M main
   git add .
   git commit -m "feat: initial commit"

   # Menambahkan origin ke github

   git remote add origin \
      https://github.com/nama-user-sendiri/nama-repo-sendiri.git

   # Push ke github

   git push -u origin main
   ```

1. Sampai pada titik ini, seharusnya pada repo `nama-repo-sendiri` yang ada di akun Github, sudah ada code yang berisi app.js dan lain lainnya ini.

Langkah selanjutnya adalah kita akan menyiapkan Database yang diperlukan terlebih dahulu, sebelum kita akan melakukan deployment.

## Langkah 2 - Setup Database (Supabase)

Pada langkah ini kita akan membuat database terlebih dahulu pada `Supabase`. `Supabase` (https://supabase.com/), merupakan suatu produk BaaS (Backend as a Service), yang dibuat dengan teknologi Open Source, dimana untuk databasenya, yang digunakan adalah `PostgreSQL`. `Supabase` ini dibuat untuk menyaingi beberapa Cloud Provider (sebut saja `Firebase`) agar tidak terlalu `vendor lock-in` (sangat ketergantungan dengan teknologi yang vendor berikan).

Untuk pricingnya sendiri pun `Supabase` ini cukup bersahabat, hanya saja limitasi terbesarnya adalah: **satu akun free hanya bisa memiliki 2 project saja** (dalam artian, hanya bisa ada 2 project dengan database yang berbeda).

TL;DR: `Supabase` itu gratis (dalam batasan tertentu), jadi kita menggunakannya.

Langkah untuk menggunakan Setup Project `Supabase` adalah sebagai berikut:

1. Buka browser kemudian buka web https://supabase.com
1. Sign In dengan menggunakan Github (`Start your project` -> `Sign Up now` -> `Continue with GitHub`)
1. Ketika selesai melakukan Sign Up dan berhasil Sign In, maka kita akan diberikan pertanyaan untuk membuat Organization di dalam Project Supabase:

   - **Name**: `namanya-terserah-yang-buat`
   - **Type of Organization**: `Education`

   Kemudian pilih `Create Organization`

   Contohnya adalah sebagai berikut:

   ![assets/01.png](assets/01.png)

1. Kemudian setelah ini, kita akan diminta untuk menuliskan nama Project yang akan kita buat. Project ini akan berisi sebuah database untuk PostgreSQL yang kita gunakan. **JANGAN LUPA YAH UNTUK PASSWORDNYA**:

   - **Name**: `namanya-terserah-lagi`
   - **Database Password**: `yang-aman-dan-jangan-sampai-lupa`
   - **Region**: `Southeast Asia (Singapore)`
   - **Pricing Plan**: `Free - $0/month` (tentu saja yang ini)

   Kemudian pilih `Create Project`

   Contohnya adalah sebagai berikut:

   ![assets/02.png](assets/02.png)

1. Tunggu sampai `Supabasenya` selesai membuat databasenya.

Sampai pada titik ini, kita sudah berhasil membuat database yang akan digunakan untuk deployment kita nanti. Perhatikan bahwa pada `Supabase`, database-nya sudah dibuat yah. Sehingga untuk pengguna **sequelize** dan ORM lainnya, **JANGAN CREATE DATABASE-nya** lagi, melainkan langsung `migration` dan `seed` saja nantinya.

Selanjutnya kita akan mencoba bertindak sebagai "non-developer" dengan melakukan migrasi dan seeding data awal pada database.

## Langkah 3 - Migration & Seeding Database Production

Langkah ini umumnya tidak dilakukan oleh developer, melainkan oleh database administrator apabila di perusahaan besar. (Tapi bisa juga dilakukan oleh developer bila di kantor menganut sistem palugada !)

Pada langkah ini kita akan melakukan pembuatan tabel pada Production database dan melakukan penambahan data awal (seeding). Untuk pembelajaran ini seeding dilakukan dengan mengenerate random data untuk dimasukkan ke dalam database yah.

Langkahnya adalah sebagai berikut:
