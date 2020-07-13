const filterByType = (type, ...values) => values.filter(value => typeof value === type),
      /*Функция фильтрует массив values по типу type, выбранному пользователем.*/

	hideAllResponseBlocks = () => {
	/* Функция создает массив из блоков с классом dialog__response-block и скрывает эти блоки */
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
	/*Функция принимает 3 аргумента:blockSelector, msgText, spanSelector. Скрывает блоки результата запуском функции hideAllResponseBlocks, 
	показывает блок с blockSelector и если spanSelector был передан,то его значение будет равно msgText.*/
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	//// Выводит ошибку
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//Сообщает об отсутствии результатов
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {
	/*Функция фильтрует данные values по типу type в безопасном режиме, благодаря try-catch. 
	Используется устаревший метод eval. Новая переменная alertMsg генерирует результат и он выводится на страницу. 
	В случае ошибки отрабатывает showError*/
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn');
//Фильтрация запускается по клику на кнопку filterButton
filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {
	//Если поле пустое, выводится ошибка.
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else { 
	//Функция отрабатывает фильтрацию.
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

