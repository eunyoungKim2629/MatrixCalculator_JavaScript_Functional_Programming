(() => {
	'use strict';

	// element tool

	const $ = (selector) => document.querySelector(selector);

	const $$ = (selectors) => document.querySelectorAll(selectors);

	// handler

	let matrixHandler = true;

	// modal

	const printModal = (message) => {
		$('.divModalWrapperContainer').style.display = 'flex';
		$('.divModalText').textContent = message;
		matrixHandler = false;
	};

	const deleteModal = () => {
		$('.iDeleteModal').addEventListener('click', () => {
			$('.divModalWrapperContainer').style.display = 'none';
			matrixHandler = true;
		});
	};

	// createMatrix

	const confirmBeforeCreateNormalMatrix = (index) => {
		if ($$('.inputNormalMatrixRow')[index].value == '' || $$('.inputNormalMatrixCol')[index].value == '') {
			index && printModal('두 번째 행렬을 만들기 위해서 값이 반드시 존재해야함');
			!index && printModal('첫 번째 행렬을 만들기 위해서 값이 반드시 존재해야함');
		}
		if (matrixHandler && (!/[1-9]/.test($$('.inputNormalMatrixRow')[index].value) || !/[1-9]/.test($$('.inputNormalMatrixCol')[index].value))) {
			printModal('행렬을 만들기 위해서 1 ~ 9까지의 숫자만을 입력하여 주세요');
		}
	};

	const printInputMatrixItem = (index) => {
		if (!matrixHandler) return;

		const rowValue = +$$('.inputNormalMatrixRow')[index].value;
		const colValue = +$$('.inputNormalMatrixCol')[index].value;

		const inputArr = new Array(rowValue).fill(0).map(() => new Array(colValue).fill(0).map(() => '<input class="inputMatrixItem" value="0" maxLength="3">'));
		inputArr.forEach((arr) => void arr.push('<br>'));

		$$('.divDisplayMatrixContainer')[index].innerHTML = inputArr.flat().join('');
	};

	const hiddenButtonCreateNormalMatrix = (index) => {
		if (!matrixHandler) return;

		$$('.buttonCreateNormalMatrix')[index].style.display = 'none';
		$$('.buttonRandomNormalMatrixContainer')[index].style.display = 'inline-block';
		$$('.buttonDeleteNormalMatrixContainer')[index].style.display = 'inline-block';
	};

	const setInputNormalMatrixRowAndColReadOnly = (index) => {
		if (!matrixHandler) return;

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

	const generateRandomNum = () => {
		return Math.floor(Math.random() * 2) ? Math.floor(Math.random() * 100) : -Math.floor(Math.random() * 100);
	};

	const printRandomNum = (index) =>
		void $$('.divDisplayMatrixContainer')
			[index].querySelectorAll('input')
			.forEach((input) => void (input.value = generateRandomNum()));

	const clickButtonRandomNormalMatrixContainer = () => {
		$$('.buttonRandomNormalMatrixContainer').forEach(
			(button, index) =>
				void button.addEventListener('click', () => {
					printRandomNum(index);
				})
		);
	};

	const deleteNormalMatrix = (index) => {
		$$('.divDisplayMatrixContainer')
			[index].querySelectorAll('input')
			.forEach((input) => void input.remove());
	};

	const showButtonCreateNormalMatrix = (index) => {
		$$('.buttonCreateNormalMatrix')[index].style.display = 'inline-block';
		$$('.buttonRandomNormalMatrixContainer')[index].style.display = 'none';
		$$('.buttonDeleteNormalMatrixContainer')[index].style.display = 'none';
	};

	const resetInputNormalMatrixRowAndCol = (index) => {
		$$('.inputNormalMatrixRow')[index].value = '';
		$$('.inputNormalMatrixCol')[index].value = '';

		$$('.inputNormalMatrixRow')[index].removeAttribute('readOnly');
		$$('.inputNormalMatrixCol')[index].removeAttribute('readOnly');
	};

	const clickButtonDeleteNormalMatrixContainer = () => {
		$$('.buttonDeleteNormalMatrixContainer').forEach(
			(button, index) =>
				void button.addEventListener('click', () => {
					deleteNormalMatrix(index);
					showButtonCreateNormalMatrix(index);
					resetInputNormalMatrixRowAndCol(index);
				})
		);
	};

	const confirmExistInputs = () => {
		Array.from($$('.divDisplayMatrixContainer')).some(
			(divDisplayMatrixContainer) => divDisplayMatrixContainer?.querySelector('input') === null && matrixHandler && printModal('연산을 위해서는 반드시 행렬을 생성해야합니다.')
		);
	};

	const confirmSameRowAndCol = () => {
		matrixHandler &&
			($$('.inputNormalMatrixRow')[0].value !== $$('.inputNormalMatrixRow')[1].value || $$('.inputNormalMatrixCol')[0].value !== $$('.inputNormalMatrixCol')[1].value) &&
			printModal('행과 열의 갯수를 같게 입력해주세요');
	};

	const confirmSameFirstRowAndSecondCol = () => {
		//1
		matrixHandler && $$('.inputNormalMatrixRow')[0].value !== $$('.inputNormalMatrixCol')[1].value && printModal('첫번째 행렬의 행의 값과 두번째 행렬의 열의 값을 같게 입력해주세요.');
	};

	const confirmEmptyInputValues = () => {
		matrixHandler &&
			$$('.divDisplayMatrixContainer').forEach((divDisplayMatrixContainer) => {
				Array.from(divDisplayMatrixContainer.querySelectorAll('input')).some((input) => input.value === '' && printModal('연산을 위해서는 반드시 행렬 안에 값이 존재해야합니다.'));
			});
	};

	const confirmNumInputValues = () => {
		matrixHandler &&
			$$('.divDisplayMatrixContainer').forEach((divDisplayMatrixContainer) => {
				Array.from(divDisplayMatrixContainer.querySelectorAll('input')).some((input) => !/^-?\d{1,2}$/g.test(input.value) && printModal('-99부터 99까지의 숫자만 입력해주세요.'));
			});
	};

	const calcPlusInputValues = () => {
		const firstValues = Array.from($$('.divDisplayMatrixContainer')[0].querySelectorAll('input')).map((input) => +input.value);
		const secondValues = Array.from($$('.divDisplayMatrixContainer')[1].querySelectorAll('input')).map((input) => +input.value);

		return firstValues.map((firstValue, index) => firstValue + secondValues[index]);
	};

	const calcMinusInputValues = () => {
		const firstValues = Array.from($$('.divDisplayMatrixContainer')[0].querySelectorAll('input')).map((input) => +input.value);
		const secondValues = Array.from($$('.divDisplayMatrixContainer')[1].querySelectorAll('input')).map((input) => +input.value);

		return firstValues.map((firstValue, index) => firstValue - secondValues[index]);
	};

	const calcMultiplyInputValues = () => {
		//2
		let firstIndex = -1;
		let secondIndex = -1;
		let firstValues = new Array(+$$('.inputNormalMatrixRow')[0].value).fill(0).map(() => new Array(+$$('.inputNormalMatrixCol')[0].value).fill(0)); // [[0,0,0],[0,0,0],[0,0,0]]
		firstValues = firstValues.map((arr) =>
			arr.map(() => {
				firstIndex++;
				return +$$('.divDisplayMatrixContainer')[0].querySelectorAll('input')[firstIndex].value;
			})
		);
		let secondValues = new Array(+$$('.inputNormalMatrixRow')[1].value).fill(0).map(() => new Array(+$$('.inputNormalMatrixCol')[1].value).fill(0));
		secondValues = secondValues.map((arr) =>
			arr.map(() => {
				secondIndex++;
				return $$('.divDisplayMatrixContainer')[1].querySelectorAll('input')[secondIndex].value;
			})
		);

		return firstValues.map((firstRow) => secondValues[0].map((_, index01) => firstRow.reduce((pre, cur, index02) => pre + cur * secondValues[index02][index01], 0))).flat();
	};

	const printCalcPlusInputMatrixItem = () => {
		if (matrixHandler) {
			const resultValues = calcPlusInputValues();
			const calcInputs = new Array(+$('.inputNormalMatrixRow').value).fill(0).map(() => new Array(+$('.inputNormalMatrixCol').value).fill('<input class="inputCalcMatrixItem" readOnly >'));
			calcInputs.forEach((arr) => arr.push('<br>'));

			$('.divDisplayCalcMatrixContainer').innerHTML = calcInputs.flat().join('');

			$$('.inputCalcMatrixItem').forEach((input, index) => (input.value = resultValues[index]));
		}
	};

	const printCalcMinusInputMatrixItem = () => {
		if (matrixHandler) {
			const resultValues = calcMinusInputValues();
			const calcInputs = new Array(+$('.inputNormalMatrixRow').value).fill(0).map(() => new Array(+$('.inputNormalMatrixCol').value).fill('<input class="inputCalcMatrixItem" readOnly >'));
			calcInputs.forEach((arr) => arr.push('<br>'));

			$('.divDisplayCalcMatrixContainer').innerHTML = calcInputs.flat().join('');

			$$('.inputCalcMatrixItem').forEach((input, index) => (input.value = resultValues[index]));
		}
	};

	const printCalcMultiplyInputMatrixItem = () => {
		//3
		if (matrixHandler) {
			const resultValues = calcMultiplyInputValues();
			const calcInputs = new Array(+$$('.inputNormalMatrixRow')[0].value).fill(0).map(() => new Array(+$$('.inputNormalMatrixCol')[1].value).fill('<input class="inputCalcMatrixItem" readOnly >'));
			calcInputs.forEach((arr) => arr.push('<br>'));

			$('.divDisplayCalcMatrixContainer').innerHTML = calcInputs.flat().join('');

			$$('.inputCalcMatrixItem').forEach((input, index) => (input.value = resultValues[index]));
		}
	};

	const clickButtonCalcPlus = () => {
		$('.buttonCalcPlus').addEventListener('click', () => {
			confirmExistInputs();
			confirmSameRowAndCol();
			confirmEmptyInputValues();
			confirmNumInputValues();
			printCalcPlusInputMatrixItem();
		});
	};

	const clickButtonCalcMinus = () => {
		$('.buttonCalcMinus').addEventListener('click', () => {
			confirmExistInputs();
			confirmSameRowAndCol();
			confirmEmptyInputValues();
			confirmNumInputValues();
			printCalcMinusInputMatrixItem();
		});
	};

	const clickButtonCalcMultiply = () => {
		$('.buttonCalcMultiply').addEventListener('click', () => {
			confirmExistInputs();
			confirmSameFirstRowAndSecondCol(); //1
			confirmEmptyInputValues();
			confirmNumInputValues();
			printCalcMultiplyInputMatrixItem();
		});
	};

	const main = () => {
		deleteModal();
		clickButtonCreateNormalMatrix();
		clickButtonRandomNormalMatrixContainer();
		clickButtonDeleteNormalMatrixContainer();
		clickButtonCalcPlus();
		clickButtonCalcMinus();
		clickButtonCalcMultiply();
	};

	main();
})();
