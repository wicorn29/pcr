function render_keypad(use_keyboard, target) {

  _keypad = document.getElementById("keypad");
  _keyboard = document.getElementById("keyboard");


  if(use_keyboard == "1") {
    _keypad.innerHTML = keypad_renderKeypad(target, 0);
	show_keypad();
  }

  else if(use_keyboard == "2") {
    _keyboard.innerHTML = keypad_renderKeyboard(target, "keyboard");
    show_keyboard();
  }

}

function show_keypad() {
	_oskContainer = document.getElementById("osk_container");
	_keypadContainer = document.getElementById("keypad_container");
	console.log('show_keypad');
	console.log(_oskContainer);
	_oskContainer.style.width = '30em';
	_oskContainer.style.display = 'block';
	_keypadContainer.style.display = 'inline';
}

function show_keyboard() {
	_oskContainer = document.getElementById("osk_container");
	_keyboardContainer = document.getElementById("keyboard_container");
	_oskContainer.style.width = '45em';
	_oskContainer.style.display = 'block';
	_keyboardContainer.style.display = 'inline';
}

function hide_keypad() {
    _oskContainer.style.display = 'none';
}

var _keypad;
var _keyboard;
var _keypadContainer;
var _keyboardContainer;
var _oskContainer;

var _keyboardCase = "upper";      // lower & upper are values here
var _divId;

var _shortKeypadButtonBorderClass = "keypad_button_border short_keypad_button_border";
var _shortKeypadButtonClass = "keypad_button short_keypad_button";
var _mediumKeypadButtonBorderClass = "keypad_button_border medium_keypad_button_border";
var _mediumKeypadButtonClass = "keypad_button medium_keypad_button";
var _largeKeypadButtonBorderClass = "keypad_button_border large_keypad_button_border";
var _largeKeypadButtonClass = "keypad_button large_keypad_button";
var _keyboardButtonBorderClass = "keypad_button_border keyboard_button_border";
var _keyboardButtonClass = "keypad_button keyboard_button";
var _shortKeyboardButtonBorderClass = "keypad_button_border short_keyboard_button_border";
var _shortKeyboardButtonClass = "keypad_button short_keyboard_button";
var _mediumKeyboardButtonBorderClass = "keypad_button_border medium_keyboard_button_border";
var _mediumKeyboardButtonClass = "keypad_button medium_keyboard_button";
var _largeKeyboardButtonBorderClass = "keypad_button_border large_keyboard_button_border";
var _largeKeyboardButtonClass = "keypad_button large_keyboard_button";
var _longButtonBorderClass = "keypad_button_border short_keyboard_long_button_border";
var _longKeyboardButtonClass = "keypad_button short_keyboard_long_button";
var _longButtonTextClass = "shift_button_text";

function keypad_keypress(key, field) {
  var elem = document.getElementById(field);
  elem.focus();
  elem.value += key;
  var temp = elem.value;
  elem.value = "";
  elem.value = temp;
}

function keypad_clearInput(field) {
  var elem = document.getElementById(field);
  elem.value = "";
  elem.focus();
}

function keypad_backspace(field) {
  var elem = document.getElementById(field);
  console.log(elem);
  elem.value = elem.value.substring(0, elem.value.length - 1);
  elem.focus();
}

function keypad_renderKeypad(targetField, showAlpha) {
  console.log("rendering keypad");
  var row, column, button;
  var content = "";

  console.log("rendering keypad");
  for (row = 0; row < 3; ++row) {
    content += "<div class='keypad_row enter_pin_keypad_row'>";
    for (column = 0; column < 3; ++column) {
      button = (row * 3) + (column + 1);
      content += _createShortKeypadButton(button, "keypad_keypress(\"" + button + "\", " + "\"" + targetField + "\"" + ")", "");
    }
    content += "</div>";
  }
  console.log("buttons created");
  content += "<div class='keypad_row enter_pin_keypad_row'>";
  content += _createShortKeypadButton("-", "keypad_keypress(\"-\", " + "\"" + targetField + "\"" + ")", "");
  content += _createShortKeypadButton("0", "keypad_keypress(\"0\", " + "\"" + targetField + "\"" + ")", "");
  content += _createShortKeypadButton("CLR", "keypad_clearInput(" + "\"" + targetField + "\"" + ")", "clear_keypad_button_text");
  content += "</div>";
  console.log("more content");
  content += "<div class='keypad_row enter_pin_keypad_row'>";
  if (showAlpha == 1) {
    content += _createMediumKeypadButton("%%Text.txtKeypad_AToZ%%", "showAlphaKeypad(" + "\"" + targetField + "\"" + ")", "a_to_z_keypad_button_text");
    content += _createMediumKeypadButton("Backspace", "keypad_backspace(" + "\"" + targetField + "\"" + ")", "medium_backspace_keypad_button_text");
  } else {
    content += _createLargeKeypadButton("Backspace", "keypad_backspace(" + "\"" + targetField + "\"" + ")", "large_backspace_keypad_button_text");
  }
  content += "</div>";
console.log("return content");
  return content;
}

function _createShortKeypadButton(label, onClickAction, buttonTextClass) {
  var buttonTextClass = "keypad_button_text " + buttonTextClass;
  return _createKeypadButton(label, onClickAction, _shortKeypadButtonBorderClass, _shortKeypadButtonClass, buttonTextClass);
}

function _createMediumKeypadButton(label, onClickAction, buttonTextClass) {
  var buttonTextClass = "keypad_button_text " + buttonTextClass;
  return _createKeypadButton(label, onClickAction, _mediumKeypadButtonBorderClass, _mediumKeypadButtonClass, buttonTextClass);
}

function _createLargeKeypadButton(label, onClickAction, buttonTextClass) {
  var buttonTextClass = "keypad_button_text " + buttonTextClass;
  return _createKeypadButton(label, onClickAction, _largeKeypadButtonBorderClass, _largeKeypadButtonClass, buttonTextClass);
}


function _createKeypadButton(label, onClickAction, buttonBorderClass, buttonClass, buttonTextClass) {
  return "<div class='" + buttonBorderClass + "'>" +
         "  <button class='" + buttonClass + "' onclick='" + onClickAction + "'>" +
         "    <div class='" + buttonTextClass + "'>" + label + "</div>" +
         "  </button>" +
         "</div>";
}

function _createKeyboardButton(label, onClickAction, buttonTextClass, keyboardSize) {
  var buttonBorderClass = (keyboardSize == 'short') ? _shortKeyboardButtonBorderClass : _keyboardButtonBorderClass;
  var buttonClass = (keyboardSize == 'short') ? _shortKeyboardButtonClass : _keyboardButtonClass;
  var buttonTextClass = _constructKeyboardButtonText(buttonTextClass);
  return _createKeypadButton(label, onClickAction, buttonBorderClass, buttonClass, buttonTextClass);
}

function _constructKeyboardButtonText(additionalButtonTextClass) {
  var buttonTextClass = "keypad_button_text";
  if (additionalButtonTextClass) {
    buttonTextClass += " " + additionalButtonTextClass;
  }
  return buttonTextClass;
}

function _createMediumKeyboardButton(label, onClickAction, buttonTextClass) {
  var buttonTextClass = _constructKeyboardButtonText(buttonTextClass);
  return _createKeypadButton(label, onClickAction, _mediumKeyboardButtonBorderClass, _mediumKeyboardButtonClass, buttonTextClass);
}

function _createLargeKeyboardButton(label, onClickAction, buttonTextClass) {
  var buttonTextClass = _constructKeyboardButtonText(buttonTextClass);
  return _createKeypadButton(label, onClickAction, _largeKeyboardButtonBorderClass, _largeKeyboardButtonClass, buttonTextClass);
}

function _switchKeyboardCase() {
  var _keyboard = document.getElementById("keyboard");

  if(_keyboardCase == "upper") {
    _keyboard.innerHTML = keypad_renderShortLowercaseKeyboard(_targetField, _divId);
  }
  else {
    _keyboard.innerHTML = keypad_renderShortUppercaseKeyboard(_targetField, _divId);
  }
}

function _createShiftAndExitButtons(targetField)
{
  return [_createShiftKeyboardButton(), _createExitKeyboardButton(targetField)];
}

function _createShiftKeyboardButton() {
  return "<div class='" + _longButtonBorderClass + "'>" +
    "  <button class=\"" + _longKeyboardButtonClass + "\" onclick=\"_switchKeyboardCase();\">" +
    "		<div class=" + _longButtonTextClass + ">Shift</div>" +
    "	</button>" +
    "</div>";
}

function _createExitKeyboardButton(targetField) {
  return "<div class='" + _shortKeyboardButtonBorderClass + "'>" +
    "  <button class=\"" + _shortKeyboardButtonClass + "\" onclick=\"closeAlphaKeypad(" + "\"" + targetField + "\"" + ");\">" +
    "    <img class=\"keyboard_close_button_icon\" src='/images/closeBtn.jpg' height='20' width='20' />" +
    "  </button>" +
    "</div>";
}

function _createBackspaceKeyboardButton(targetField) {
  return "<div class='" + _shortKeyboardButtonBorderClass + "'>" +
    "  <button class=\"" + _shortKeyboardButtonClass + "\" onclick=\"keypad_backspace(" + "\'" + targetField + "\'" + ");\">" +
	"  	<div class=keypad_button_backspace><img src='../images/backspace.png'/></div>" +
    "  </button>" +
    "</div>";
}

function keypad_renderKeyboard(targetField, divId) {
  console.log("here");
  if(_keyboardCase == "upper") {
	  console.log("upper");
    return keypad_renderShortUppercaseKeyboard(targetField, divId);
  }
  else {
	  console.log("lower");
    return keypad_renderShortLowercaseKeyboard(targetField, divId);
  }
}

function keypad_renderShortLowercaseKeyboard(targetField, divId) {
  _divId = divId;
  _targetField = targetField;
  _keyboardCase = "lower";
  var row1 = renderKeyboardRow(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"], targetField, null, "short");
  var row2 = renderKeyboardRow(["a", "s", "d", "f", "g", "h", "j", "k", "l"], targetField, _createBackspaceKeyboardButton(targetField), "short");
  var row3 = renderKeyboardRow(["z", "x", "c", "v", "b", "n", "m"], targetField, _createShiftKeyboardButton(), "short");
  return renderKeyboardRows([row1, row2, row3], targetField);
}

function keypad_renderShortUppercaseKeyboard(targetField, divId) {
  _divId = divId;
  _targetField = targetField;
  _keyboardCase = "upper";
  var row1 = renderKeyboardRow(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], targetField, null, "short");
  var row2 = renderKeyboardRow(["A", "S", "D", "F", "G", "H", "J", "K", "L"], targetField, _createBackspaceKeyboardButton(targetField), "short");
  var row3 = renderKeyboardRow(["Z", "X", "C", "V", "B", "N", "M"], targetField, _createShiftKeyboardButton(), "short");
  return renderKeyboardRows([row1, row2, row3], targetField);
}

function renderKeyboardRows(rows, targetField) {
  var content = "";
  for (var rowsIdx = 0; rowsIdx < rows.length; rowsIdx++) {
    content += rows[rowsIdx];
  }
  return content;
}

function renderKeyboardRow(row, targetField, extraButtons, keyboardSize) {
  var keyboard_row_class = (keyboardSize == "short") ? "short_keyboard_row" : "keyboard_row";
  var content = "<div class='keyboard_row " + keyboard_row_class + "'>";
  for (var rowIdx = 0; rowIdx < row.length; rowIdx++) {
    content += _createKeyboardButton(row[rowIdx], "keypad_keypress(\"" + row[rowIdx] + "\", " + "\"" + targetField + "\"" + ")", "", keyboardSize);
  }
  if (extraButtons) {
    for (var buttonIdx = 0; buttonIdx < extraButtons.length; buttonIdx++) {
      content += extraButtons[buttonIdx];
    }
  }
  content += "</div>";
  return content;
}
