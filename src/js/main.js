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
  $('select.mak-select, input.custom-radio[type="radio"], input.ui-checkbox[type="checkbox"]').styler({
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
  let phone = document.getElementById('phone')

  let phoneMask = IMask(phone, {
    mask: [
      {
        mask: '+{375} (00) 000 00 00',
        startsWith: '375',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '0000000000000',
        startsWith: '',
        country: 'unknown'
      }
    ],

    dispatch: function (appended, dynamicMasked) {
      var number = (dynamicMasked.value + appended).replace(/\D/g, '');

      return dynamicMasked.compiledMasks.find(function (m) {
        return number.indexOf(m.startsWith) === 0;
      });
    }
  })
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

$.validator.messages.required = 'Пожалуйста, заполните это поле';

$.validator.setDefaults({
  errorPlacement: function (error, element) {
    if (element.hasClass('ui-checkbox-input')) {
      element.closest('.ui-checkbox').append(error);
    }
    if (element.hasClass('mak-select')) {
      element.closest('.jq-selectbox').after(error);
    }
    if (element.hasClass('ui-checkbox')) {
      element.closest('.ui-checkbox-container').append(error);
    }
    if (element.hasClass('ui-date')) {
      element.closest('.ui-input-wrp').after(error);
    }
    if (element.hasClass('custom-radio')) {
      element.closest('.ui-radio-list').closest('.mak-field').append(error);
    }
    if (element.hasClass('ui-textarea')) {
      element.closest('.ui-textarea').after(error);
    }
    if (element.hasClass('ui-checkbox')) {
      element.closest('.ui-checkbox-list').append(error);
    }
    if (element.hasClass('ui-input')) {
      element.closest('.mak-field').append(error);
    }
  }
});

$('select.mak-select').on('change', function() {
  setTimeout(function() {
    $('select.mak-select').trigger('refresh');
  }, 1)
});

$('input.custom-radio[type="radio"]').on('change', function(e) {
  console.log(e.target.checked)
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

  $(".form-survey").validate();

  setTimeout(function() {
    $('input.custom-radio[type="radio"]').trigger('refresh');
  }, 1)
});

$('input.ui-checkbox[type="checkbox"]').on('change', function(e) {
  const parent = e.target.closest('.mak-field')

  if(parent.querySelector('textarea')) {
    const textarea = parent.querySelector('textarea')

    if(e.target.dataset.another === 'another' && e.target.checked) {
      textarea.classList.add('active')
    } else {
      textarea.classList.remove('active')
    }
  }

  setTimeout(function() {
    $('input.ui-checkbox[type="checkbox"]').trigger('refresh');
  }, 1)
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