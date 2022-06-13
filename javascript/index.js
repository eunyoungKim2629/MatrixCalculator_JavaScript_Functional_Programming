(() => {
	'use strict';
	const $ = (selector) => document.querySelector(selector);

	const $$ = (selectors) => document.querySelectorAll(selectors);

	let createMatrixHandler = true;

	const printModal = (message) => {
		$('.divModalWrapperContainer').style.display = 'flex';
		$('.divModalText').textContent = message;
	};

	const deleteModal = () => {
		$('.iDeleteModal').addEventListener('click',() => {
			$('.divModalWrapperContainer').style.display = 'none';
			createMatrixHandler =true;
		})
	};

	const confirmBeforeCreateNormalMatrix = (index) => {
		if ($$('.inputNormalMatrixRow')[index].value == '' || $$('.inputNormalMatrixCol')[index].value == '') {
			index && printModal('두 번째 행렬을 만들기 위해서 값이 반드시 존재해야함');
			!index && printModal('첫 번째 행렬을 만들기 위해서 값이 반드시 존재해야함');
			createMatrixHandler = false;
		}
		if (createMatrixHandler && (!/[1-9]/.test($$('.inputNormalMatrixRow')[index].value) || !/[1-9]/.test($$('.inputNormalMatrixCol')[index].value))) {
			printModal('행렬을 만들기 위해서 1 ~ 9까지의 숫자만을 입력하여 주세요');
			createMatrixHandler = false;
		}
	};

	const printInputMatrixItem = (index) => {
		if (!createMatrixHandler) return;

		const rowValue = +$$('.inputNormalMatrixRow')[index].value;
		const colValue = +$$('.inputNormalMatrixCol')[index].value;

		const inputArr = new Array(rowValue).fill(0).map(() => new Array(colValue).fill(0).map(() => '<input class="inputMatrixItem" value="0" maxLength="3">'));
		inputArr.forEach((arr) => void arr.push('<br>'));

		$$('.divDisplayMatrixContainer')[index].innerHTML = inputArr.flat().join('');
	};

	const hiddenButtonCreateNormalMatrix = (index) => {
		if (!createMatrixHandler) return;

		$$('.buttonCreateNormalMatrix')[index].style.display = 'none';
		$$('.buttonRandomNormalMatrixContainer')[index].style.display = 'inline-block';
		$$('.buttonDeleteNormalMatrixContainer')[index].style.display = 'inline-block';
	};

	const setInputNormalMatrixRowAndColReadOnly = (index) => {
		if (!createMatrixHandler) return;

		$$('.inputNormalMatrixRow')[index].setAttribute('readOnly', 'readOnly');
		$$('.inputNormalMatrixCol')[index].setAttribute('readOnly', 'readOnly');
	};

	const clickButtonCreateNormalMatrix = () => {
		$$('.buttonCreateNormalMatrix').forEach(
			(button, index) =>
				void button.addEventListener('click', () => {
					confirmBeforeCreateNormalMatrix(index);
					printInputMatrixItem(index);
					hiddenButtonCreateNormalMatrix(index);
					setInputNormalMatrixRowAndColReadOnly(index);
				})
		);
	};

	const clickButtonRandomNormalMatrixContainer = () => {
		$$('.buttonRandomNormalMatrixContainer').forEach((button, index) => void button.addEventListener('click', () => {}));
	};

	const clickButtonDeleteNormalMatrixContainer = () => {
		$$('.buttonDeleteNormalMatrixContainer').forEach((button, index) => void button.addEventListener('click', () => {}));
	};

	const clickButtonCalcPlus = () => {
		$('.buttonCalcPlus').addEventListener('click', () => {});
	};

	const clickButtonCalcMinus = () => {
		$('.buttonCalcMinus').addEventListener('click', () => {});
	};

	const clickButtonCalcMultiply = () => {
		$('.buttonCalcMultiply').addEventListener('click', () => {});
	};

	const main = () => {
		clickButtonCreateNormalMatrix();
		clickButtonRandomNormalMatrixContainer();
		clickButtonDeleteNormalMatrixContainer();
		clickButtonCalcPlus();
		clickButtonCalcMinus();
		clickButtonCalcMultiply();
		deleteModal();
	};

	main();
})();
