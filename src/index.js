const html = require('nanohtml')
const morph = require('nanomorph')
const eases = require('eases')
const {
  lerp,
  clamp,
  clamp01,
  inverseLerp,
  fract
} = require('canvas-sketch-util/math')

const START_SCROLL = 0

const div = render()
document.body.appendChild(div)

window.requestAnimationFrame(loop)

function loop () {
  window.requestAnimationFrame(loop)
  morph(div, render())
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
      font-size: ${vwToPx('12vw')};
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
  if (window.location.hostname !== 'localhost') return ''
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
  const { scroll } = state

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
        font-size: ${vwToPx(fontSize + 'vw')};
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
            Fox’s 4th
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
            Lex’s 2nd
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
  const { scroll } = state

  const scale = lerp(
    0.5,
    1,
    clamp01(eases.cubicInOut(inverseLerp(1500, 2700, scroll)))
  )

  const top = clamp(2800 - scroll, 0, -window.innerHeight / 2)

  const dateStart = new Date('2024-11-10T15:00:00')
  const dateEnd = new Date('2024-11-10T18:00:00')

  const directions =
    'Cedar Grove is a beautiful, shaded spot in Griffith Park, accessible by a short (but quite steep) hike.  Park on Farmouth Drive, walk through the gate at the end of the street, and haul up the hill for 3 out-of-breath minutes.  (You’ll want a carrier for small kids.)'

  const dressCode =
    'Dress code is "Forest Creature". We do not discriminate against forest creatures of any kind.  Ghosts live in forests, as do witches, Disney Princesses, dinosaurs, bunny rabbits, and Pokemons.'

  const whatToBring =
    'No presents, please!\nPicnic blanket, drinks, bag for dino eggs.\nWe will have light snacks.'

  const calDetails = [directions, dressCode, whatToBring].join('\n\n')

  const location = 'Cedar Grove near 3961 Farmouth Dr, Los Angeles, CA 90027'

  // 20231110T150000Z

  const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=Fox+and+Lex%27s+Birthday+Party&dates=${toGoogleDate(
    dateStart
  )}/${toGoogleDate(dateEnd)}&details=${encodeURIComponent(
    calDetails
  )}&location=${encodeURIComponent(location)}`

  const toQuestionEl = question => html`
    <div
      class="mb1"
      style="
      font-size: ${vwToPx('6vw')};
      color: white;
      text-shadow: 2px 2px 0px hotpink;
    "
    >
      ${question}
    </div>
  `

  const toAnswerEl = answer => html`
    <div style="font-size: ${vwToPx('5vw')}; line-height: ${vwToPx('7vw')};">${answer}</div>
  `

  const toSectionEl = (question, answer) => html`
    <div class="mt4">${toQuestionEl(question)} ${toAnswerEl(answer)}</div>
  `

  const toButtonEl = ({ text, href, glow = false }) => {
    const glowDuration = 2000
    const alpha = glow
      ? Math.sin((2 * Math.PI * Date.now()) / glowDuration) * 0.5 + 0.5
      : 0

    return html`
      <a
        href="${href}"
        target="_blank"
        style="
      font-size: ${vwToPx('6vw')};
      border: 1px solid black;
      padding: 10px 20px;
      border-radius: 5px;
      color: black;
      text-decoration: none;
      box-shadow: 2px 2px 0px black;
      background-color: rgba(255, 255, 255, ${alpha});
    "
      >
        ${text}
      </a>
    `
  }

  return html`
    <div
      style="
      position: absolute;
      z-index: 800;
      width: 100%;
      min-height: 100%;
      color: #000;
      top: ${top}px;
      transform: scale(${scale});
      display: flex;
      align-items: center;
      justify-content: center;
    "
      class="pa4"
    >
      <div>
        <div
          class="tc "
          style="
        font-size: ${vwToPx('15vw')};
        color: black;
        text-shadow: 2px 2px 0px hotpink;
      "
        >
          Fox and Lex
          <br />
          Birthday Party
        </div>

        ${toSectionEl(
          'When is it?',
          html`
            <div>
              Sunday, November 10th
              <br />
              3:00 PM - 6:00 PM
              <br />
              <a
                href="${calendarLink}"
                target="_blank"
                style="color: black; text-decoration: underline;"
              >
                Add to Calendar
              </a>
            </div>
          `
        )}
        ${toSectionEl(
          'Where is it?',
          html`
            <div>
              <div>Cedar Grove</div>
              <a
                style="color: black; text-decoration: underline;"
                href="https://maps.app.goo.gl/WXPLY8jVwcY73REG6"
                target="_blank"
                >View Map</a
              >
            </div>
            >
          `
        )}
        ${toSectionEl(
          'What is the dress code?',
          html` <div>Forest Creature*</div> `
        )}
        ${toSectionEl(
          'What will we do?',
          html`
            <div>
              Dinosaur-egg hunt
              <br />
              Toddler-friendly “hike”
              <br />
              Roly-poly hunt
            </div>
          `
        )}
        ${toSectionEl(
          'What should I bring?',
          html`
            <div>Picnic blanket, drinks, bag for dinosaur eggs.</div>
            <div>We will have light snacks.</div>
            <div>No presents, please!</div>
          `
        )}
        ${toSectionEl(
          'Can you make it?',
          html`
            <div
              class="mt4"
              style="
            display: flex;
            justify-content: space-around;
          "
            >
              ${toButtonEl({
                text: 'Yes',
                href: 'https://forms.gle/rLKDap14wptug6te8',
                glow: true
              })}
              ${toButtonEl({
                text: 'No',
                href: 'https://forms.gle/rLKDap14wptug6te8'
              })}
            </div>
          `
        )}

        <div class="mt4" style="font-size: ${vwToPx('3vw')}; line-height: ${vwToPx('4vw')};">
          *We do not discriminate against forest creatures of any kind. Ghosts
          live in forests, as do witches, Disney Princesses, dinosaurs, bunny
          rabbits, and Pokemons.
        </div>
      </div>
    </div>
  `
}

function toGoogleDate (date) {
  return new Date(date).toISOString().split('.')[0].replace(/\W*/g, '') + 'Z'
}

function vwToPx (vwString) {
  const vwValue = parseFloat(vwString)
  const width = Math.min(window.outerWidth, 430)
  return (vwValue / 100 * width) + 'px'
}
