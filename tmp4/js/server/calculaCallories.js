function calculate() {
	let height = +document.getElementById("in_height").value,
		weight = +document.getElementById("in_weight").value,
		age = +document.getElementById("in_age").value,
		gender = document.getElementsByName("in_sex"),
		strUser = document.getElementById("in_activity").value,
		result = document.getElementsByClassName("result"),
		calc = "",
		calc15 = "",
		calc25 = "",
		calc40 = "",
		d_rst = document.getElementsByClassName("rst");

	if (isNaN(height) || height < 1 || height > 250 || isNaN(weight) || weight < 1 || weight > 250 || isNaN(age) || age < 1 || age > 150) {
		alert("Неверный ввод!");
	} else {
		if (gender[0].checked) {
			calc = (10 * weight + 6.25 * height - 5 * age + 5) * strUser;
		} else {
			calc = (10 * weight + 6.25 * height - 5 * age - 161) * strUser;
		}
		d_rst[0].style.display = "block";
		result[0].innerHTML =
			"Cуточная норма калорий по формуле Миффлина - Сан Жеора: " +
			"<b>" +
			calc.toFixed() +
			" ккал.</b>";
		calc15 = calc.toFixed() * 0.85;
		result[1].innerHTML =
			"Для похудения в безопасном режиме уменьшите норму потребления: " +
			"<b>до " +
			calc15.toFixed() +
			" ккал.</b>";
		calc25 = calc.toFixed();
		result[2].innerHTML =
			"Для похудения в быстром режиме уменьшите норму потребления: " +
			"<b>до " +
			calc25.toFixed() +
			" ккал.</b>";
		calc40 = calc.toFixed() * 0.6;
		result[3].innerHTML =
			"Для похудения в экстренном режиме уменьшите норму потребления: " +
			"<b>до " +
			calc40.toFixed() +
			" ккал.</b>";
	}
}
