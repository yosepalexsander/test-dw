// soal no. 1
// node js executable
// menggunakan module readline untuk cli I/O
const readline = require("readline");

class Rumah {
  constructor(tipe, harga, tenor, disc = 0.2) {
    this.tipe = tipe;
    this.harga = harga;
    this.dp = disc * harga;
    this.sisaBayar = this.harga - this.dp
    this.tenor = tenor;
    this.disc = disc;
    this.angsuran = this.sisaBayar / this.tenor;
  }

  detail() {
    return `
Type Rumah: ${this.tipe}
Harga Rumah: ${this.harga}
Uang Muka: ${this.dp}
Sisa: ${this.sisaBayar}
Lama Kredit: ${this.tenor}
Angsuran: ${this.angsuran}
  `
  }

  detailAngsuran() {
    const output = [];
    for (let i = 1; i <= this.tenor; i++) {
      output.push(
        {
          'Bulan ke': i,
          'Angsuran': this.angsuran,
          'Sisa': this.sisaBayar - this.angsuran,
        })
      this.sisaBayar -= this.angsuran
    }

    return output;
  }
}

const tipeRumah = [
  {
    tipe: 'Rose',
    harga: 120000000,
  },
  {
    tipe: 'Gold',
    harga: 300000000,
  },
  {
    tipe: 'Platinum',
    harga: 360000000,
  }
]

console.table(tipeRumah);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Pilih tipe rumah yang anda inginkan?\n(pilih berdasarkan nomor pada kolom index) ", function (index) {
  rl.question("Pilih jangka waktu kredit: (12, 18, 24) bulan ", function (tenor) {
    try {
      const rumah = new Rumah(tipeRumah[index].tipe, tipeRumah[index].harga, Number(tenor))
      console.log(rumah.detail())
      console.table(rumah.detailAngsuran())
      rl.close();
    } catch (err) {
      console.log('\nMohon maaf pilihan anda tidak tersedia di daftar')
      rl.close();
    }
  })
})

rl.on("close", () => {
  console.log("\nThank you for choose us, Have a nice day !!");
  process.exit(0);
})

// fungsi prompt hanya bisa digunakan di browser console (global window)
// const pilihanRumah = prompt("");
// const tenor = Number(prompt("Pilih jangka waktu kredit: (12, 18, 24) bulan"));

