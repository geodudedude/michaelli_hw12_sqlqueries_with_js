const connection = require("./connection")

class Company {
    constructor(connection) {
        this.connection = connection
    }

    // Add employees, roles, and departments.
    addEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee)
    }

    addRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role)
    }

    addDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", department)
    }

    // View employees, roles, departments
    getEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id"
        )
    }

    getRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id"
        )
    }

    getDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name"
        )
    }

    // Update employee's role
    updateRole(emplID, roleID) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleID, emplID]
        )
    }
}

module.exports = new Company(connection)