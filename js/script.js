function login(event) {
  event.preventDefault();
  const user = document.getElementById('usuario').value;
  const pass = document.getElementById('senha').value;

  if (user === 'admin' && pass === 'admin') {
    window.location.href = 'index.html';
  } else {
    alert('Usuário ou senha incorretos!');
  }
}