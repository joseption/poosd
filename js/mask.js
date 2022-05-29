maskQueueCount = 0;
// Input Masking Class
class InputMask {
    constructor(settings, smaller) {
        this.smaller = smaller;
        this.settings = settings;
        this.inputs = document.querySelectorAll('.' + settings.classRoot + '-masked');
    }

    init() {
        maskQueueCount++;
        for (var i = 0; i < this.inputs.length; i++) {
            this.createShell(this.inputs[i]);
            this.activateMasking(this.inputs[i]);
            var input = document.querySelector('[id=' + this.inputs[i].id + ']');
            var inputMasked = document.querySelector('[id=' + this.inputs[i].id + "MaskInput" + ']');
            inputMasked.placeholder = input.getAttribute("default-placeholder");
        }
        maskQueueCount--;
    }

    createShell(input) {
        var isStandardized = input.hasAttribute('data-standardized');
        if (!isStandardized) {
            input.setAttribute('data-standardized', '');

            var text = '';
            var placeholder = input.getAttribute('placeholder');
            if (!placeholder) {
                placeholder = this.settings.placeholder;
            }

            var dataId = input.getAttribute('data-z-id');

            input.setAttribute('data-placeholder', placeholder);
            input.removeAttribute('placeholder');
            var extra = this.smaller ? "default-shell" : "";
            text = '<span style="display:flex" class="' + extra + " " + this.settings.classRoot + '-shell">' +
                '<input class="' + this.settings.classRoot + '-input form-control" type="text" id="' + input.id + 'MaskInput"/>' +
                '<span style="visibility:hidden" aria-hidden="true" id="' + input.id +
                'Mask">' + placeholder + '</span>' +
                input.outerHTML +
                '</span>';

            input.outerHTML = text;

            var myId = input.id.replace('.', '\\.');

            var altInput = document.querySelector('[id=' + myId + "MaskInput" + ']');
            altInput.setAttribute('data-placeholder', placeholder);
            altInput.removeAttribute('placeholder');
            altInput.style.width = input.style.width;

            if (dataId && dataId.length > 0)
                altInput.setAttribute('data-z-id', dataId + "_Masked")

            var isReadOnly = input.hasAttribute('readonly');
            if (isReadOnly)
                altInput.setAttribute('readonly', 'readonly');

            var that = this;
            if (altInput.addEventListener) {
                altInput.addEventListener('keyup', function (e) {
                    that.shellKeyupHandler(e);
                }, false);
                altInput.addEventListener('input', function (e) {
                    that.shellInputHandler(e);
                }, false);
                altInput.addEventListener('blur', function (e) {
                    that.shellBlurHandler(e, myId);
                }, false);
                altInput.addEventListener('focus', function (e) {
                    that.shellFocusHandler(e, myId, isReadOnly);
                }, false);
            } else if (altInput.attachEvent) {
                altInput.attachEvent("onkeyup", function (e) {
                    e.target = e.srcElement
                    that.shellKeyupHandler(e);
                });
                altInput.attachEvent("oninput", function (e) {
                    e.target = e.srcElement;
                    that.shellInputHandler(e);
                });
                altInput.attachEvent("onblur", function (e) {
                    e.target = e.srcElement;
                    that.shellBlurHandler(e, myId);
                });
                altInput.attachEvent("onfocus", function (e) {
                    e.target = e.srcElement;
                    that.shellFocusHandler(e, myId, isReadOnly);
                });
            }
        }
    }

    activateMasking(input) {
        var that = this;
        if (input.addEventListener) {
            input.addEventListener('keyup', function (e) {
                that.maskKeyupHandler(e);
            }, false);
            input.addEventListener('input', function (e) {
                that.maskInputHandler(e);
            }, false);
            input.addEventListener('change', function (e) {
                that.maskChangeHandler(e);
            }, false);
            input.addEventListener('blur', function (e) {
                that.maskBlurHandler(e);
            }, false);
            input.addEventListener('focus', function (e) {
                that.maskFocusHandler(e);
            }, false);
        } else if (input.attachEvent) {
            input.attachEvent("onkeyup", function (e) {
                that.maskKeyupHandler(e);
            });
            input.attachEvent("oninput", function (e) {
                that.maskInputHandler(e);
            });
            input.attachEvent("onchange", function (e) {
                e.target = e.srcElement;
                that.maskChangeHandler(e);
            });
            input.attachEvent("onblur", function (e) {
                e.target = e.srcElement;
                that.maskBlurHandler(e);
            });
            input.attachEvent("onfocus", function (e) {
                e.target = e.srcElement;
                that.maskFocusHandler(e);
            });
        }

        if (input.value) {
            that.handleValueChangeInput(input);
        }
    }

    shellKeyupHandler(e) {
        this.handleValueChange(e);
    }

    shellInputHandler(e) {
        this.handleValueChange(e);
    }

    shellBlurHandler(e, inputId) {
        var mask = document.querySelector('[id=' + inputId + "Mask" + ']');
        mask.style.visibility = 'hidden';

        var input = document.querySelector('[id=' + inputId + ']');
        var inputMasked = document.querySelector('[id=' + inputId + "MaskInput" + ']');
        inputMasked.placeholder = !inputMasked.value ? input.getAttribute("default-placeholder") : "";
    }

    shellFocusHandler(e, inputId, isReadOnly) {
        if (!isReadOnly) {
            var mask = document.querySelector('[id=' + inputId + "Mask" + ']');
            mask.style.visibility = 'visible';
            var inputMasked = document.querySelector('[id=' + inputId + "MaskInput" + ']');
            inputMasked.placeholder = "";
        }
    }

    maskKeyupHandler(e) {
        this.handleValueChange(e);
    }

    maskInputHandler(e) {
        this.handleValueChange(e);
    }

    maskChangeHandler(e) {
        this.handleValueChange(e);
    }

    maskBlurHandler(e) {
        var myBId = e.target.id.replace('.', '\\.');
        var mask = document.querySelector('[id=' + myBId + "Mask" + ']');
        mask.style.visibility = 'hidden';

        var input = document.querySelector('[id=' + e.target.id + ']');
        var inputMasked = document.querySelector('[id=' + e.target.id + "MaskInput" + ']');
        inputMasked.placeholder = !inputMasked.value ? input.getAttribute("default-placeholder") : "";
    }

    maskFocusHandler(e) {
        var myFId = e.target.id.replace('.', '\\.');
        var mask = document.querySelector('[id=' + myFId + "Mask" + ']');
        mask.style.visibility = 'visible';
    }

    setValueOfMask(input, value) {
        var placeholder = input.getAttribute('data-placeholder');
        var content = placeholder && value ? placeholder.substr(value.length) : "";
        return "<i>" + value + "</i>" + content;
    }

    resetValueOfMask(input) {
        var placeholder = input.getAttribute('data-placeholder');
        return placeholder;
    }

    handleValueChange(e) {
        switch (e.keyCode) { // allows navigating thru input
            case 20: // caplocks
            case 17: // control
            case 18: // option
            case 16: // shift
            case 37: // arrow keys
            case 38:
            case 39:
            case 40:
            case 9: // tab (let blur handle tab)
                return;
        }

        var value = this.handleCurrentValue(e.target);
        var id = e.target.getAttribute('id').replace('MaskInput', '');
        document.getElementById(id + 'Mask').innerHTML = this.setValueOfMask(e.target, value);
        document.getElementById(id + 'MaskInput').value = value;

        switch (e.keyCode) { // allows navigating thru input
            case 46: // del
            case 8: // backspace
                return;
        }

        document.getElementById(id).value = value;
        if (this.handleCurrentValueNumbersOnly) {
            document.getElementById(id).value = this.handleCurrentValueNumbersOnly(e.target);
        }
    }

    handleValueChangeInput(input) {
        var value = this.handleCurrentValue(input);
        var id = input.getAttribute('id').replace('MaskInput', '');
        document.getElementById(id).value = value;
        document.getElementById(id + 'Mask').innerHTML = this.setValueOfMask(input, value);
        document.getElementById(id + 'MaskInput').value = value;
        if (this.handleCurrentValueNumbersOnly) {
            document.getElementById(id).value = this.handleCurrentValueNumbersOnly(input);
        }
    }

    handleCurrentValueNumbersOnly(input) {
        var value = ""
        if (input.value) {
            var values = input.value.match(/\W/g);
            if (values) {
                value = values.join('');
            }
        }
        return value;
    }

    handleCurrentValue(input) {
        var value = input.value,
            newValue = '',
            i, j, isLetter, strippedValue;

        var l = value.length;
        // strip special characters
        strippedValue = value.replace(/\W/g, "");

        for (i = 0, j = 0; i < l; i++) {
            var x =
                isInt = !isNaN(parseInt(strippedValue[j]));
            isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;

            if ((i == 0 && isLetter) || (i > 0 && !isLetter)) {
                newValue += strippedValue[j++];

            }
            // break if no characters left and the pattern is non-special character
            if (strippedValue[j] == undefined) {
                break;
            }
        }

        return newValue;
    }
}

// Input Masking Setup
var inputMaskSetup = {
    init: function (smaller) {
        this.phoneInputMask = new InputMask(phoneSettings, smaller);
        this.phoneInputMask.shellBlurHandler = function (e, inputId) {
            var altInput = document.querySelector('[id=' + inputId + "MaskInput" + ']');

            var mask = document.querySelector('[id=' + inputId + "Mask" + ']');
            mask.style.visibility = 'hidden';

            if (altInput.value == "(") {
                altInput.value = "";
                var elmt = document.querySelector('[id=' + inputId + "Mask" + ']').innerHTML = this.resetValueOfMask(e.srcElement);
            }

            var input = document.querySelector('[id=' + inputId + ']');
            var inputMasked = document.querySelector('[id=' + inputId + "MaskInput" + ']');
            inputMasked.placeholder = !inputMasked.value ? input.getAttribute("default-placeholder") : "";
        };
        this.phoneInputMask.handleValueChangeInput = function (input) {
            var numOnly = this.handleCurrentValueNumbersOnly(input);
            if (numOnly.length == 11 && numOnly.charAt(0) == "1") {
                input.value = numOnly.substring(1, numOnly.length);
            }

            var id = input.getAttribute('id').replace('MaskInput', '');
            var value = this.handleCurrentValue(input);
            document.getElementById(id).value = value;
            document.getElementById(id + 'Mask').innerHTML = this.setValueOfMask(input, value);
            document.getElementById(id + 'MaskInput').value = value;
            document.getElementById(id).value = this.handleCurrentValueNumbersOnly(input);
        };
        this.phoneInputMask.handleCurrentValueNumbersOnly = function (input) {
            var value = ""
            if (input.value) {
                var values = input.value.match(/\d+/g);
                if (values) {
                    value = values.join('');
                }
            }
            return value;
        };
        this.phoneInputMask.handleCurrentValue = function (input) {
            var isCharsetPresent = input.getAttribute('data-charset'),
                placeholder = isCharsetPresent || input.getAttribute('data-placeholder'),
                value = input.value,
                newValue = '',
                i, j, isInt, isLetter, strippedValue;

            var l = placeholder ? placeholder.length : 0;

            // strip special characters
            strippedValue = isCharsetPresent ? value.replace(/\W/g, "") : value.replace(/\D/g, "");

            var mainId = input.getAttribute('id').replace('MaskInput', '').replace('.', '\\.');
            var main = document.querySelector('[id=' + mainId + ']');

            for (i = 0, j = 0; i < l; i++) {
                var x =
                    isInt = !isNaN(parseInt(strippedValue[j]));
                isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
                matchesNumber = this.settings.maskedNumber.indexOf(placeholder[i]) >= 0;
                matchesLetter = this.settings.maskedLetter.indexOf(placeholder[i]) >= 0;

                if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
                    newValue += strippedValue[j++];

                } else if ((!isCharsetPresent && !isInt && matchesNumber) || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))) {
                    return newValue;

                } else {
                    newValue += placeholder[i];
                }
                // break if no characters left and the pattern is non-special character
                if (strippedValue[j] == undefined) {
                    break;
                }
            }
            return newValue;
        }
        this.phoneInputMask.init();
    }
}

// Label Masking Class
class LabelMask {
    constructor(settings) {
        this.settings = settings;
        this.inputs = document.querySelectorAll('.' + settings.classRoot + '-label-masked');
    }

    init() {
        maskQueueCount++;
        for (var i = 0; i < this.inputs.length; i++) {
            this.setupMask(this.inputs[i]);
        }
        maskQueueCount--;
    }

    setupMask(input) {
        this.handleValue(input);
    }

    handleValue(input) {
        var id = input.getAttribute('id');
        if (!id && input.hasAttribute('for')) {
            id = input.getAttribute('for');
            input = document.getElementById(id);
        }
        if (input && id && document.getElementById(id).innerHTML) {
            document.getElementById(id).innerHTML = this.handleCurrentValue(input, this.settings.placeholder, this.settings.name);
        } else {
            input.innerHTML = this.handleCurrentValue(input, this.settings.placeholder, this.settings.name);
        }
    }

    handleCurrentValue(input) {
        var value = input.innerHTML,
            newValue = '',
            i, j, isInt, strippedValue;

        var l = this.settings.placeholder.length;

        // strip special characters
        strippedValue = value.replace(/\D/g, "");

        if (strippedValue) {
            for (i = 0, j = 0; i < l; i++) {
                var isInt = !isNaN(parseInt(strippedValue[j]));
                var matchesNumber = this.settings.maskedNumber.indexOf(this.settings.placeholder[i]) >= 0;

                if (matchesNumber && isInt) {
                    newValue += strippedValue[j++];
                } else if (matchesNumber && !isInt) {
                    return newValue;

                } else {
                    newValue += this.settings.placeholder[i];
                }
                // break if no characters left and the pattern is non-special character
                if (strippedValue[j] == undefined) {
                    break;
                }
            }
        }

        return newValue;
    }
}

// Label Masking Setup
var labelMaskSetup = {
    init: function () {
        this.phoneLabelMask = new LabelMask(phoneSettings);
        this.phoneLabelMask.init();
    }
}

// Phone Masking Rules
var phoneSettings = {
    classRoot: 'phone-number',
    placeholder: '(999) 999-9999',
    maskedNumber: 'XdDmMyY9',
    maskedLetter: '_',
    numbersOnly: true
};