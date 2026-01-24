
(async function() {
  const data = await fetch("./src/data.json");
  const res = await data.json();

  let employees = res;

  let selectedEmployeeId = employees[0].id;

  let selectedEmployee = employees[0];

  const employeesNameList = document.querySelector(".employee__names--list");
  const employeeInfo = document.querySelector(".employee__single--info");

  // Add Employee
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener('click', () => {
    addEmployeeModal.style.display = 'flex';
  });

  addEmployeeModal.addEventListener('click', (e) => {
    if (e.target.className === 'addEmployee') {
      addEmployeeModal.style.display = 'none';
    }
  });

  const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}` 

  addEmployeeForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];

    const empdata = Object.fromEntries(values);
    empdata.id = employees[employees.length - 1].id + 1;
    empdata.imageUrl = empdata.imageUrl || "https://www.w3schools.com/howto/img_avatar.png";
    employees.push(empdata);
    renderEmployeeNames();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = 'none';
  });

  employeesNameList.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN' && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployeeNames();
      renderSingleEmplyee();
    }
     if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmplyee();
      }
      renderEmployeeNames();
    }
  });


  const renderEmployeeNames = () => {
    employeesNameList.innerHTML = '';
    employees.forEach((emp) => {
      const employee = document.createElement('span');
      employee.classList.add("employee__names--item")
      
      if (Number(selectedEmployeeId) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="delete-emp">X</i>`
      employee.setAttribute("id", emp.id);
      employeesNameList.append(employee);
    });
  }


  const renderSingleEmplyee = () => {

    employeeInfo.innerHTML = `
      <img src="${selectedEmployee.imageUrl}" />
      <span class="employee__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName}</span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>Mobile - ${selectedEmployee.phone}</span>
      <span>DOB - ${selectedEmployee.birthDate}</span>
    `;

  } 
  if (selectedEmployee) {
    renderSingleEmplyee();
  }


  renderEmployeeNames();

})();