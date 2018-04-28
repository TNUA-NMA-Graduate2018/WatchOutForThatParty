function required() {
	var msg = "";
	var alertFlag = false;
	if (document.getElementById('number').value.length == 0) {
		alertFlag = true;
		msg = msg+ "尚未填寫訂單編號\n\n"
	}
	if (document.getElementById('email').value.length == 0) {
		alertFlag = true;
		msg = msg+ "尚未填寫Email\n\n"
	}
	if (document.getElementById('name').value.length == 0) {
		alertFlag = true;
		msg = msg+ "尚未填寫姓名\n\n"

	}
	if (document.getElementById('phone').value.length == 0) {
		alertFlag = true;
		msg = msg+ "尚未填寫聯絡電話\n\n"
	}
	if (document.getElementById('date').value==="選擇參與場次日期") {
		alertFlag = true;

		msg = msg+ "尚未填寫參與日期\n\n";

	}
	if (document.getElementById('time').value==="選擇參與場次時間") {
		alertFlag = true;

		msg = msg+ "尚未填寫參與時間\n\n";
	}
	if (alertFlag === true) {
		alert(msg);
		return false;
	}
	else return true;
}
