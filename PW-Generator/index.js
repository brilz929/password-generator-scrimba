// Dark mode toggle functionality
const themeSwitch = document.getElementById('theme-switch');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
themeSwitch.checked = currentTheme === 'dark';

themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Password generation elements
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const passwordContainer = document.getElementById('passwordsContainer');
const resetBtn = document.getElementById('resetBtn');

// Reset functionality
resetBtn.addEventListener('click', () => {
    lengthInput.value = '';
    uppercaseCheckbox.checked = true;
    lowercaseCheckbox.checked = true;
    numbersCheckbox.checked = true;
    symbolsCheckbox.checked = true;
    passwordContainer.innerHTML = '';
});

function randomChar(charSet) {
    let randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
}

function generateRandomPassword() {
    let passwordLength = lengthInput.value;
    
    
    // Check if length is actually entered
    if (!passwordLength || lengthInput.value === '') {
        alert("Please enter a password length.");
        return null;
    }
    
    // Validate length range
    if (passwordLength < 8 || passwordLength > 32) {
        alert("Password length must be between 8 and 32 characters.");
        return null;
    }

    let selectedCharacters = "";

    if (uppercaseCheckbox.checked) selectedCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercaseCheckbox.checked) selectedCharacters += "abcdefghijklmnopqrstuvwxyz";
    if (numbersCheckbox.checked) selectedCharacters += "0123456789";
    if (symbolsCheckbox.checked) selectedCharacters += "~`!@#$%^&*()_-+={[}]|:;<,>.?/";
    
    if (selectedCharacters === "") {
        showAlert("Please select at least one character type.");
        return null;
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        password += randomChar(selectedCharacters);
    }   
    return password;
}

function createPasswordElement(password) {
    const passwordItem = document.createElement('div');
    passwordItem.className = 'password-item';
    passwordItem.innerHTML = `
        <span class="password-text">${password}</span>
        <button class="copy-btn" data-password="${password}">Copy</button>`;

    passwordItem.querySelector('.copy-btn').addEventListener('click', function(e) {
        const passwordToCopy = e.target.dataset.password;
        navigator.clipboard.writeText(passwordToCopy);
        e.target.textContent = 'Copied!';
        setTimeout(() => {
            e.target.textContent = 'Copy';
        }, 2000);
    });

    return passwordItem;
}

function generatePasswords() {
    passwordContainer.innerHTML = '';

    // Generate 2 passwords
    for (let i = 0; i < 2; i++) {
        const newPassword = generateRandomPassword();
        if (newPassword) {
            const passwordElement = createPasswordElement(newPassword);
            passwordContainer.appendChild(passwordElement);
        } else {
            return;
        }
    }
}

// Event listener for the generate button
generateBtn.addEventListener('click', generatePasswords);