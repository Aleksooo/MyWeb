window.onload = function () {
  // Находит элемент "Меню кнопка", на который нажимают
  let menuImg = document.getElementById('menu-img')
  let menuButtons = document.getElementById('menu-buttons')

  // Если нажали на кнопку меню
  menuImg.onclick = function() {
    menuImg.classList.toggle('menu-img-rotate')
    menuButtons.classList.toggle('menu-buttons-off')
  }
  // Находит элемент "Стрелочка", на который нажимают
  let arrow = document.getElementById('first-arrow')

  // Если нажали на стрелку
  arrow.onclick = function() {
    let articleTitle = document.getElementById('first-article-title')
    let articleText = document.getElementById('first-article-text')

    articleText.classList.toggle('article-text-off')
    articleText.classList.toggle('article-text-on')

    articleTitle.classList.toggle('article-title-off')
    articleTitle.classList.toggle('article-title-on')


    arrow.classList.toggle('arrow-rotate')
  }
}
