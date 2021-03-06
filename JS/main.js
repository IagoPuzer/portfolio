//========MENU EXPANDED========
function openMenu(){
    document.body.classList.add('menu-expanded')
}

function closeMenu(){ 
    document.body.classList.remove('menu-expanded')
}


//=======VALIDATION FORM========
const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "*Por favor, informe seu nome"
            },
            email: {
                valueMissing: "*Campo de email obrigatório",
                typeMismatch: "*Preencha com um email válido"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")
        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for( field of fields ){
    field.addEventListener("invalid", event => { 
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}




//=========BACK TO TOP BUTTON===========

backToTop = document.querySelector ('#backTop')

window.onscroll = function(){
    scrollFunction()
}

function scrollFunction(){
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        backToTop.style.display = "block"
    }else {
        backToTop.style.display = "none"
    }
}

function topFunction (){// funcionalidade do botão para rolar até o topo
    
    document.body.scrollTop = 0; // para navegador Safari
    document.documentElement.scrollTop = 0; // para o Chrome, Firefox, Internet Explores e Opera
} 
