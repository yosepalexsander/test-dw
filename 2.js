const hitungHurufDariKalimat = function (char, sentence) {
  const pattern = new RegExp(char, 'gi')
  return sentence.match(pattern).length
}
const sentence = 'saya mau makan sate bersama teman saya setelah lulus dari sekolah dasar';
const hurufYgDihitung = 'a';
const jumlah = hitungHurufDariKalimat(hurufYgDihitung, sentence);
console.log(`Jumlah kemunculan huruf '${hurufYgDihitung}' pada kalimat '${sentence}' sebanyak ${jumlah} kali.`);