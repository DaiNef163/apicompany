import { connectToSQLServer, dbConfig } from '../config';

const mongoose = require('mongoose');
const sql = require('mssql');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the MongoDB Employee collection
const employeeSchema = new mongoose.Schema({
    employeeId: Number,
    firstName: String,
    lastName: String,
    vacationDays: Number,
    paidToDate: Date,
    paidLastYear: Number,
    payRate: Number,
    payRateId: Number
    // Add other fields as needed
});

// Create a model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);



// Function to create an employee in both MongoDB and SQL Server
export const createEmployee = async (req, res) => {
    try {
        const {
            employeeId,
            firstName,
            lastName,
            vacationDays,
            paidToDate,
            paidLastYear,
            payRate,
            payRateId,
            // other fields from req.body
        } = req.body;

        // Create a new Employee object
        const employee = new Employee({
            employeeId,
            firstName,
            lastName,
            vacationDays,
            paidToDate,
            paidLastYear,
            payRate,
            payRateId,
            // other fields
        });

        // Save the employee to MongoDB
        await employee.save();

        // Connect to SQL Server


        await sql.connect(dbConfig);

        // Insert the employee data into the Personal table in SQL Server
        await sql.query`
            INSERT INTO Personal (Employee_ID, First_Name, Last_Name, /* other fields */)
            VALUES (${employee.employeeId}, ${employee.firstName}, ${employee.lastName} /* other inputs */)
        `;

        // Close SQL Server connection
        await sql.close();

        res.status(201).json({ message: 'Employee created successfully.' });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Error creating employee.' });
    }
};
