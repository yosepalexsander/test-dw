function cetakPola(n) {
  var y, w, shape = '';

  for (y = 0; y < n * 2 - 1; y++) {
    w = y < n ? y : n * 2 - y - 2;
    shape += Array(n - w).join(' ') + Array(w + 1).join('* ') + '*\n';
  }
  process.stdout.write(shape);

}

cetakPola(5);
