export const Keyboard = {
   elements: {
      main: null,
      keysContainer: null,
      keys: []
   },

   eventHandlers: {
      oninput: null,
      onclose: null
   },

   properties: {
      value: '',
      capsLock: false
   },

   init() {
      // Create main elements
      this.elements.main = document.createElement('div');
      this.elements.keysContainer = document.createElement('div');

      // Setup main elements
      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.keysContainer.appendChild(this._createKeys());

      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

      // Add to DOM
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);

      // Automatically use keyboard for elements with .use-keyboard-input

      document.querySelectorAll(".use-keyboard-input").forEach(element => {
         element.addEventListener("focus", () => {
            this.open(element.value, currentValue => {
               element.value = currentValue;
            });
         });
      });
   },

   _createKeys() {
      const fragment = document.createDocumentFragment();
      const keyLayout = [
         "`", "~", "ё", "1", "!", "2", "@", "3", "#", "4", "$", "5", "%", "6", "^", "7", "&", "8", "*", "9", "(", "0", ")", "-", "_", "=", "+", "backspace",
         "caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "[", "]", "{", "}", "|", "/",
         "shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
         "done", "z", "x", "c", "v", "b", "n", "m", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", ".", "?",
         "en", "space", "left", "right", 'music'
      ];

      // 'speech'

      const input = document.querySelector(".use-keyboard-input");

      document.onkeydown = function (event) {

         document.querySelectorAll('.keyboard__key').forEach(el => el.classList.remove('colorActive'));
         if (event.keyCode === 16) {
            const shift = document.querySelector('[data-key="shift"]');
            shift.classList.add('colorActive');
            shift.click()
            setTimeout(() => {
               shift.classList.remove('colorActive')
            }, 100);
         } else if (event.keyCode === 20) {
            const caps = document.querySelector('[data-key="caps"]');
            caps.classList.add('colorActive');
            caps.click()
            setTimeout(() => {
               caps.classList.remove('colorActive')
            }, 100);
         } else if (event.keyCode === 8) {
            const backspace = document.querySelector('[data-key="backspace"]');
            backspace.classList.add('colorActive');
            setTimeout(() => {
               backspace.classList.remove('colorActive')
            }, 100);
         }
      }

      document.onkeypress = function (event) {
         document.querySelectorAll('.keyboard__key').forEach(el => el.classList.remove('colorActive'));
         if (event.keyCode === 59 || event.keyCode === 39 || event.keyCode === 92) {
            return
         } else if (event.keyCode === 13) {
            const enter = document.querySelector('[data-key="enter"]');
            enter.classList.add('colorActive');
            setTimeout(() => {
               enter.classList.remove('colorActive')
            }, 300);
         } else {
            const currentBtn = document.querySelector('[data-key="' + String.fromCharCode(event.keyCode) + '"]');
            currentBtn.classList.add('colorActive');

            setTimeout(() => {
               currentBtn.classList.remove('colorActive')
            }, 300);
         }

      };

      // Creates HTML for an icon
      const createIconHTML = (icon_name) => {
         return `<i class="material-icons">${icon_name}</i>`;
      };

      keyLayout.forEach(key => {
         const keyElement = document.createElement('button');
         const insertLineBreak = ['backspace', '/', 'enter', "?"].indexOf(key) !== -1;
         let audio = document.createElement('audio');
         audio.innerHTML = `<audio data-audio="${key}" src="assets/sounds/boom.wav"></audio>`
         document.body.appendChild(audio)
         // Add attributes/classes
         keyElement.setAttribute("type", "button");
         keyElement.classList.add("keyboard__key");
         // keyElement.classList.add("keyboard__key", `${key}`);
         keyElement.dataset.key = `${key}`;

         switch (key) {
            case 'backspace':
               keyElement.classList.add('keyboard__key--wide');
               keyElement.innerHTML = createIconHTML('backspace');

               keyElement.addEventListener('click', () => {
                  if (input.value.length > 0) input.setRangeText("", input.selectionStart - 1, input.selectionEnd, "end");
                  input.focus();
                  this.enterText();

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/clap.wav'
                  if (!audio) return; // если нет такого audio тега
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               });
               break;

            case "caps":
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
               keyElement.innerHTML = createIconHTML("keyboard_capslock");
               keyElement.addEventListener("click", () => {
                  this._toggleCapsLock();
                  keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock); 
                  this.focusMethod();

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/kick.wav'
                  if (!audio) return; // если нет такого audio тега
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               });
               break;

            case "shift":
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
               keyElement.innerHTML = createIconHTML("keyboard_arrow_up");
               keyElement.addEventListener("click", () => {
                  this._toggleCapsLock();
                  keyElement.classList.toggle("keyboard__key--activeShift"); 
                  this.focusMethod();

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/hihat.wav'
                  if (!audio) return; 
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               });
               const activeEnglish = fragment.querySelectorAll('.activeEnglish');
               const inactiveEnglish = fragment.querySelectorAll('.inactiveEnglish');
               const allEnglishSym = [...activeEnglish, ...inactiveEnglish];

               function activeEnglishSym() {
                  allEnglishSym.forEach(el => {
                     el.classList.toggle('activeEnglish');
                     el.classList.toggle('inactiveEnglish');
                  });
               }
               keyElement.addEventListener('mousedown', activeEnglishSym);
               break;

            case "enter":
               keyElement.classList.add("keyboard__key--wide");
               keyElement.innerHTML = createIconHTML("keyboard_return");
               keyElement.addEventListener("click", () => {
                  input.setRangeText('\n', input.selectionStart, input.selectionEnd, "end");
                  input.focus();

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/openhat.wav'
                  if (!audio) return; 
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               });
               break;

            case "space":
               keyElement.dataset.key = ' ';
               keyElement.classList.add("keyboard__key--extra-wide");
               keyElement.innerHTML = createIconHTML("space_bar");
               keyElement.addEventListener("click", () => {
                  input.setRangeText(' ', input.selectionStart, input.selectionEnd, "end");
                  input.focus();
                  this.enterText();

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/snare.wav'
                  if (!audio) return; 
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               });
               break;

            case "done":
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
               keyElement.innerHTML = createIconHTML("check_circle");
               keyElement.addEventListener("click", () => {
                  this._triggerEvent("onclose");
                  this.close()
                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/snare.wav'
                  if (!audio) return; 
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               });
               break;

            case "en":
               keyElement.classList.add("keyboard__key--wide", 'active');
               keyElement.textContent = key.toLowerCase();
               const activeElements = fragment.querySelectorAll('.active');
               const inactiveElements = fragment.querySelectorAll('.inactive');
               const allLetters = [...activeElements, ...inactiveElements]
               keyElement.addEventListener('click', () => {
                  allLetters.forEach(el => {
                     el.classList.toggle('active');
                     el.classList.toggle('inactive');
                  });
                  if (keyElement.textContent == 'en') {
                     keyElement.textContent = 'ru'
                  } else {
                     keyElement.textContent = 'en'
                  }

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/snare.wav'
                  if (!audio) return; 
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               })
               break;

            case "right":
               keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
               keyElement.addEventListener('click', () => {
                  input.selectionStart = input.selectionStart + 1;
                  input.focus();

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/snare.wav'
                  if (!audio) return; // если нет такого audio тега
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               });
               break;

            case "left":
               keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
               keyElement.addEventListener('click', () => {
                  input.selectionEnd = input.selectionEnd - 1;
                  input.focus();

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/snare.wav'
                  if (!audio) return; 
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }
               });
               break;

            case "music":
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
               keyElement.innerHTML = createIconHTML("music_note");
               keyElement.addEventListener("click", () => {
                  keyElement.classList.toggle("music-block");
                  this.focusMethod();

                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/hihat.wav'
                  if (!audio) return; 
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  }

                  document.querySelectorAll('audio').forEach(el => {
                     el.classList.toggle('audioStop');
                  });
               });
               break;

            case "speech":
               keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
               keyElement.innerHTML = createIconHTML("graphic_eq");
               const btnLang = fragment.querySelector('[data-key="en"]');

               window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

               const recognition = new SpeechRecognition();
               recognition.interimResults = false; 
               const text = document.querySelector('textarea');

               recognition.addEventListener('result', e => {
                  const transcript = Array.from(e.results)
                     .map(result => result[0])
                     .map(result => result.transcript)
                     .join('');

                  text.setRangeText(`${transcript}\n`, text.selectionStart, text.selectionEnd, "end");
               });

               recognition.addEventListener('end', function () {
                  if (keyElement.classList.contains("music-block")) {
                     recognition.start()
                  } else {
                     recognition.stop()
                  }
               });

               keyElement.addEventListener("click", () => {
                  keyElement.classList.toggle("music-block");
                  const audio = document.querySelector(`audio[data-audio="${key}"]`);
                  audio.src = 'assets/sounds/hihat.wav'
                  if (!audio) return; 
                  if (!audio.classList.contains('audioStop')) {
                     audio.play();
                  };

                  if (btnLang.textContent === 'en') recognition.lang = 'en-US';
                  if (btnLang.textContent === 'ru') recognition.lang = 'ru';

                  if (keyElement.classList.contains("music-block")) {
                     recognition.start();
                  } else {
                     recognition.stop();
                  }
               });
               break;

            default:
               const audio = document.createElement('audio');
               audio.dataset.key = `${key}`;
               if ((key.charCodeAt() > 96 && key.charCodeAt() < 123) || key === "," || key === "[" || key === "]" || key === ";" || key === "'" || key === "?" || key === "`") {
                  keyElement.classList.add('active')
               } else if (key.charCodeAt() >= 1072 && key.charCodeAt() <= 1105) {
                  keyElement.classList.add('inactive')
                  if (key === "ё") keyElement.classList.add('activeEnglish')
               };

               if (key === "~" || key === "!" || key === "@" || key === "#" || key === "$" || key === "%" || key === "^" || key === "&" || key === "*" || key === "(" || key === ")" || key === "_" || key === "+" || key === "{" || key === "}" || key === "|" || key === ":" || key === '"' || key === "<" || key === ">") {
                  keyElement.classList.add('inactiveEnglish')
               } else if (key === "`" || key === "1" || key === "2" || key === "3" || key === "4" || key === "5" || key === "6" || key === "7" || key === "8" || key === "9" || key === "0" || key === "-" || key === "=" || key === "/" || key === "[" || key === "]" || key === ";" || key === "'" || key === "," || key === "." || key === "/") {
                  keyElement.classList.add('activeEnglish')
               }

               keyElement.textContent = key.toLowerCase();
               keyElement.addEventListener("click", (e) => {
                  if (this.properties.capsLock) {
                     input.setRangeText(key.toUpperCase(), input.selectionStart, input.selectionEnd, "end");
                     input.focus();
                  } else {
                     input.setRangeText(key.toLowerCase(), input.selectionStart, input.selectionEnd, "end");
                     input.focus();
                  }
                  this._triggerEvent("oninput");
                  this.focusMethod()

                  if ((key.charCodeAt() > 96 && key.charCodeAt() < 123) || key === "," || key === "[" || key === "]" || key === ";" || key === "'" || key === "?" || key === "`") {
                     const audio = document.querySelector(`audio[data-audio="${key}"]`);
                     audio.src = 'assets/sounds/boom.wav'
                     if (!audio) return; // если нет такого audio тега
                     if (!audio.classList.contains('audioStop')) {
                        audio.play();
                     }
                  } else if (key.charCodeAt() >= 1072 && key.charCodeAt() <= 1105) {
                     const audio = document.querySelector(`audio[data-audio="${key}"]`);
                     audio.src = 'assets/sounds/tom.wav'
                     if (!audio) return; 
                     if (!audio.classList.contains('audioStop')) {
                        audio.play();
                     }
                  } else {
                     const audio = document.querySelector(`audio[data-audio="${key}"]`);
                     audio.src = 'assets/sounds/tink.wav'
                     if (!audio) return; 
                     if (!audio.classList.contains('audioStop')) {
                        audio.play();
                     }
                  }
                  this.enterText();
               });
               break;
         }
         fragment.appendChild(keyElement);

         if (insertLineBreak) {
            fragment.appendChild(document.createElement('br'))
         }
      });
      return fragment;
   },

   _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
         this.eventHandlers[handlerName](this.properties.value);
      }
   },

   _toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      for (const key of this.elements.keys) {
         if (key.childElementCount === 0) {
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
         }
      }
   },

   open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.remove("keyboard--hidden");
   },

   close() {
      this.properties.value = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.add("keyboard--hidden");
   },

   focusMethod() {
      const input = document.querySelector(".use-keyboard-input");
      input.focus();
   },

   // Search countries after enter text into the input

   enterText() {
      const input = document.querySelector(".use-keyboard-input");
      let value = input.value.toUpperCase();
      const countryList = document.querySelectorAll('.country-item');
      countryList.forEach(country => {
         const appropriateCountry = country.dataset.country.toUpperCase().startsWith(value);
         if (appropriateCountry) {
            document.querySelector(`[data-country="${country.dataset.country}"]`).classList.remove('hide');
         } else {
            document.querySelector(`[data-country="${country.dataset.country}"]`).classList.add('hide');
         }
      });
   }
};

window.addEventListener('DOMContentLoaded', function () {
   Keyboard.init();

});