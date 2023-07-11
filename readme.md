# Nusa Wrapper Backend
project ini adalah project untuk nusatech blockchain wrapper backend untuk manajemen user, package, payment method/gateway user mana saja yang akan menggunakan service atau layanan nusatech blockchain wrapper

## Specification
terdapat beberapa specification pada project ini yaitu :
    - Node v20.3.0
    - npm v9.6.7
    - postgresql v13-alpine

## Setup
untuk persiapan sebelum membuild atau running project terdapat beberapa persiapan atau init config

### List Of Init Config / environment
    - SMTP
    - GEETEST ACCOUNT
    - GHOST
    - DB
    - BTCPAY ACCOUNT
    - XENDIT ACCOUNT
    - FIREBASE & GOOGLE ID

untuk semua environtment tersebut dapat digunakan pada file ```.env``` dengan merubah semua value dari setiap variable yangtelah dideklarasikan
untuk config dari beberapa environment bisa mengikuti arahan berikut

### BTCPAY ACCOUNT
untuk pembuatan btc pay account bisa menuju pada link [BTCPAY SERVER](https://btcpayserver.org/) dengna melakukan register pada website tersebut kemudian lengkapi kebutuhan yang diperlukan

setelah itu silahkan setup api key pada btc pay server pada Account -> manage accoutn -> api key dan jangan lupa manage permission untuk api key yang akan dibuat

pada ```.env``` silahkan rubah variable 

    - BTCPAY_API_KEY_TOKEN
    - BTCPAY_STORE_BASE_CURRENCY
    - BTCPAY_DEFAULT_AMOUNT_PRICE

dengan config dari btcpay server yang telah dibuat

### Xendit Account
untuk integrasi dengan menggunakan xendit payment memerlukan akun xendit terlebih dahulu dan membutuhkan api key dari xendit itu sendiri

untuk akun xendit sendiri silahkan register pada [XENDIT](https://dashboard.xendit.co/register/1) dan lengkapi semua specifikasi akun pada xendit

setelah akun sudah siap lakukan config payment pada menu payment method yang nantinya akan digunakan

jangan lupa siapkan konfigurasi xendit pada environtment program seperti

    - XENDIT_APIKEY_SECRET
    - XENDIT_INVOICE_NOTIFIER
    - INVOICE_DURATION_EXPIRATE

jika kedua akun sudah disiapkan silahkan daftarkan payment method dari kedua aku pada program jika sudah program sudah dijalankan

### Firebase & google id
untuk konfigurasi firebase & google id bisa dilakukan pada website console.firebase pada menu authentication configurasi pada sign-in method tambahkan google

jika sudah maka akan mendapatkan 2 key yaitu

    - web client id
    - web client secret

kemudian config tersebut bisa disimpan pada environment
    
    - GOOGLE_CLIENT_ID
    - GOOGLE_CLIENT_SECRET

untuk konfigurasi pada sisi backend

config pada project overview -> project settings -> general -> your apps (posisi pada bagian paling bawah menu general) -> web apps yang telah didaftarkan -> copy semua cofig firebaseConfig{} untuk konfigurasi pada sisi frontend


## how to run
to running this project you can use npm run dev

first before running you have to install all depedencies for this project with npm install

for development you can running this project with ```npm run dev```

but for production you can running this project with ```pm2```

for running this project follow this step

    - git clone <this project>
    - npm install

lakukan migrasi database untuk configurasi database dan seeder pada awal program pada system

    - npx sequelize db:create
    - npx sequelize db:migrate
    - npx sequelize db:seed:all

setelah itu jalankan program dengan menggunakan ```npm run dev```

# <img src="http://cliparts.co/cliparts/8iE/jnA/8iEjnAgaT.png?raw=true" width="25" /> ===> CAUTION <=== <img src="http://cliparts.co/cliparts/8iE/jnA/8iEjnAgaT.png?raw=true" width="25" />

Sebelum menjalankan program pada production pastikan semua konfigurasi awal sudah disiapkan dan sudah melakukan konfig awal, disarankan tidak terlalu terpaku pada seeder yang sudah dibuat