let user;

// HANDLERS

const handleLogIn = () => {
  user && user.logIn();
};

const handleRenderChangeUserDataForm = () => {
  user && user.renderChangeUserDataForm();
};

const handleSignOut = () => {
  user && user.signOut();
};

const handleSaveNewUserData = () => {
  user && user.saveNewUserData();
};

// CONTENT

const mainContent = document.getElementById("mainContent");

// INPUTS

const nameInput = document.getElementById("nameInput");
const passwordInput = document.getElementById("passwordInput");
const dateInput = document.getElementById("dateInput");
const phoneInput = document.getElementById("phoneInput");
const userImgInput = document.getElementsByClassName("userImage");
const form = document.getElementsByTagName("form");
const changeDataButton = document.getElementById("changeDataButton");
const loginButton = document.getElementById("loginButton");
const passwordOldInput = document.getElementById("passwordOldInput");

// OUTPUTS

const nameOutput = document.getElementById("nameOutput");
const phoneOutput = document.getElementById("phoneOutput");
const dateOutput = document.getElementById("dateOutput");

// ENCODE IMG

function encodeImageFileAsURL(element) {
  const file = element.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    userImgInput[0].style.display = "block";
    userImgInput[0].style.backgroundImage = `url(${reader.result})`;

    localStorage.setItem("tempPhoto", reader.result);
  };

  reader.readAsDataURL(file);
}

class User {
  attempts = 3;

  constructor(name, password, date, phone, photo) {
    this.name = name;
    this.password = password;
    this.date = date;
    this.phone = phone;
    this.photo = photo;
  }

  logIn() {
    form[0].style.display = "none";
    nameOutput.innerText = this.name;
    phoneOutput.innerText = this.phone ? this.phone : "not provided";
    dateOutput.innerText = this.date ? this.date : "not provided";

    if (this.photo) {
      userImgInput[1].style.display = "block";
      userImgInput[1].style.backgroundImage = `url(${this.photo})`;
      localStorage.removeItem("tempPhoto");
    }

    // clean up

    nameInput.value = null;
    passwordInput.value = null;
    dateInput.value = null;
    phoneInput.value = null;

    //  show

    mainContent.style.display = "flex";
  }

  static isInputValid() {
    if (!nameInput.value || !passwordInput.value) {
      alert("the input is empty, please provide user name / password");
      return false;
    }

    if (passwordInput.value.length < 8) {
      alert("the password has less than 8 characters");
      return false;
    }

    if (passwordInput.value.includes(" ")) {
      alert("the password must not contain spaces");
      return false;
    }

    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!passwordInput.value.match(format)) {
      alert("the password doesn't contain any special characters");
      return false;
    }
    return true;
  }

  static createUser() {
    if (!User.isInputValid()) return null;

    const photo = localStorage.getItem("tempPhoto");

    user = new User(
      nameInput.value,
      passwordInput.value,
      dateInput.value,
      phoneInput.value,
      photo
    );

    localStorage.setItem("user", JSON.stringify(user));

    handleLogIn();
  }

  isCorrectOldPasswordProvided() {
    if (this.password !== passwordOldInput.value) {
      this.attempts--;
      if (this.attempts === 0) {
        alert("You can't change your password anymore");
      } else {
        alert(`You entered wrong password, you have ${this.attempts} left`);
      }
      return false;
    }
    return true;
  }

  saveNewUserData() {
    if (passwordInput.value) {
      if (!this.isCorrectOldPasswordProvided()) return null;
      if (!User.isInputValid()) return null;
    }

    const photo = localStorage.getItem("tempPhoto");

    this.name = nameInput.value;
    this.password = passwordInput.value?.length
      ? passwordInput.value
      : this.password;
    this.date = dateInput.value;
    this.phone = phoneInput.value;
    this.photo = photo;

    localStorage.setItem("user", JSON.stringify(user));

    handleLogIn();
  }

  renderChangeUserDataForm() {
    mainContent.style.display = "none";
    document.getElementById("passwordOld").style.display = "flex";
    nameInput.value = this.name;
    dateInput.value = this.date;
    phoneInput.value = this.phone;
    localStorage.setItem("tempPhoto", this.photo);
    form[0].style.display = "flex";
    changeDataButton.style.display = "block";
    loginButton.style.display = "none";
  }

  signOut() {
    localStorage.removeItem("user");
    mainContent.style.display = "none";
    nameOutput.innerText = "";
    phoneOutput.innerText = "";
    dateOutput.innerText = "";
    form[0].style.display = "flex";
  }
}

(function restoreSession() {
  const userFromStorage = JSON.parse(localStorage.getItem("user"));

  if (userFromStorage) {
    user = new User(
      userFromStorage.name,
      userFromStorage.password,
      userFromStorage.date,
      userFromStorage.phone,
      userFromStorage.photo
    );

    user.logIn();
  }
})();
