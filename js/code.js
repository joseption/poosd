const urlBase = 'http://joseption.com/api';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
var currentSearch = "";
var isAddingContact = false;

document.addEventListener('DOMContentLoaded', function () {
	if (document.location.href.includes("contacts.html")) {
		readCookie(true);
		inputMaskSetup.init();
		document.getElementById("closeRemoveContact").addEventListener("click", closeRemoveDialog);
		document.getElementById("confirmContactRemove").addEventListener("click", confirmRemove);
		document.getElementById("userName").innerHTML = firstName + " " + lastName;
		document.addEventListener("keyup", function (e) {
			if (e.key == "Enter") {
				if (isAddingContact)
					document.getElementById("addContactButton").click();
				else
					document.getElementById("searchContactButton").click();
			}
		});
	} else if (document.getElementById("homepage")) {
		readCookie();
	} else if (document.location.href.includes("login.html") ||
		document.location.href.includes("register.html")) {
		document.addEventListener("keyup", function (e) {
			if (e.key == "Enter") {
				document.getElementById("loginButton").click();
			}
		});
	}
});

function doLogin() {
	userId = 0;
	firstName = "";
	lastName = "";
	var hasError = false;

	let login = document.getElementById("loginName");
	let password = document.getElementById("loginPassword");

	if (!login.value) {
		hasError = true;
		login.classList.add("input-error");
	} else
		login.classList.remove("input-error");

	if (!password.value) {
		hasError = true;
		password.classList.add("input-error");
	} else
		password.classList.remove("input-error");

	if (hasError) {
		document.getElementById("loginResult").innerHTML = "All fields are required";
		return;
	} else
		document.getElementById("loginResult").innerHTML = "";

	let tmp = {
		login: login.value,
		password: password.value
	};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject['id'];
				if (jsonObject['error']) {
					if (jsonObject['error'] == "No Records Found")
						document.getElementById("loginResult").innerHTML = "An account with that username does not exist";
					else
						document.getElementById("loginResult").innerHTML = jsonObject['error'];
				} else {
					if (userId < 1) {
						document.getElementById("loginName").classList.add("input-error");
						document.getElementById("loginPassword").classList.add("input-error");
						document.getElementById("loginResult").innerHTML = "The username or password was incorrect";
						return;
					}

					firstName = jsonObject['firstName'];
					lastName = jsonObject['lastName'];

					saveCookie();

					window.location.href = "contacts.html";
				}
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("loginName").classList.add("input-error");
		document.getElementById("loginPassword").classList.add("input-error");
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegister() {
	userId = 0;
	firstName = "";
	lastName = "";
	var hasError = false;

	let login = document.getElementById("loginName");
	let password = document.getElementById("loginPassword");
	let first = document.getElementById("firstName");
	let last = document.getElementById("lastName");

	if (!first.value) {
		hasError = true;
		first.classList.add("input-error");
	} else
		first.classList.remove("input-error");

	if (!last.value) {
		hasError = true;
		last.classList.add("input-error");
	} else
		last.classList.remove("input-error");

	if (!login.value) {
		hasError = true;
		login.classList.add("input-error");
	} else
		login.classList.remove("input-error");

	if (!password.value) {
		hasError = true;
		password.classList.add("input-error");
	} else
		password.classList.remove("input-error");

	if (hasError) {
		document.getElementById("loginResult").innerHTML = "All fields are required";
		return;
	} else
		document.getElementById("loginResult").innerHTML = "";

	let tmp = {
		login: login.value,
		password: password.value,
		firstName: first.value,
		lastName: last.value
	};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/Register.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject['id'];
				if (jsonObject['error'] != "Account Created") {
					document.getElementById("loginResult").innerHTML = jsonObject['error'];
				} else {
					if (userId < 1) {
						document.getElementById("loginResult").innerHTML = "There was an error creating the account";
						return;
					}

					firstName = jsonObject['firstName'];
					lastName = jsonObject['lastName'];

					saveCookie();

					window.location.href = "contacts.html";
				}
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId;
}

function readCookie(stayOnPage) {
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for (var i = 0; i < splits.length; i++) {
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		} else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		} else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}

	if (userId < 0 || isNaN(userId)) {
		window.location.href = "login.html";
	} else if (!stayOnPage) {
		window.location.href = "contacts.html";
	}
}

function doLogout() {
	userId = -1;
	firstName = "";
	lastName = "";
	document.cookie = "firstName=,lastName=,userId=";
	readCookie();
}

function addContact() {
	var hasError = false;
	var hasEmailError = false;
	let fname = document.getElementById("contactName");
	let phone = document.getElementById("contactPhone");
	let email = document.getElementById("contactEmail");
	document.getElementById("contactAddResult").innerHTML = "";

	if (!fname.value) {
		hasError = true;
		fname.classList.add("input-error");
	} else
		fname.classList.remove("input-error");

	if (!phone.value) {
		hasError = true;
		document.getElementById("contactPhoneMaskInput").classList.add("input-error");
	} else
		document.getElementById("contactPhoneMaskInput").classList.remove("input-error");

	if (!email.value) {
		hasError = true;
		email.classList.add("input-error");
	} else {
		var regex = /\S+@\S+\.\S+/;
		if (!regex.test(email.value)) {
			hasEmailError = true;
			email.classList.add("input-error");
		} else {
			email.classList.remove("input-error");
		}
	}

	if (hasError) {
		document.getElementById("contactAddResult").innerHTML = "All fields are required";
		return;
	} else if (hasEmailError) {
		document.getElementById("contactAddResult").innerHTML = "Please enter a valid email address";
		return;
	}

	let tmp = {
		contact: {
			name: fname.value,
			phone: phone.value,
			email: email.value,
		},
		userId: userId,
	};
	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + '/AddContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jObj = JSON.parse(xhr.responseText);
				if (jObj['error'] != "Contact Added") {
					document.getElementById("contactAddResult").innerHTML = jObj['error'];
				} else {
					document.getElementById("contactAddResult").innerHTML = "<span style='color:green !important;'>Contact added successfully</span>";
					if (document.getElementById("contactItems").innerHTML && jObj['name'].toLowerCase().includes(currentSearch.toLowerCase())) {
						addContactToResultList(jObj, true);
						closeRemoveDialog();
					}
					fname.value = "";
					phone.value = "";
					document.getElementById("contactPhoneMaskInput").value = "";
					document.getElementById("contactPhoneMaskInput").placeholder = "Phone"
					email.value = "";
				}
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}

function handleContactResults(res) {
	//need to save the current search to currentSearch
	//need to build search display even if empty, but hide it and if a contact is added and it fits the criteria, add it and then display the search
	if (document.getElementById("contactItems").innerHTML) {
		showLoadingContactResults();
	}

	document.getElementById("contactSearchResult").innerHTML = "";
	for (let i = 0; i < res.length; i++) {
		(function () {
			addContactToResultList(res[i]);
		})();
	}

	document.getElementById("contactList").style.display = "block";
	closeRemoveDialog();
}

function addContactToResultList(user, isNew) {
	let contactItems = document.getElementById("contactItems");
	var container = document.createElement("div");
	container.classList.add("search-content");
	if (isNew)
		container.classList.add("new-result");

	var id = document.createElement("div");
	id.innerText = user['id'];
	id.style.display = "none";

	var name = document.createElement("div");
	var nameLabel = document.createElement("div");
	var nameInput = document.createElement("input");
	nameInput.style.display = "none";
	nameLabel.innerText = user['name'];
	nameInput.value = nameLabel.innerText;
	name.appendChild(nameLabel);
	name.appendChild(nameInput);

	var phone = document.createElement("div");
	var phoneLabel = document.createElement("div");
	var phoneInput = document.createElement("input");
	var phoneContainer = document.createElement("div");
	phoneContainer.style.display = "none";
	phoneInput.style.display = "none";
	phoneInput.setAttribute("default-placeholder", "");
	phoneLabel.innerText = user['phone'];
	phoneLabel.classList.add("phone-number-label-masked");
	phoneInput.value = phoneLabel.innerText;
	phoneInput.classList.add("phone-number-masked");
	phoneInput.id = "phone_input_" + user['id'];
	phone.appendChild(phoneLabel);
	phoneContainer.appendChild(phoneInput);
	phone.appendChild(phoneContainer);

	var email = document.createElement("div");
	var emailLabel = document.createElement("div");
	var emailInput = document.createElement("input");
	emailInput.style.display = "none";
	emailLabel.innerText = user['email'];
	emailInput.value = emailLabel.innerText;
	email.appendChild(emailLabel);
	email.appendChild(emailInput);

	var remove = document.createElement("div");
	remove.innerText = "Remove";
	remove.classList.add("btn");
	remove.classList.add("btn-danger");

	var edit = document.createElement("div");
	edit.innerText = "Edit";
	edit.classList.add("btn");
	edit.classList.add("btn-success");

	var update = document.createElement("div");
	update.innerText = "Update";
	update.style.display = "none";
	update.classList.add("btn");
	update.classList.add("btn-success");

	var cancel = document.createElement("div");
	cancel.innerText = "Cancel";
	cancel.style.display = "none";
	cancel.classList.add("btn");
	cancel.classList.add("btn-danger");

	var btns = document.createElement("div");
	var info = document.createElement("div");
	btns.classList.add("search-btns");
	info.classList.add("search-info");
	info.appendChild(id);
	info.appendChild(name);
	info.appendChild(phone);
	info.appendChild(email);
	container.appendChild(info);
	btns.appendChild(remove);
	btns.appendChild(edit);
	btns.appendChild(cancel);
	btns.appendChild(update);
	container.appendChild(btns);

	edit.addEventListener("click", function () {
		remove.style.display = "none";
		edit.style.display = "none";
		update.style.display = "block";
		cancel.style.display = "block";
		nameInput.style.display = "block";
		phoneContainer.style.display = "block";
		emailInput.style.display = "block";
		nameLabel.style.display = "none";
		phoneLabel.style.display = "none";
		emailLabel.style.display = "none";
	});

	cancel.addEventListener("click", function () {
		remove.style.display = "block";
		edit.style.display = "block";
		update.style.display = "none";
		cancel.style.display = "none";
		nameInput.style.display = "none";
		phoneContainer.style.display = "none";
		emailInput.style.display = "none";
		nameLabel.style.display = "block";
		phoneLabel.style.display = "block";
		emailLabel.style.display = "block";
		nameInput.value = nameLabel.innerText;
		phoneInput.value = formatPhoneNumber(phoneLabel.innerText);
		emailInput.value = emailLabel.innerText;
	});

	update.addEventListener("click", function () {
		var hasError = false;
		if (!nameInput.value) {
			hasError = true;
			nameInput.classList.add("input-error");
		} else
			nameInput.classList.remove("input-error");

		var phoneNum = document.getElementById(phoneInput.id);
		if (!phoneNum.value) {
			hasError = true;
			document.getElementById(phoneInput.id + "MaskInput").classList.add("input-error");
		} else
			document.getElementById(phoneInput.id + "MaskInput").classList.remove("input-error");

		var regex = /\S+@\S+\.\S+/;
		if (!emailInput.value || !regex.test(emailInput.value)) {
			hasError = true;
			emailInput.classList.add("input-error");
		} else {
			emailInput.classList.remove("input-error");
		}

		if (hasError)
			return;

		remove.style.display = "block";
		edit.style.display = "block";
		update.style.display = "none";
		cancel.style.display = "none";
		nameInput.style.display = "none";
		phoneContainer.style.display = "none";
		emailInput.style.display = "none";
		nameLabel.style.display = "block";
		phoneLabel.style.display = "block";
		emailLabel.style.display = "block";
		nameLabel.innerText = nameInput.value;
		var phoneNum = document.getElementById(phoneInput.id);
		phoneLabel.innerText = formatPhoneNumber(phoneNum.value);
		emailLabel.innerText = emailInput.value;
	});

	remove.addEventListener("click", function () {
		promptRemove(user['id'], nameLabel.innerText, container);
	});

	if (isNew)
		contactItems.prepend(container);
	else
		contactItems.appendChild(container);
	if (container.innerHTML) {
		document.getElementById("mainContactContent").style.display = "flex";
		setTimeout(() => {
			document.getElementById("mainContactContent").classList.remove("no-height");
		}, 50);
	}

	labelMaskSetup.init();
	inputMaskSetup.init(true);
}

function showLoadingContactResults() {
	document.getElementById("removeContactDialog").classList.remove("default-scale");
	document.getElementById("removeContactDialog").style.display = "none";
	document.getElementById("mainContactContent").classList.add("blur");
	document.getElementById("removeContactContainer").style.display = "block";
	document.getElementById("loading").style.display = "block";
}

function promptRemove(id, user, container) {
	document.getElementById("removeContactDialog").style.display = "flex";
	document.getElementById("contactNameToRemove").innerText = user;
	document.getElementById("contactNameToRemoveError").innerText = user;
	document.getElementById("mainContactContent").classList.add("blur");
	document.getElementById("removeContactContainer").style.display = "block";
	setTimeout(() => {
		document.getElementById("removeContactDialog").classList.add("default-scale");
	}, 50);
	document.getElementById("confirmContactRemove").innerText = "Confirm";
	document.getElementById("confirmContactRemove").userID = id;
	document.getElementById("confirmContactRemove").userItem = container;
	document.getElementById("removeContactMessageError").style.display = "none";
	document.getElementById("removeContactMessage").style.display = "block";
}

function confirmRemove(event) {
	let item = event.currentTarget.userItem;
	let tmp = {
		ID: event.currentTarget.userID
	};
	let jsonPayload = JSON.stringify(tmp);
	let url = urlBase + '/DeleteContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jObj = JSON.parse(xhr.responseText);
				if (jObj['error'] != "Contact Deleted") {
					document.getElementById("confirmContactRemove").innerText = "Try Again";
					document.getElementById("removeContactMessageError").style.display = "block";
					document.getElementById("removeContactMessage").style.display = "none";
				} else {
					item.parentElement.removeChild(item);
					if (!document.getElementById("contactItems").innerHTML)
						document.getElementById("mainContactContent").style.display = "none";
					closeRemoveDialog();
				}
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("confirmContactRemove").innerText = "Try Again";
		document.getElementById("removeContactMessageError").style.display = "block";
		document.getElementById("removeContactMessage").style.display = "none";
	}
}

function closeRemoveDialog() {
	document.getElementById("loading").style.display = "none";
	document.getElementById("removeContactDialog").classList.remove("default-scale");
	setTimeout(() => {
		document.getElementById("mainContactContent").classList.remove("blur");
		document.getElementById("removeContactContainer").style.display = "none";
		document.getElementById("removeContactDialog").style.display = "none";
	}, 50);
}

function searchContact() {
	let srch = document.getElementById("searchText").value;
	currentSearch = srch;
	document.getElementById("contactSearchResult").innerHTML = "";
	document.getElementById("contactItems").innerHTML = "";
	let tmp = {
		search: srch,
		userId: userId
	};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/SearchContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactSearchResult").innerHTML = "";
				let jsonObject = JSON.parse(xhr.responseText);
				if (jsonObject['error']) {
					document.getElementById("contactSearchResult").innerHTML = jsonObject['error'];
				} else {
					handleContactResults(jsonObject['results']);
				}
			} else {
				document.getElementById("contactSearchResult").innerHTML = "There was a problem retrieving existing contacts";
			}
		};
		xhr.send(jsonPayload);
	} catch (err) {
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}

function openAddContactDialog() {
	isAddingContact = true;
	document.getElementById("addContactDiv").style.display = "none";
	document.getElementById("searchContactDiv").style.display = "flex";
	document.getElementById("addContactDialog").style.display = "flex";
	document.getElementById("accessUIDiv").classList.add("no-height");
	document.getElementById("mainContactContent").classList.add("no-scale");
	setTimeout(() => {
		document.getElementById("inputForm").classList.remove("no-height");
		document.getElementById("accessUIDiv").style.display = "none";
	}, 150);
}

function openSearchContactDialog() {
	isAddingContact = false;
	setTimeout(() => {
		document.getElementById("addContactDiv").style.display = "flex";
		document.getElementById("searchContactDiv").style.display = "none";
		document.getElementById("addContactDialog").style.display = "none";
		document.getElementById("accessUIDiv").classList.remove("no-height");
		document.getElementById("mainContactContent").classList.remove("no-scale");
		document.getElementById("contactName").value = "";
		document.getElementById("contactPhone").value = "";
		document.getElementById("contactPhoneMaskInput").value = "";
		document.getElementById("contactEmail").value = "";
		document.getElementById("contactName").classList.remove("input-error");
		document.getElementById("contactPhoneMaskInput").classList.remove("input-error");
		var phonePlaceHolder = document.getElementById("contactPhone").getAttribute("default-placeholder");
		document.getElementById("contactPhoneMaskInput").placeholder = phonePlaceHolder;
		document.getElementById("contactEmail").classList.remove("input-error");
		document.getElementById("contactAddResult").innerText = "";
	}, 150);
	document.getElementById("inputForm").classList.add("no-height");
	document.getElementById("accessUIDiv").style.display = "flex";
	document.getElementById("contactSearchResult").innerText = "";
}

function formatPhoneNumber(value) {
	var placeholder = "(999) 999-9999",
		newValue = '',
		i, j, isInt,
		strippedValue = value.replace(/\D/g, ""),
		l = placeholder.length,
		maskedPhoneNumber = 'XdDmMyY9';

	for (i = 0, j = 0; i < l; i++) {
		isInt = !isNaN(parseInt(strippedValue[j]));
		matchesNumber = maskedPhoneNumber.indexOf(placeholder[i]) >= 0;

		if (matchesNumber && isInt) {
			newValue += strippedValue[j++];

		} else if (matchesNumber && !isInt) {
			return newValue;

		} else {
			newValue += placeholder[i];
		}

		if (strippedValue[j] == undefined) {
			break;
		}
	}
	if (newValue.length > 1) {
		return newValue;
	} else {
		return "";
	}
}