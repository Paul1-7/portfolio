export class JSValidator {
  status = false
  sent = false
  errors = []
  via = 'http'
  submittedCallback = null

  validators = {
    minLength: 3,
    maxLangth: 255
  }

  msg = {
    required: `this field is required.`,
    minLength: `invalid length. Min __minLength__ characters.`,
    maxLength: `invalid length. Max __maxLength__ characters.`,
    email: `email field is not valid`,
    alphanumeric: `Only be allowed letters and numbers without space`
  }

  constructor(formId, submittedCallback = null) {
    this.setForm(formId)
    this.submittedCallback = submittedCallback
    this.setInputs()
  }

  setSubmittedCallback(callback) {
    this.submittedCallback = callback
  }

  setForm(formId) {
    this.form = document.querySelector(formId)
  }

  setInputs() {
    this.inputs = document.querySelectorAll(`#${this.form.id} .jsValidator`)
  }

  setAjax() {
    this.via = 'ajax'

    return this
  }

  setHttp() {
    this.via = 'http'
    return this
  }

  wasSent() {
    return this.sent
  }

  validateForm() {
    this.form.addEventListener('submit', (e) => {
      // Reiniciar los errores y cambiar status a true
      this.resetValidation()

      // Recorrer cada uno de los inputs
      this.inputs.forEach((input) => {
        // Validar cada input
        this.validateInput(input)
      })

      if (!this.status) {
        // Prevenir el envio del formulario
        e.preventDefault()
      } else {
        // Evaluar si se debe enviar por ajax o http
        if (this.via == 'ajax') {
          e.preventDefault()

          this.submitHandler()
        } else {
          // Solo para fines demostrativos.
          this.form.submit()

          console.log('Se ha enviado con el navegador')
        }
        e.target.reset()
      }
    })
  }

  validateInputs() {
    this.inputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        this.resetValidation()

        this.validateInput(input)
      })
    })
  }

  validateInput(input) {
    let validators = input.dataset.validators

    if (validators !== undefined) {
      validators = validators.split(' ')

      validators.forEach((validator) => {
        /*
					Si el validador es required =>  su método de validación sería: _required(input)
					Si el validador es length =>  su método de validación sería: _length(input)
		
				*/

        this[`_${validator}`](input)
      })
    }
  }

  setError(input, msg) {
    // Cambiando el valor de estatus
    this.status = false

    this.setStackError(input, msg)

    this.setErrorMessage(input, msg)
  }

  setStackError(input, msg) {
    // Añadir el error a nuestro stack de errores
    this.errors.push({ input: input, msg: msg })
  }

  setErrorMessage(input, msg) {
    // Adjuntando el error
    const parent = input.parentNode
    const span = parent.lastElementChild
    span.innerHTML += msg + '<br />'
  }

  resetValidation() {
    // Cambiando el valor de estatus
    this.status = true

    this.resetStackError()

    this.resetErrorMessages()
  }

  resetStackError() {
    // Pila de errores
    this.errors = []
  }

  resetErrorMessages() {
    // Quitar mensajes de error
    let spans = document.querySelectorAll(`#${this.form.id} .error-msg`)

    spans.forEach((span) => {
      span.innerHTML = ''
    })
  }

  submitHandler() {
    const data = Array.from(new FormData(this.form))
    const dataParsed = Object.fromEntries(data)
    fetch(this.form.action, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: this.form.method,
      body: JSON.stringify(dataParsed)
    })
      .then((response) => {
        this.sent = true
        if (this.submittedCallback) this.submittedCallback()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  init() {
    this.validateForm()
    this.validateInputs()
    return this
  }
}

/**
 * Este método permite añadir errores a partir de un objeto externo
 * en este caso el objeto de errores es el que es devuelto por Laravel
 */
JSValidator.prototype.appendExternalErrors = function (errors) {
  Object.entries(errors).forEach(([key, value]) => {
    let input = document.querySelector(`#${this.form.id}  input[name=${key}]`)

    // Recuperar el nodo de span de error
    let span = input.nextElementSibling
    value.forEach((val) => {
      span.innerHTML += val + '<br />'
    })
  })
}

JSValidator.prototype._required = function (input) {
  let value = input.value
  let msg = this.msg.required
  if (value.trim() === '' || value.length < 1) {
    this.setError(input, msg)
  }
}

JSValidator.prototype._length = function (input) {
  // En primer lugar vamos a recuperar el valor del input
  let value = input.value // Determinar la longitud del input
  let inputLength = value.length // Definir minLength
  let minLength =
    input.dataset.min_length !== undefined
      ? Number(input.dataset.min_length)
      : this.validators.minLength // Definir maxLength
  let maxLength =
    input.dataset.max_length !== undefined
      ? Number(input.dataset.max_length)
      : this.validators.maxLength // Declarar la variable msg
  let msg // Verificar min length

  if (inputLength < minLength) {
    ;(msg = `Longitud no válida. Mínimo ${minLength} caracteres`),
      this.setError(input, msg)
  } // Verificar max length

  if (inputLength > maxLength) {
    ;(msg = `Longitud no válida. Máximo ${maxLength} caracteres`),
      this.setError(input, msg)
  }
}

JSValidator.prototype._email = function (input) {
  let value = input.value
  let msg = this.msg.email
  let pattern = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  )

  if (!pattern.test(value) && value.trim() != '') {
    this.setError(input, msg)
  }
}

JSValidator.prototype._integer = function (input) {
  let value = input.value
  let msg = this.msg.integer
  let pattern = new RegExp(/^[0-9]+$/)

  if (!pattern.test(value) && value.trim() !== '') {
    this.setError(input, msg)
  }
}

JSValidator.prototype._alphanumeric = function (input) {
  let value = input.value

  let msg = this.msg.alphanumeric

  let pattern = new RegExp(/^[a-zA-Z0-9]+$/)

  if (!pattern.test(value) && value.trim() !== '') {
    this.setError(input, msg)
  }
}
