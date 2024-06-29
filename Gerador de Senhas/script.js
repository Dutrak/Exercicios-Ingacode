function generatePassword(length, pattern, regexPattern, containsEmoji) {
  let password = ''
  const regex = new RegExp(regexPattern)
  let emojiNumber = 0
  let emojis = getEmojis()

  if (containsEmoji) {
    emojiNumber = Math.floor(Math.random() * ((length / 2) - 1) + 1) // o numero de emojis é sempre o tamanho/2
  }

  console.log(emojiNumber)

  while (!regex.test(password)) {
    password = ''
    for (let i = 0; i < (length - emojiNumber); i++) {
      let char = Math.floor(Math.random() * pattern.length)
      password += pattern.charAt(char)
    }
  }

  if (containsEmoji) {
    let passwordArray = password.split('')
    for (i = 0; i < emojiNumber; i++) {
      let emojiAddPos = Math.floor(Math.random() * passwordArray.length)
      let emojisPos = Math.floor(Math.random() * emojis.length)
      passwordArray.splice(emojiAddPos, 0, emojis[emojisPos])
    }
    return passwordArray.join('')
  }

  return password
}

function setPasswordStrenght(password, containsEmoji) {
  if (password.length < 16) return {
    passwordStrenght: 'Sua senha é fraca, tente colocar mais caracteres',
    color: 'red'
  }

  if (password.length >= 32) return {
    passwordStrenght: 'Sua senha é forte, parabéns!!',
    color: 'green'
  }

  if (containsEmoji) return {
    passwordStrenght: 'Sua senha é forte, continue utilizando mais emojis!!',
    color: 'green'
  }

  if (password.match('[0-9]')) {
    if (password.match('[@!#$%^&]')) return {
      passwordStrenght: 'Sua senha é forte, parabéns!!',
      color: 'green'
    }

    if (password.match('[A-Za-z]')) return {
      passwordStrenght: 'Sua senha é médiana, procure incluir caracteres especiais ou aumentar o numero de caracteres',
      color: 'yellow'
    }

    return {
      passwordStrenght: 'Sua senha é fraca, tente colocar letras e caracteres especiais',
      color: 'red'
    }
  }

  if (password.match('[@!#$%^&]')) return {
    passwordStrenght: 'Sua senha é forte, parabéns!!',
    color: 'green'
  }

  if (password.match('[A-Za-z]')) return {
    passwordStrenght: 'Sua senha é médiana, procure incluir caracteres especiais ou aumentar o numero de caracteres',
    color: 'yellow'
  }
}

function validatePassword(password, regexPattern) {
  const regex = new RegExp(regexPattern)
  return regex.test(password)
}

function handleFormSubmit(e) {
  e.preventDefault()

  let passwordPattern = ''
  let regexPattern = ''
  let password = ''
  let containsEmoji = false

  const passwordLength = document.getElementById("length").value
  const checkboxUppercase = document.getElementById("uppercase")
  const checkboxLowercase = document.getElementById("lowercase")
  const checkboxNumbers = document.getElementById("numbers")
  const checkboxSymbols = document.getElementById("symbols")
  const checkboxEmojis = document.getElementById("emojis")

  if (!passwordLength) return

  if (checkboxUppercase.checked) {
    passwordPattern += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    regexPattern = '(?=.*[A-Z])'
  }
  if (checkboxLowercase.checked) {
    passwordPattern += "abcdefghijklmnopqrstuvwxyz"
    regexPattern = '(?=.*[a-z])'
  }

  if (checkboxNumbers.checked) {
    passwordPattern += '0123456789'
    regexPattern = '(?=.*[0-9])'
  }
  if (checkboxSymbols.checked) {
    passwordPattern += '@!#$%^&'
    regexPattern = '(?=.*[@!#$%^&])'
  }

  if (checkboxEmojis.checked) containsEmoji = true

  if (!passwordPattern) password = ''
  else password = generatePassword(passwordLength, passwordPattern, regexPattern, containsEmoji)

  const { passwordStrenght, color } = setPasswordStrenght(password, containsEmoji)

  document.getElementById("result").innerHTML = password
  document.getElementById("strength").innerHTML = passwordStrenght
  document.getElementById("strength").setAttribute("style", `color: ${color}`)
  document.querySelector('.final-result-container').setAttribute("style", "display: flex")
}

async function handleCopyClipboard(e) {
  e.preventDefault()

  const result = document.getElementById("result")

  try {
    await navigator.clipboard.writeText(result.innerHTML)
    alert("Senha copiada com sucesso")
  } catch (e) {
    console.log(e)
    alert("Não foi possivel copiar a senha")
  }
}

function getEmojis() {
  return ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐️', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '😮‍', '💨', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '😶‍']
}