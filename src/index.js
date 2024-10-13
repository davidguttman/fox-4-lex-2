const html = require('nanohtml')
const morph = require('nanomorph')
const { easeInOutCubic } = require('tween-functions')
// tweenFunction.tweenName(currentTime, beginValue, endValue, totalDuration)

const div = render()
document.body.appendChild(div)

window.requestAnimationFrame(loop)

function loop () {
  window.requestAnimationFrame(loop)
  morph(div, render())
}

function render () {
  const scroll = window.scrollY

  const sceneHeight = window.innerHeight * 2
  const scene = Math.floor(scroll / sceneHeight)
  const progress = scroll % sceneHeight / sceneHeight

  const state = {
    scene,
    progress
  }

  const div = html`
    <div
      style="
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #fcd8da;
      color: #fff;
      overflow: hidden;
    "
      class="flex items-center justify-center"
    >
      ${renderIntroText(state)}
    </div>
  `

  return div
}

function renderIntroText (state) {
  if (state.scene !== 0) return null
  const { progress } = state

  const rotate = progress < 0.5
    ? easeInOutCubic(progress, 0, 180, 0.5)
    : 180

  const yPos = progress > 0.3
    ? easeInOutCubic(progress - 0.3, 0, -1, 0.3)
    : 0

  return html`
    <div
      style="
        font-family: Roboto Flex, sans-serif;
        font-size: 14vw;
        font-style: normal;
        font-variation-settings: 'wdth' 25, 'wght' 500, 'GRAD' -100;
        font-weight: 900;
        line-height: 0.9;
        text-transform: uppercase;
        color: #000;
        transform: rotate(${rotate}deg) translateY(${yPos * 100}vh);
      "
    >
      <div style="">Fox is turning 4!</div>
      <div style="transform: rotate(180deg)">Lex is turning 2!</div>
    </div>
  `
}
