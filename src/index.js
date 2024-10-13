const html = require('nanohtml')
const morph = require('nanomorph')
const easeInOutCubic = require('eases/cubic-in-out')
const {
  // lerp,
  clamp01,
  inverseLerp,
  fract
} = require('canvas-sketch-util/math')
// tweenFunction.tweenName(currentTime, beginValue, endValue, totalDuration)

const START_SCENE = 0

const scenes = [introText, joinUs]

const div = render()
document.body.appendChild(div)

window.requestAnimationFrame(loop)

function loop () {
  window.requestAnimationFrame(loop)
  morph(div, render())
}

function renderScene (n, state) {
  const scene = scenes[n]
  if (!scene) return

  return scene(state)
}

function render () {
  const scroll = window.scrollY

  const sceneHeight = window.innerHeight * 2
  const scene = Math.floor(scroll / sceneHeight) + START_SCENE
  const progress = fract(scroll / sceneHeight)

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
      font-family: Roboto Flex, sans-serif;
      font-size: 12vw;
      font-style: normal;
      font-variation-settings: 'wdth' 25, 'wght' 500, 'GRAD' -100;
      font-weight: 900;
      line-height: 0.9;
      text-transform: uppercase;
      color: #000;
    "
      class="flex items-center justify-center"
    >
      ${renderDebug(state)} ${renderScene(scene, state)}
    </div>
  `

  return div
}

function renderDebug (state) {
  return html`
    <div
      style="position: fixed; top: 10px; left: 10px; color: #fff; font-size: 2vw; z-index: 1000"
    >
      ${state.scene}: ${state.progress.toFixed(2)}
    </div>
  `
}

function introText (state) {
  const { progress } = state

  // 0 is 0, 0.3 is 1, don't go over 1
  const pRotate = clamp01(inverseLerp(0, 0.3, progress))
  const rotate = easeInOutCubic(pRotate) * 180

  const pYPos = clamp01(inverseLerp(0.25, 1, progress))
  const yPos = easeInOutCubic(pYPos)

  const pScale = clamp01(inverseLerp(0.25, 1, progress))
  const scale = easeInOutCubic(1 - pScale)

  const pOpacity = clamp01(inverseLerp(0.25, 1, progress))
  const opacity = easeInOutCubic(1 - pOpacity)

  return html`
    <div
      style="
        transform: rotate(${rotate}deg) translateY(${yPos *
      75}vh) scale(${scale});
        opacity: ${opacity};
      "
    >
      <div style="">Fox is 4!</div>
      <div style="transform: rotate(180deg)">Lex is 2!</div>
    </div>
  `
}

function joinUs (state) {
  const { progress } = state

  const pXPos = progress
  const xPos = 150 - pXPos * 400

  const pOpacity = clamp01(inverseLerp(0.25, 0.4, progress))
  const opacity = easeInOutCubic(pOpacity)

  const pLight = pOpacity
  const light = easeInOutCubic(pLight)

  return html`
    <div
      style="
        height: 100vh;
        width: 100vw;
    "
    >
      
      <div
        style="
        background-image: url(/mj-1.png);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: ${opacity};
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      "
      ></div>
      <div
        style="
        white-space: nowrap;
        transform: translateX(${xPos}vw) translateY(45vh);
      "
      >
        <div style="color: hsl(0, 0%, ${light * 100}%)">Join us in the forest for...</div>
      </div>
    </div>
  `
}
