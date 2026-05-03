const http = require("http");

const host = "127.0.0.1";
const port = 3333;

function gerarNumero() {
  return Math.floor(Math.random() * 100);
}

function AvalieSorte(numero) {
  const num = 95;
  if (num === numero) {
    return "Parabéns";
  }
  return "Não foi dessa vez";
}

const server = http.createServer((req, res) => {
  const numero = gerarNumero();
  const resultado = AvalieSorte(numero);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(`Numero da sorte: ${numero}

                 Resultado: ${resultado}`);
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});