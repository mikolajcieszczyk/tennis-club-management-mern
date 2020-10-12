const router = require('express').Router();
let Employee = require('../models/employee.model');

router.route('/').get((req, res) => {
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const type = req.body.type;
    const male = req.body.male;
    const phone = req.body.phone;
    const email = req.body.email;
    const account_number = req.body.account_number;

    const newEmployee = new Employee({ name, surname, type, male, phone, email, account_number });

    newEmployee.save()
        .then(() => res.json('Employee added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.surname = req.body.surname;
            employee.type = req.body.type;
            employee.male = req.body.male;
            employee.phone = req.body.phone;
            employee.email = req.body.email;
            employee.account_number = req.body.account_number;

            employee.save()
                .then(() => res.json('Employee updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router