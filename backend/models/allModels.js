const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    OrName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Job Category Schema
const jobCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

// Job Schema
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    positions: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
   
    description: {
        type: String,
    },
    deadline: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

// Export Models
const User = mongoose.model('User', userSchema);
const JobCategory = mongoose.model('JobCategory', jobCategorySchema);
const Job = mongoose.model('Job', jobSchema);

module.exports = { User, JobCategory, Job };
