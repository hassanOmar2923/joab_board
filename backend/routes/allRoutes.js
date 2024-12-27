const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, JobCategory, Job } = require('../models/allModels');

// Secret for JWT
const JWT_SECRET = 'joab_board'; // Change this to a strong secret key

// Register User
router.post('/users', async (req, res) => {
    console.log("called",req.body)
    try {
        const checkDuplicate=await User.findOne({email:req.body.email})
        if(checkDuplicate) return res.status(400).send({status:false,message:"user already exists"})
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).send({status:true,message:"user created successfully, now u can loggin"});
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({status:false,message:'Invalid email or password'});
        }

        const isPasswordValid = await bcrypt.compare(req.body.Password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({status:false,message:'Invalid email or password'});
        }

        const token = jwt.sign({ id: user._id,OrName:user.OrName,email:user.email }, JWT_SECRET, );
        res.status(200).send({ status:true,message:"successfuly logged in",token });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get All Job Categories
router.get('/job-categories', async (req, res) => {
    try {
        const categories = await JobCategory.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Create Job Category
router.post('/job-categories', async (req, res) => {
    try {
        const category = new JobCategory(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get All Jobs
router.get('/jobs', async (req, res) => {
    try {
        // await Job.deleteMany()
        const jobs = await Job.find().populate('postedBy');
        res.status(200).send(jobs);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Create Job
router.post('/jobs', async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).send({status:true,message:"successfuly inserted job"});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update Job
router.put('/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) {
            return res.status(404).send();
        }
        res.status(200).send(job);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Job
router.delete('/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).send();
        }
        res.status(200).send(job);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;

