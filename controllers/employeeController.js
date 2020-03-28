const moment = require("moment");
const express = require("express");
const router = express.Router();
const employee = require("../models/employee");

const parseData = (data) => {
  return data.map(emp => {
    const empStartDate = moment(emp.startDate, 'M/D/YYYY');
    emp.daysWorked = moment().diff(empStartDate, 'days');
    return emp;
  });
}

router.get("/", (req, res) => {
  employee.getAll((err, data) => {
    res.render("index", { employees: parseData(data) });
  });
});

router.get("/api/employees/:id?", (req, res) => {
  if(req.params.id) {
    employee.getById(req.params.id, (err, data) => {
      if(err) {
        console.log(err);
        return status(500).end();
      } else if(!data.length) {
        return res.json([]);
      }
      return res.json(parseData(data));
    });
  } else {
    employee.getAll((err, data) => {
      res.json(parseData(data));
    });
  }
});

router.post("/api/employees", (req, res) => {
  const newEmp = {
    avatar: req.body.avatar,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    department: req.body.department,
    startDate: req.body.startDate
  };
  employee.create(newEmp, (err) => {
      if(err) {
        console.log(err);
        return res.status(500).end();
      } 
      return res.status(200).end();
    });
});

router.put("/api/employees/:id", (req, res) => {
  employee.update(req.params.id, req.body, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).end();
    } 
    return res.status(200).end();
  });
});

router.delete("/api/employees/:id", (req, res) => {
  employee.deleteById(req.params.id, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).end();
    }
    return res.status(200).end();
  });
});

module.exports = router;
