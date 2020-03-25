require("console.table");
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
    const newData = data.map(emp => {
      const empStartDate = moment(emp.startDate, 'M/D/YYYY');
      emp.daysWorked = moment().diff(empStartDate, 'days');
      return emp;
    });
    res.render("index", { employees: newData });
  });
});

router.get("/api/employees/:id?", (req, res) => {
  if(req.params.id) {
    employee.getById(req.params.id, (err, data) => {
      if(err) {
        console.log(err);
        return status(500).end();
      } else if(!data.length) {
        // console.log(data);
        return res.json([]);
      }
      // console.table(parseData(data));
      return res.json(parseData(data));
    });
  } else {
    employee.getAll((err, data) => {
      // console.table(parseData(data));
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
  employee.create(newEmp, (err, data) => {
      if(err) {
        console.log(err);
        return res.status(500).end();
      } 
      return res.status(200).end();
    });
});

router.put("/api/employees/:id", (req, res) => {
  employee.update(req.params.id, req.body, (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).end();
    } 
    return res.status(200).end();
  });
});

router.delete("/api/employees/:id", (req, res) => {
  employee.deleteById(req.params.id, (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).end();
    }
    return res.status(200).end();
  });
});

module.exports = router;
