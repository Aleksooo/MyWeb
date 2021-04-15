// Адаптивный размер окна
let div = document.getElementById('main-page')
const WIDTH = div.offsetWidth
const HEIGHT = div.offsetHeight

// Константы
const g = 3
const FPS = 60
const diameter = 60
const radius = diameter/2
const floorHeight = 20
const COLOR = (100, 200, 10)
const floorCOLOR = '#4682B4'
const FRICTION = 0.7

// Переменные
let acceleration = new p5.Vector(0, g)
let velocity = new p5.Vector(0, 0)
let pos = new p5.Vector(3*WIDTH/4, 0)
let newPos = new p5.Vector(0, 0)
let isFall = true
let isTrack = false

// Переменные для броска
let startDrag = false
let endDrag = false
let firstTouch = true
let alreadyThrown = false
const maxSpeed = 100
const throwForce = 70
let startPos = new p5.Vector(0, 0)
let endPos

// Настройка счетчика FPS
let count = 0
let allFPS = 0
const FPSmode = false

function setup() {
  // Создание области для рисование и задание ему свойств
  let can = createCanvas(WIDTH, HEIGHT)
  can.parent('main-page')
  can.addClass('ball-canvas')
  // Заданеи FPS
  //frameRate(FPS)
  // Задание шрифта
  textFont('Rubik')
}

function draw() {
  //background(color('#F0F8FF'))
  // Очистка экрана
  clear()

  // Проверка на нажатие мыши
  if (mouseIsPressed) {
    // Сохранение координат мыши
    mousePos = createVector(mouseX, mouseY)

    // Проверка: если нажали на мяч и он не летит
    if (pos.dist(mousePos) < radius && !alreadyThrown) {
      // Выключение падение, отслеживание позиции и начало броска
      isFall = false
      isTrack = true
      startDrag = true
    } else {
      // Если нажали не на мяч, то ничего не происходит
      isTrack = false
    }

    // Если мяч отслеживается
    if (isTrack) {
      // Обнуление скорости
      velocity = createVector(0, 0)
      // Позиция мяча равна позиции мыши
      newPos = mousePos

      // Если мыч пытается выйти на границы по оси X
      if (mousePos.x > WIDTH - radius) {
        newPos.x = WIDTH - radius
      } else if (mousePos.x < radius) {
        newPos.x = radius
      }

      // Если мыч пытается выйти на границы по оси Y
      if (mousePos.y > HEIGHT - radius - floorHeight) {
        newPos.y = HEIGHT - radius - floorHeight
      } else if (mousePos.y < radius) {
        newPos.y = radius
      }
    }

    // Если мышь не нажата, то мяч не летит и обнуляется бросок
  } else {
    alreadyThrown = false
    throwZero()
  }

  // Если мяч отслеживается
  if (startDrag) {
    // При первом косании фиксируется начальная позиция
    if (firstTouch) {
      startPos = mousePos
      firstTouch = false
    }
    // Если мышку увели достаточно далеко и мышка находится не на мяче
    if (startPos.dist(mousePos) >= maxSpeed && !isTrack){
      // Прикращается бросок и мяч летит
      startDrag = false
      endDrag = true
      alreadyThrown = true
    }
  }


  // Если прикратился бросок
  if (endDrag) {
    // Задаем скорость броска
    velocity = createVector(mousePos.x - startPos.x, mousePos.y - startPos.y).normalize().mult(throwForce)
    // Обнуляется бросок
    throwZero()
  }

  // Функция обнуление всех переменных для броска
  function throwZero() {
    startPos = createVector(0, 0)
    startDrag = false
    endDrag = false
    isFall = true
    isTrack = false
    firstTouch = true
  }

  // Если мяч падает
  if (isFall) {
    // Прибавляем к скорости ускорение, а скорость к координате
    velocity.add(acceleration)
    newPos = pos.add(velocity)

    // Если мыч пытается выйти на границы по оси X, то его скорость отражается
    if (newPos.x >= WIDTH - radius) {
      newPos.x = WIDTH - radius
      velocity.x = -velocity.x
      velocity.mult(FRICTION)
    } else if (newPos.x <= radius) {
      newPos.x = radius
      velocity.x = -velocity.x
      velocity.mult(FRICTION)
    }

    // Если мыч пытается выйти на границы по оси Y, то его скорость отражается
    if (newPos.y >= HEIGHT - radius - floorHeight) {
      newPos.y = HEIGHT - radius - floorHeight
      velocity.y = -velocity.y
      velocity.mult(FRICTION)
    } else if (newPos.y <= radius) {
      newPos.y = radius
      velocity.y = -velocity.y
      velocity.mult(FRICTION)
    }
  }
  // Мячу присваивается новая позиция
  pos = newPos

  // Отрисовка мяча
  fill(COLOR)
  circle(pos.x, pos.y, diameter)

  // Отриовка пола
  fill(color(floorCOLOR))
  noStroke()
  rect(0, HEIGHT - floorHeight, WIDTH, floorHeight, 10)

  // Отрисовка FPS
  if (FPSmode) {
    textSize(40)
    text(String(round(allFPS/count)), 20, 40)
    count++
    allFPS += frameRate()
  }

  // Отрисовка фразы "Брось меня!"
  textSize(40)
  fill(0)
  text('Брось Меня!', 3*WIDTH/4 + radius + 20,HEIGHT - floorHeight - radius - 20 )
}
