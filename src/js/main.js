const D = document;

const FARBA = {
  //lazy load для сторонних либ
  lazyLibraryLoad(scriptSrc, linkHref, callback) {
    let script;
    const domScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const domLink = document.querySelector(`link[href="${linkHref}"]`);

    if (!domScript) {
      script = document.createElement("script");
      script.src = scriptSrc;
      document.querySelector("#wrapper").after(script);
    }

    if (linkHref !== "" && !domLink) {
      let style = document.createElement("link");
      style.href = linkHref;
      style.rel = "stylesheet";
      document.querySelector("link").before(style);
    }

    if (!domScript) {
      script.onload = callback;
    } else {
      // domScript.onload = callback;
      callback();
    }
  },

  scroller(selector) {
    const link = D.querySelectorAll(selector);
    if (!link.length) return;

    link.forEach((el) => {
      const target = D.querySelector(el.dataset.target);
      if (target) {
        el.addEventListener("click", (e) => {
          e = e || window.event;
          e.preventDefault();
          // target.scrollIntoView({
          //   behavior: "smooth"
          // });
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          });
        });
      }
    });
  },
};

$(function() {
  $('select.mak-select').styler({
  });
});

window.addEventListener('resize', function() {
  if(document.querySelector('.ui-input-wrp')) {
    const element = document.querySelector('.ui-input-wrp');
    const widthElement = element.offsetWidth;
    const calendar = document.querySelector('.xdsoft_datepicker')

    calendar.style.width = widthElement + 'px'
  }
});

if(document.querySelector('.ui-date')) {
  const input = document.querySelector('.ui-date')

  input.addEventListener('click', () => {
    const element = document.querySelector('.ui-input-wrp');
    const widthElement = element.offsetWidth;
    const calendar = document.querySelector('.xdsoft_datepicker')

    calendar.style.width = widthElement + 'px'
  })
}

if(document.getElementById('phone')) {
  let inpTel = document.querySelectorAll('.phone');
  let mask;

  for(var i = 0; i < inpTel.length; i++) {
    inpTel[i].addEventListener('focus', function(){
      mask = IMask(this, {
          mask: '+375 (00) 000-00-00',
          overwrite: true,
          lazy: false,
          autofix: true
      });
    })
    inpTel[i].addEventListener('blur', function() {
      if(this.value.match('_')){
        mask.masked.reset()
      }
    })
  };
}

jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
}, "Поле может состоять из букв и пробелов, без цифр");

jQuery.validator.addMethod("phone", function (value, element) {
  if (value.startsWith('+375')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
  } else if (value.startsWith('+7')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
  } else {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
  }
}, "Введите полный номер");

$.validator.setDefaults({
 errorElement: "span",

  errorPlacement: function (error, element) {
    if (element.closest('ui-checkbox')) {
      element.closest('.ui-checkbox').append(error);
    }

    if (element.closest('.mak-field')) {
      element.closest('.mak-field').append(error);
    }
  }
});

//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Пожалуйста, заполните это поле",
  email: "Некорректный email адрес",
  url: "Некорректный URL",
  date: "Некорректный формат даты",
  number: "Только цифры",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});

$('select.mak-select').on('change', function() {
  setTimeout(function() {
    $('select.mak-select').trigger('refresh');
  }, 1)
});

// $('.mak-select[data-town="town"]').on('change', function() {
//   unDisabledFields()
// });

// function unDisabledFields() {
//   const selectRestaurant = document.querySelector('.mak-select[data-restaurant="restaurant"]')
//   const selectCalendar = document.querySelector('.ui-date[data-calendar="calendar"]')

//   selectRestaurant.disabled = false;
//   selectCalendar.disabled = false;

//   clearInputs(selectRestaurant, selectCalendar)
// }

// function clearInputs(selectRestaurant, selectCalendar) {
//   selectRestaurant.value = ''
//   selectCalendar.value = ''

//   selectRestaurant.classList.remove('valid')
//   selectCalendar.classList.remove('valid')
// }

$('input.custom-radio[type="radio"]').on('click', function(e) {
  const parent = e.target.closest('.mak-field')
  const textarea = parent.querySelector('textarea')
  const allTextarea = document.querySelectorAll('.ui-radio-list textarea.another')

  for(let i = 0; i < allTextarea.length; i++) {
    allTextarea[i].classList.remove('active')
  }

  if(textarea) {
    textarea.classList.remove('active');
    if(e.target.dataset.another === 'another') {
      textarea.classList.add('active')
    }
  }
});


$('input.ui-checkbox-input[type="checkbox"]').on('click', function(e) {
  const parent = e.target.closest('.mak-field')

  if(parent.querySelector('textarea')) {
    const textarea = parent.querySelector('textarea')

    if(e.target.dataset.another === 'another') {
      textarea.classList.toggle('active')
    }
  }
});

function checkInputValue(input) {
  const inputField = document.querySelectorAll(input);

  if(inputField.length) {
    for(let i = 0; i < inputField.length; i++) {
      inputField[i].addEventListener('keyup', (e) => {
        const target = e.target
        const parent = target.closest('.input-container')

        if(parent) {
          const btnClear = parent.querySelector('.btn-clear')

          if(inputField[i].value !== '') {
            btnClear.classList.add('active')

          } else {
            btnClear.classList.remove('active')
          }
        }
      })
    }
  }
}

$( document ).ready(function() {
  checkInputValue('.mak-field input')

  const radioBtn = document.querySelector('.select-btn')

  if(radioBtn) {
    radioBtn.addEventListener('change', (e) => {
      const select = document.querySelector('.mak-field.children')

      if(e.target.dataset.value === '2') {
        setTimeout(function() {
          $(' select').trigger('refresh');
      }, 1)

        select.classList.add('active')
      } else {
        select.classList.remove('active')
      }
    })
  }

  const btnClear = document.querySelectorAll('.btn-clear')

  if(btnClear.length) {
    btnClear.forEach(item =>{
      item.addEventListener('click', (e) => {
        e.preventDefault()

        const inputField = item.closest('.input-container').querySelector('.ui-input')

        inputField.value = ''
        inputField.classList.remove('valid')

        item.classList.remove('active')
      })
    })
  }

  const anchors = document.querySelectorAll('a.ui-btn')

  function blockTo(className) {
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()

        let arr = e.target.classList;
        let id = Array.from(arr).filter(word => word == className)

        if (id.length) {
          document.getElementById(id[0]).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    }
  }

  if (anchors.length) {
    blockTo("form-block")
  }

  // datetimepicker
  FARBA.lazyLibraryLoad(
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.css",
    () => {
      $(document).ready(function () {
        $("#datetimepicker").datetimepicker({
          // value:'12.03.2013',
          format: "d.m.Y",
          timepicker: false,
          scrollInput: false,
          // opened: true,
          closeOnDateSelect: true,
          lang: "ru",
          yearStart: 1940,
          yearEnd: new Date().getFullYear(),
          dayOfWeekStart: 1,
        });

        $.datetimepicker.setLocale("ru");
      });
    }
  );
});