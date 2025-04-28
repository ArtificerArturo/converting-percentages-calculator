function convertPercentToDecimal() {
   const percentInput = document.querySelector("#percentAsDecimal #percentInput")
   const backgroundElement = document.querySelector("#percentAsDecimal .background")

   let percent = parseFloat(percentInput.value)
   let result = 0

   if (document.querySelector("#percentAsDecimal .result")) {
      document.querySelector("#percentAsDecimal .result").remove()
   }

   if (isNaN(percent)) return

   result = percent / 100

   let resultElement = document.createElement("div")
   resultElement.setAttribute("class", "result")

   if (isNaN(result)) {
      resultElement.innerHTML = `Answer: <strong>Undefined</strong>.`
   } else {
      resultElement.innerHTML = `Answer: ${resultConditioner(percent)}% is equal to <strong>${resultConditioner(
         result
      )}</strong>.`
   }
   backgroundElement.appendChild(resultElement)
}

function convertDecimalToPercent() {
   const wholeInput = document.querySelector("#decimalAsPercent #wholeInput")
   const decimalInput = document.querySelector("#decimalAsPercent #decimalInput")
   const backgroundElement = document.querySelector("#decimalAsPercent .background")

   let whole = wholeInput.value
   let decimal = decimalInput.value
   let result = 0

   if (document.querySelector("#decimalAsPercent .result")) {
      document.querySelector("#decimalAsPercent .result").remove()
   }

   if (whole == "" && decimal == "") return

   let completeDecimal = whole.concat(".", decimal)
   result = parseFloat(completeDecimal) * 100

   let resultElement = document.createElement("div")
   resultElement.setAttribute("class", "result")

   if (isNaN(result)) {
      resultElement.innerHTML = `Answer: <strong>Undefined</strong>.`
   } else {
      resultElement.innerHTML = `Answer: ${resultConditioner(
         parseFloat(completeDecimal)
      )} is equal to <strong>${resultConditioner(result)}</strong>%.`
   }
   backgroundElement.appendChild(resultElement)
}

function convertPercentToFraction() {
   const percentInput = document.querySelector("#percentAsFraction #percentInput")
   const backgroundElement = document.querySelector("#percentAsFraction .background")

   let percent = parseFloat(percentInput.value)
   let result = 0
   let resultSign = ""
   let resultMathML = ""

   if (document.querySelector("#percentAsFraction .result")) {
      document.querySelector("#percentAsFraction .result").remove()
   }

   if (isNaN(percent)) return

   result = math.fraction(percent / 100)

   let resultElement = document.createElement("div")
   resultElement.setAttribute("class", "result")

   if (result.s == -1) resultSign = `<mo>-</mo>`
   else resultSign = ""
   if (result.n == 0) {
      resultMathML = `<mn>0</mn>`
   } else if (result.n == 1 && result.d == 1) {
      resultMathML = `<mn>1</mn>`
   } else {
      resultMathML = `<mfrac><mn>${resultSign}${result.n}</mn><mn>${result.d}</mn></mfrac>`
   }

   if (isNaN(result)) {
      resultElement.innerHTML = `Answer: <strong>Undefined</strong>.`
   } else {
      resultElement.innerHTML = `Answer: ${resultConditioner(
         percent
      )}% is equal to <strong><math>${resultMathML}</math></strong>.`
   }
   backgroundElement.appendChild(resultElement)
   MathJax.typesetPromise()
}

function convertFractionToPercent() {
   const numeratorInput = document.querySelector("#fractionAsPercent #numerator")
   const denominatorInput = document.querySelector("#fractionAsPercent #denominator")
   const backgroundElement = document.querySelector("#fractionAsPercent .background")

   let numerator = numeratorInput.value
   let denominator = denominatorInput.value

   if (document.querySelector("#fractionAsPercent .result")) {
      document.querySelector("#fractionAsPercent .result").remove()
   }

   if (denominator == "" || isNaN(denominator) || numerator == "" || isNaN(numerator)) return

   let resultElement = document.createElement("div")
   resultElement.setAttribute("class", "result")

   if (!Number.isInteger(parseFloat(numerator)) || !Number.isInteger(parseFloat(denominator))) {
      resultElement.innerHTML = "Please enter whole numbers only."
      resultElement.style.color = "red"
      backgroundElement.appendChild(resultElement)
      return
   }
   if (denominator == 0) {
      resultElement.innerHTML = "Please use a non-zero denominator."
      resultElement.style.color = "red"
      backgroundElement.appendChild(resultElement)
      return
   }

   let fraction = math.fraction(numerator, denominator)
   let result = math.number(fraction) * 100

   if (isNaN(result)) {
      resultElement.innerHTML = `Answer: <strong>Undefined</strong>.`
   } else {
      resultElement.innerHTML = `Answer: <math><mfrac><mn>${resultConditioner(
         parseFloat(numerator)
      )}</mn><mn>${resultConditioner(
         parseFloat(denominator)
      )}</mn></mfrac></math> is equal to <strong>${resultConditioner(result)}%</strong>.`
   }
   resultElement.style.color = "black"
   backgroundElement.appendChild(resultElement)
   MathJax.typesetPromise()
}

function resultConditioner(number) {
   //Intelligent rounding. Results with only decimal component need sig figs,
   //results greater than 1 do not
   if (number < 1 && number > -1) {
      number = numberWithCommas(+number.toPrecision(2))
   } else {
      number = numberWithCommas(+number.toFixed(2))
   }
   return number
}

function numberWithCommas(number) {
   //taken from SO. Worked better than .toLocaleString()
   return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}
