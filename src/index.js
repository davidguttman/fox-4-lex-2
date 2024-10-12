var html = require('nanohtml')

var div = html`
  <div
    style="
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #fcd8da;
      color: #fff;
    "
    class="flex items-center justify-center sans-serif"
  >
    <div>
      <h1 class="f-headline lh-solid">Fox is turning 4!</h1>
      <h1 class="f-headline lh-solid">Lex is turning 2!</h1>
    </div>
  </div>
`

console.log(div)

document.body.appendChild(div)
