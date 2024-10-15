const html = require('nanohtml')
const morph = require('nanomorph')
const eases = require('eases')
const { lerp, clamp01, inverseLerp, fract } = require('canvas-sketch-util/math')

const START_SCROLL = 0

const scenes = [introText, details]

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
  // const scroll = window.scrollY
  const scroll = START_SCROLL + window.scrollY

  const sceneHeight = window.innerHeight * 4
  const scene = 0 // Math.floor(scroll / sceneHeight) + START_SCENE
  const progress = fract(scroll / sceneHeight)

  const state = {
    scroll,
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
      ${renderDebug(state)} ${introText(state)} ${details(state)}
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
      <br />
      ${window.scrollY}
      <br />
      ${window.innerWidth} x ${window.innerHeight}
    </div>
  `
}

function introText (state) {
  const { progress, scroll } = state

  const yPos = clamp01(inverseLerp(0, 600, scroll))

  const imgSize = clamp01(eases.cubicInOut(inverseLerp(0, 1200, scroll)))

  const fontSize = lerp(
    25,
    20,
    clamp01(eases.cubicInOut(inverseLerp(0, 600, scroll)))
  )

  const opacity = lerp(
    1,
    0.5,
    clamp01(eases.cubicInOut(inverseLerp(300, 900, scroll)))
  )

  const xPos = lerp(
    100,
    0,
    clamp01(eases.cubicInOut(inverseLerp(900, 1200, scroll)))
  )

  const andOpacity = clamp01(eases.cubicInOut(inverseLerp(700, 1200, scroll)))

  const yPosFull = clamp01(inverseLerp(1200, 2700, scroll))

  return html`
    <div
      style="
        position: relative;
        z-index: 900;
        width: 100%;
        height: 100%;
        background-color: #000;
        top: ${-yPosFull * 100}%;
        // box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, 0.8);
      "
    >
      <div
        style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(/d-1.webp);
        background-position: 50% ${yPosFull * 100}%;
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
            Join Us
            <br />
            in the
            <br />
            Forest
            <br />
            <span
              style="
            font-size: 0.5em;
            opacity: ${andOpacity};
            "
            >
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
          <div
            style="
            color: hsl(0, 0%, 100%);
            font-size: 0.5em;
            line-height: 2em;
            text-shadow: 2px 2px 0px black;
            opacity: ${andOpacity};
            "
          >
            &
          </div>
          <div
            style="
            transform: translateX(${-xPos}vw);
          "
          >
            Lex's 2nd
          </div>
          <div
            style="
            padding-top: 0.5em;
            opacity: ${andOpacity};
          "
          >
            Birthday Party
          </div>
        </div>
      </div>
    </div>
  `
}

function details (state) {
  const { progress } = state

  const scale = clamp01(eases.cubicInOut(inverseLerp(0, 0.2, progress)))

  return html`
    <div style=
    "
      position: absolute;
      z-index: 800;
      width: 100%;
      height: 100%;
      color: #000;
      top: 0;  
    "
    class="pa4"
    >
      <div class='tc pt2' style='
        font-size: 15vw;
        color: black;
        text-shadow: 2px 2px 0px hotpink;
      '>
        Fox and Lex's
        <br />
        Birthday Party
      </div>
      <div class='mt4'>
        <div class='mb3' style='
          font-size: 6vw;
          color: white;
          text-shadow: 2px 2px 0px hotpink;
        '>When is it?</div>
        <div style='font-size: 6vw;'>
          Sunday, November 10th
          <br />
          3:00 PM - 6:00 PM
        </div>
      </div>
      <div class='mt4'>
        <div class='mb3' style='
          font-size: 6vw;
          color: white;
          text-shadow: 2px 2px 0px hotpink;
        '>Where is it?</div>
        <div style='font-size: 6vw;'>
          <a style='color: black; text-decoration: underline;' href='https://maps.app.goo.gl/3961FarmouthSt' target='_blank'>Cedar Grove</a>
        </div>
      </div>
      <div class='mt4'>
        <div class='mb3' style='
          font-size: 6vw;
          color: white;
          text-shadow: 2px 2px 0px hotpink;
        '>What is the dress code?</div>
        <div style='font-size: 6vw;'>
          Forest Creature
        </div>
      </div>
      <div class='mt4'>
        <div class='mb3' style='
          font-size: 6vw;
          color: white;
          text-shadow: 2px 2px 0px hotpink;
        '>What should I bring?</div>
        <div style='font-size: 6vw;'>
          <p>Picnic blanket, drinks, bag for dino eggs.</p>
          <p>We will have light snacks.</p>
        </div>
      </div>
    </div>
  `
}
