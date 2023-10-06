/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// вешаем на окно прослушку загрузки DOM-дерева\n// по окнчании загрузки, будет запущена функция\n\nwindow.onload = function () {\n  // ищем ноды (элементы DOM-дерева) для их получения для последующих манипуляций\n  var burgerNode = document.querySelector(\".header__burger_menu\");\n  var headerMenuNode = document.querySelector(\".header__right\");\n  var closeMenuNode = document.querySelector(\".menu__close\");\n  var bodyNode = document.querySelector(\"body\");\n\n  // блокируем и разблокируем скролл во время открытия модального окна\n  var noOverflow = function noOverflow() {\n    return bodyNode.classList.add(\"oh\");\n  };\n  var overflow = function overflow() {\n    return bodyNode.classList.remove(\"oh\");\n  };\n\n  // показываем и скрываем меню\n  var showMenu = function showMenu() {\n    return headerMenuNode.classList.remove(\"hidden\");\n  };\n  var hideMenu = function hideMenu() {\n    return headerMenuNode.classList.add(\"hidden\");\n  };\n\n  // показываем и скрываем бургер\n  var hideBurger = function hideBurger() {\n    burgerNode.classList.add(\"hidden\");\n    closeMenuNode.classList.add(\"hidden\");\n    showMenu();\n    overflow();\n  };\n  var showBurger = function showBurger() {\n    burgerNode.classList.remove(\"hidden\");\n    closeMenuNode.classList.remove(\"hidden\");\n    hideMenu();\n    overflow();\n  };\n\n  // обновляем состояние бургера при ресайзе окна\n  var updateBurgerState = function updateBurgerState() {\n    var width = window.innerWidth;\n    console.log(\"width: \", width);\n    if (width <= 1024) return showBurger();\n    return hideBurger();\n  };\n\n  // выполняем ресайз окна на старте для получения корректного состояния меню при загрузке страницы\n  updateBurgerState();\n\n  // вешаем прослушку события резсайза для обновления состояния бургера\n  window.addEventListener(\"resize\", updateBurgerState);\n\n  // обработчик закрытия меню\n  var handleCloseMenu = function handleCloseMenu() {\n    overflow();\n    hideMenu();\n  };\n\n  // обработчик клика на бургер\n  var handleBurgerClick = function handleBurgerClick() {\n    if (headerMenuNode.classList.contains(\"hidden\")) {\n      noOverflow();\n      return showMenu();\n    }\n    handleCloseMenu();\n  };\n\n  // вешаем прослушку клика по бургеру\n  burgerNode.addEventListener(\"click\", handleBurgerClick);\n\n  // вешаем прослушку на клик по кнопке \"Закрыть меню\"\n  closeMenuNode.addEventListener(\"click\", handleCloseMenu);\n};\n\n//# sourceURL=webpack://rks/./src/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/script.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;