function getReference() {
  return new Map([
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ])
}

function validateRoman(romanAlgarism) {
  let isValid = true
  const reference = getReference()
  const repeat3 = ["I", "X", "C", "M"] //As letras I X C M podem se repetir 3 vezes
  const repeat1 = ["V", "L", "D"] // /As letras V L D não pode repetir

  // Verifica se todos os algarismos são um algarismo romano
  for (algarism of romanAlgarism) {
    if (!algarism.match('[IVXLCDM]')) isValid = false
  }

  const caracterArray = romanAlgarism.split("")
  // Verifica se existe a repetição de acordo com as regras
  for (char of repeat3) if (caracterArray.filter((c) => c === char).length > 3) isValid = false
  for (char of repeat1) if (caracterArray.filter((c) => c === char).length > 1) isValid = false

  // Cria um array a partir da string, utilizando uma regex para juntar os algarismos com 2 caracteres
  const regex = /IV|IX|XL|XC|CD|CM|./g
  const romanAlgarismArray = romanAlgarism.match(regex)

  // Um algarismo romano não pode ser maior que o próximo e se tive 2 numeros, não pode ser da mesma casa decimal
  for (let i = 0; i < romanAlgarismArray.length - 1; i++) {
    if (romanAlgarismArray[i].length == 2) {
      if (reference.get(romanAlgarismArray[i]) < reference.get(romanAlgarismArray[i + 1])) isValid = false
      else if (reference.get(romanAlgarismArray[i]).toString().length == reference.get(romanAlgarismArray[i + 1]).toString().length) isValid = false
    } else if (reference.get(romanAlgarismArray[i]) < reference.get(romanAlgarismArray[i + 1])) isValid = false
  }

  return isValid
}

function romanToDecimal(romanAlgarism) {
  const reference = getReference()

  // Retorna caso o valor não seja uma string ou seja vazio
  if (romanAlgarism == '' || typeof romanAlgarism !== 'string' || romanAlgarism == undefined) return ""

  // Valida se os digitos são válidos
  if (!validateRoman(romanAlgarism)) return "Digitos Invalidos"

  // Variavel que será retornada
  let finalValue = 0

  reference.forEach((value, key) => {
    while (romanAlgarism.indexOf(key) === 0) {
      finalValue += value
      romanAlgarism = romanAlgarism.replace(key, '');
    }
  })

  return finalValue
}

function decimalToRoman(decimalNumber) {

  const reference = getReference()

  if (decimalNumber === '') return ""
  if (decimalNumber == 0 || Number.isInteger(decimalNumber) || decimalNumber == undefined) return "Digitos Invalidos"

  finalValue = ''

  reference.forEach((value, key) => {
    while (decimalNumber >= value) {
      finalValue += key
      decimalNumber -= value
    }
  })

  return finalValue
}

function handleRomanConversion(e) {
  let decimal = document.getElementById("inputDecimal")
  decimal.value = romanToDecimal(e.target.value.toUpperCase())
}

function handleDecimalConversion(e) {
  let roman = document.getElementById("inputRomano")
  roman.value = decimalToRoman(e.target.value)
}