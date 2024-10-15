const html = require('nanohtml')
const morph = require('nanomorph')
const eases = require('eases')
const { lerp, clamp01, inverseLerp, fract } = require('canvas-sketch-util/math')

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

  const sceneHeight = window.innerHeight * 4
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
      // text-transform: uppercase;
      color: #000;
    "
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

  const yPos = clamp01(eases.cubicInOut(inverseLerp(0, 0.2, progress)))

  const imgSize = clamp01(eases.cubicInOut(inverseLerp(0, 0.4, progress)))

  const fontSize = lerp(
    25,
    20,
    clamp01(eases.cubicInOut(inverseLerp(0, 0.2, progress)))
  )

  const opacity = lerp(
    1,
    0.5,
    clamp01(eases.cubicInOut(inverseLerp(0.1, 0.3, progress)))
  )

  const xPos = lerp(
    100,
    0,
    clamp01(eases.cubicInOut(inverseLerp(0.3, 0.4, progress)))
  )

  const andOpacity = clamp01(eases.cubicInOut(inverseLerp(0.35, 0.4, progress)))

  return html`
    <div
      style="position: relative; width: 100%; height: 100%; background-color: #000"
    >
      <div
        style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(/d-1.webp);
        background-position: 50% ${yPos * 100}%;
        background-repeat: no-repeat;
        background-size: auto ${100 + (1 - imgSize) * 100}%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        opacity: ${opacity};
        "
      ></div>
      <div
        style="
        position: absolute;
        top: ${75 - yPos * 75}vh;
        color: hsl(0, 0%, 100%);
        text-shadow: 2px 2px 0px black;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: ${fontSize}vw;
        text-align: center;
        "
      >
        <div>
          <div class="pt2">
            Join us
            <br />
            in the
            <br />
            forest
            <br />
            <span style="
            font-size: 0.5em;
            opacity: ${andOpacity};
            ">
            for
            </span>
          </div>
        </div>
        <div class="pt4">
          <div
            style="
            transform: translateX(${xPos}vw);
          "
          >
            Fox's 4th
          </div>
          <div style="
            color: hsl(0, 0%, 100%);
            font-size: 0.5em;
            line-height: 2em;
            text-shadow: 2px 2px 0px black;
            opacity: ${andOpacity};
            ">
            &
          </div>
          <div
            style="
            transform: translateX(${-xPos}vw);
          "
          >
            Lex's 2nd
          </div>
          <div style="
            padding-top: 0.5em;
            opacity: ${andOpacity};
          ">
            Birthday Party
          </div>
        </div>
      </div>
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
        <div style="color: hsl(0, 0%, ${light * 100}%)">Fox's 4th</div>
      </div>
    </div>
  `
}
