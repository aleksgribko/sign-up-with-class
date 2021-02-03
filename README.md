Workshop specification

Platform with a login system and user personal info

Must have:

- sign up system (password and name),
- user should be created via User Class and its method: signUp(mandatory: name, password, not mandatory: user photo, date of birth and phone),

- all manipulations on user should be made with User Class Methods,
- when user is created - hide signup form and display a card with user information (obviously, do not display password)

Should have
-check if password contain min 8 symbols and one special character and no spaces,

- log out system - returns to the sign up form,
- user data is store in the local Storage

Nice to have

- repo on github
- nice UI,
- user can change his personal info,
- when user changes the password, he has only 3 attempts to enter the correct password - after he can't change (in real life it could be a good idea to send an email to the user asking to reset the password).

Info:

- for the user file input use: FileReader API,
- for storing user data use: localStorage
