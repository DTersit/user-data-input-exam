document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const clearButton = document.getElementById('clearButton');

    // Load data from local storage
    loadStoredData();

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);
        
        if (age >= 18) {
            if (age <= 100) {
                const userData = { firstName, lastName, age };
                addUserToTable(userData);
                storeUserData(userData);  
            } else {
                alert('User can not be older than 100 year')
            }
        } else {
            alert('User must be 18 years or older.');
        }
    });

    clearButton.addEventListener('click', function() {
        clearTable();
    });

    // This function add new row with user data to the table
    function addUserToTable(user) {
        const newRow = dataTable.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.textContent = user.firstName;
        cell2.textContent = user.lastName;
        cell3.textContent = user.age;
    }

    // This function save Users data from table to local storage
    function storeUserData(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // This function load Users data to table from local storage
    function loadStoredData() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUserToTable(user));
    }

    // This function clear the table when button "Clear Table" is pressed
    function clearTable() {
        localStorage.removeItem('users');
        while (dataTable.rows.length > 0) {
            dataTable.deleteRow(0);
        }
    }
});
