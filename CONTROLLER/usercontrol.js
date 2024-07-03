
const users = require('../SCHEMAS/userschema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//register
exports.register = async (req, res) => {
    console.log('Inside the controller register function');
    const { email, password } = req.body;

    try {
        const existuser = await users.findOne({ email });
        if (existuser) {
            return res.status(406).json('Account already exists. Please login.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new users({
            firstname: "",
            lastname: "",
            email,
            password: hashedPassword,
            phonenumber: ""
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(`Register failed due to error: ${err}`);
    }
};

//login 
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existuser = await users.findOne({ email });
        if (!existuser) {
            return res.status(404).json('Invalid email or password.');
        }

        const isMatch = await bcrypt.compare(password, existuser.password);
        if (!isMatch) {
            return res.status(404).json('Invalid email or password.');
        }

        const token = jwt.sign({ userid: existuser._id },"supersecretkey12345", { expiresIn: '1h' });
        res.status(200).json({ existuser, token });
    } catch (err) {
        res.status(500).json(`Login request failed due to error: ${err}`);
    }
};

//allusers
exports.getAllUsers = async (req, res) => {
    try {
        const getuser = await users.find({});
        res.status(200).json(getuser);
    } catch (error) {
        res.status(500).json(error);
    }
}

//get user details
exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const getuser = await users.findById(id);
        if (!getuser) {
            return res.status(404).json('User not found.');
        }
        res.status(200).json(getuser);
    } catch (error) {
        res.status(500).json(error);
    }
};