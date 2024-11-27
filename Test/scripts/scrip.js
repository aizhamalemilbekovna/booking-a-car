// Показывать нужную секцию (регистрация или вход)
function showAuthSection(section) {
    document.getElementById("registration").style.display = section === "register" ? "block" : "none";
    document.getElementById("login").style.display = section === "login" ? "block" : "none";
}

// Начальное состояние — показ формы регистрации
showAuthSection("register");

// Массив для хранения бронирований
let bookings = [];

// Загрузка существующих бронирований из localStorage при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
        bookings = JSON.parse(savedBookings);
        updateBookedCarsTable(); // Обновить таблицу забронированных автомобилей
        updateBookingHistoryTable(); // Обновить таблицу истории бронирований
        updateReportTable(); // Обновить таблицу отчета
    }
});

// Функция для сохранения бронирований в localStorage
function saveBookingsToLocalStorage() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Обновление таблицы забронированных автомобилей
function updateBookedCarsTable() {
    const bookedCarsList = document.getElementById("booked-cars-list");
    bookedCarsList.innerHTML = "";

    document.getElementById("booked-cars").style.display = bookings.length > 0 ? "block" : "none";

    bookings.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.car}</td>
            <td>${booking.startDate}</td>
            <td>${booking.endDate}</td>
        `;
        bookedCarsList.appendChild(row);
    });
}

// Обновление таблицы истории бронирований
function updateBookingHistoryTable() {
    const bookingHistoryList = document.getElementById("booking-history-list");
    bookingHistoryList.innerHTML = "";

    bookings.forEach((booking, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.car}</td>
            <td>${booking.startDate}</td>
            <td>${booking.endDate}</td>
            <td>
                <button class="button-edit" onclick="editBooking(${index})">Редактировать</button>
                <button class="button-delete" onclick="deleteBooking(${index})">Отменить</button>
            </td>
        `;
        bookingHistoryList.appendChild(row);
    });
}

// Обновление таблицы отчета
function updateReportTable() {
    const reportList = document.getElementById("report-list");
    reportList.innerHTML = "";

    bookings.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.car}</td>
            <td>${booking.startDate}</td>
            <td>${booking.endDate}</td>
        `;
        reportList.appendChild(row);
    });
}

// Добавление нового бронирования
function addBooking() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const car = document.getElementById("car").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    if (name && phone && car && startDate && endDate && new Date(startDate) <= new Date(endDate)) {
        bookings.push({ name, phone, car, startDate, endDate });
        saveBookingsToLocalStorage();
        updateBookedCarsTable(); // Обновить таблицу забронированных автомобилей
        updateBookingHistoryTable(); // Обновить таблицу истории бронирований
        updateReportTable(); // Обновить таблицу отчета

        // Очистка формы
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("car").value = "";
        document.getElementById("start-date").value = "";
        document.getElementById("end-date").value = "";

        alert("Бронирование успешно добавлено!");
    } else {
        alert("Пожалуйста, заполните все поля корректно.");
    }
}

// Функция для редактирования бронирования
function editBooking(index) {
    const booking = bookings[index];
    document.getElementById("name").value = booking.name;
    document.getElementById("phone").value = booking.phone;
    document.getElementById("car").value = booking.car;
    document.getElementById("start-date").value = booking.startDate;
    document.getElementById("end-date").value = booking.endDate;

    // Изменяем кнопку для подтверждения изменений
    const confirmButton = document.getElementById("price-action");
    confirmButton.textContent = "Сохранить изменения";
    confirmButton.onclick = function () {
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const car = document.getElementById("car").value;
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;

        if (name && phone && car && startDate && endDate && new Date(startDate) <= new Date(endDate)) {
            bookings[index] = { name, phone, car, startDate, endDate };
            saveBookingsToLocalStorage();
            updateBookedCarsTable(); // Обновить таблицу забронированных автомобилей
            updateBookingHistoryTable(); // Обновить таблицу истории бронирований
            updateReportTable(); // Обновить таблицу отчета

            // Очистка формы и возвращение обработчика на добавление
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("car").value = "";
            document.getElementById("start-date").value = "";
            document.getElementById("end-date").value = "";
            confirmButton.textContent = "Добавить";
            confirmButton.onclick = addBooking;

            alert("Бронирование успешно обновлено!");
        } else {
            alert("Пожалуйста, заполните все поля корректно.");
        }
    };
}

// Функция для отмены бронирования
function deleteBooking(index) {
    bookings.splice(index, 1);
    saveBookingsToLocalStorage();
    updateBookedCarsTable(); // Обновить таблицу забронированных автомобилей
    updateBookingHistoryTable(); // Обновить таблицу истории бронирований
    updateReportTable(); // Обновить таблицу отчета
    alert("Бронирование успешно отменено!");
}

// Назначаем обработчик для кнопки "Добавить" при загрузке
document.getElementById("price-action").onclick = addBooking;

// Регистрация пользователя
document.getElementById("register-button").onclick = function () {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Регистрация прошла успешно! Теперь вы можете войти.");
        showAuthSection("login"); // Переход на форму входа после регистрации
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
};

// Вход пользователя
document.getElementById("login-button").onclick = function () {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        alert("Вход выполнен успешно!");
        
        // Скрыть секцию авторизации и показать панель управления
        document.querySelector(".auth-container").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("welcome-username").textContent = username;
    } else {
        alert("Неверное имя пользователя или пароль.");
    }
};

// Выход из аккаунта
document.getElementById("logout-button").onclick = function () {
    document.getElementById("dashboard").style.display = "none";
    document.querySelector(".auth-container").style.display = "flex";
    showAuthSection("login"); // Возвращаемся к форме входа
};

// Переключение между регистрацией и входом
document.getElementById("to-login").onclick = function (event) {
    event.preventDefault();
    showAuthSection("login");
};

document.getElementById("to-register").onclick = function (event) {
    event.preventDefault();
    showAuthSection("register");
};

// Плавный скролл к секции с автомобилями
document.getElementById("main-action").onclick = function () {
    document.getElementById("cars").scrollIntoView({behavior: "smooth"});
};

// Плавный скролл к таблице забронированных автомобилей при клике на кнопки
var buttons = document.getElementsByClassName("car-button");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementById("booked-cars").scrollIntoView({behavior: "smooth"});
    }
}

// Анимация для изображения в секции отчета
document.addEventListener("mousemove", (event) => {
    let reportLayer = document.querySelector('.report-image');
    if (reportLayer) {
        reportLayer.style.transform = 'translate3d(' + ((event.clientX * 0.8) / 11) + 'px,' + ((event.clientY * 0.8) / 11) + 'px,0px)';
    }
});

// Анимация фона при прокрутке для главной секции
document.addEventListener("scroll", () => {
    const elem = document.querySelector(".main");
    if (elem) {
        elem.style.backgroundPositionX = '0' + (0.8 * window.pageYOffset) + 'px';
    }
});

// Функция для загрузки данных в отчет при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    updateReportTable();
});

// Функция для скачивания отчета в формате CSV
function downloadReport() {
    const savedBookings = localStorage.getItem("bookings");
    if (!savedBookings) return alert("Нет данных для скачивания.");

    const bookings = JSON.parse(savedBookings);
    let csvContent = "Имя,Телефон,Автомобиль,Дата начала,Дата окончания\n";

    bookings.forEach(booking => {
        csvContent += `${booking.name},${booking.phone},${booking.car},${booking.startDate},${booking.endDate}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Отчёт_по_Бронированным_Автомобилям.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Функция для печати отчета
function printReport() {
    window.print();
}

// Глобальная переменная для хранения имени текущего пользователя после входа
let currentUser = "";

// Функция обновления таблицы истории бронирований только для текущего пользователя
function updateBookingHistoryTable() {
    const bookingHistoryList = document.getElementById("booking-history-list");
    bookingHistoryList.innerHTML = "";

    bookings.forEach((booking, index) => {
        if (booking.name === currentUser) { // Проверка на текущего пользователя
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.name}</td>
                <td>${booking.phone}</td>
                <td>${booking.car}</td>
                <td>${booking.startDate}</td>
                <td>${booking.endDate}</td>
                <td>
                    <button class="button-edit" onclick="editBooking(${index})">Редактировать</button>
                    <button class="button-delete" onclick="deleteBooking(${index})">Отменить</button>
                </td>
            `;
            bookingHistoryList.appendChild(row);
        }
    });
}

// Функция добавления нового бронирования с привязкой к имени текущего пользователя
function addBooking() {
    const name = currentUser; // Используем имя вошедшего пользователя
    const phone = document.getElementById("phone").value;
    const car = document.getElementById("car").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    if (phone && car && startDate && endDate && new Date(startDate) <= new Date(endDate)) {
        bookings.push({ name, phone, car, startDate, endDate });
        saveBookingsToLocalStorage();
        updateBookedCarsTable();
        updateBookingHistoryTable();
        updateReportTable();

        // Очистка формы
        document.getElementById("phone").value = "";
        document.getElementById("car").value = "";
        document.getElementById("start-date").value = "";
        document.getElementById("end-date").value = "";

        alert("Бронирование успешно добавлено!");
    } else {
        alert("Пожалуйста, заполните все поля корректно.");
    }
}

// Функция для входа пользователя
document.getElementById("login-button").onclick = function () {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        currentUser = username; // Устанавливаем имя текущего пользователя
        alert("Вход выполнен успешно!");
        
        // Скрыть секцию авторизации и показать панель управления
        document.querySelector(".auth-container").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("welcome-username").textContent = username;

        updateBookedCarsTable(); // Обновить таблицу забронированных автомобилей
        updateBookingHistoryTable(); // Обновить таблицу истории бронирований для текущего пользователя
        updateReportTable(); // Обновить таблицу отчета
    } else {
        alert("Неверное имя пользователя или пароль.");
    }
};

// Функция редактирования бронирования
function editBooking(index) {
    const booking = bookings[index];
    if (booking.name !== currentUser) return; // Только текущий пользователь может редактировать свои брони

    document.getElementById("phone").value = booking.phone;
    document.getElementById("car").value = booking.car;
    document.getElementById("start-date").value = booking.startDate;
    document.getElementById("end-date").value = booking.endDate;

    const confirmButton = document.getElementById("price-action");
    confirmButton.textContent = "Сохранить изменения";
    confirmButton.onclick = function () {
        const phone = document.getElementById("phone").value;
        const car = document.getElementById("car").value;
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;

        if (phone && car && startDate && endDate && new Date(startDate) <= new Date(endDate)) {
            bookings[index] = { name: currentUser, phone, car, startDate, endDate };
            saveBookingsToLocalStorage();
            updateBookedCarsTable();
            updateBookingHistoryTable();
            updateReportTable();

            document.getElementById("phone").value = "";
            document.getElementById("car").value = "";
            document.getElementById("start-date").value = "";
            document.getElementById("end-date").value = "";
            confirmButton.textContent = "Добавить";
            confirmButton.onclick = addBooking;

            alert("Бронирование успешно обновлено!");
        } else {
            alert("Пожалуйста, заполните все поля корректно.");
        }
    };
}

// Функция для отмены бронирования
function deleteBooking(index) {
    const booking = bookings[index];
    if (booking.name !== currentUser) return; // Только текущий пользователь может отменять свои брони

    bookings.splice(index, 1);
    saveBookingsToLocalStorage();
    updateBookedCarsTable();
    updateBookingHistoryTable();
    updateReportTable();
    alert("Бронирование успешно отменено!");
}

