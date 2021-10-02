/* Double range slider */
const inputLeft = document.getElementById("input-left");
const inputRight = document.getElementById("input-right");

const thumbLeft = document.querySelector(".slider > .thumb.left");
const thumbRight = document.querySelector(".slider > .thumb.right");
const range = document.querySelector(".slider > .range");

let year1 = document.getElementById('year1');
let year2 = document.getElementById('year2');

/* Double range slider - left thumb */
const setLeftValue = () => {
	let min = parseInt(inputLeft.min);
	let max = parseInt(inputLeft.max);

    inputLeft.value = Math.min(parseInt(inputLeft.value), parseInt(inputRight.value) - 1);

	const percent = ((inputLeft.value - min) / (max - min)) * 100;

	thumbLeft.style.left = percent + "%";
	range.style.left = percent + "%";

    year1.textContent = inputLeft.value;
}

/* Double range slider - right thumb */
const setRightValue = () => {
	let min = parseInt(inputRight.min)
	let max = parseInt(inputRight.max);

    inputRight.value = Math.max(parseInt(inputRight.value), parseInt(inputLeft.value) + 1);

	const percent = ((inputRight.value - min) / (max - min)) * 100;

	thumbRight.style.right = (100 - percent) + "%";
	range.style.right = (100 - percent) + "%";

    year2.textContent = parseInt(inputRight.value);
}

setLeftValue();
setRightValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);