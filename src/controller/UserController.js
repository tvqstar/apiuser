const UserModel = require('../model/UserModel');
const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
    UserModel.getAllUsers(function (users) {
        res.send(users);
    });
};

const getProvince = (req, res) => {
    UserModel.getProvince((province) => {
        res.json(province)
    })
}

const getDistrict = (req, res) => {
    const id = req.params.id
    UserModel.getDistrict(id, function (district) {
        res.json(district);
    });
}

const getUserById = (req, res) => {
    const id = req.params.id;
    UserModel.getUserById(id, function (user) {
        res.send(user);
    });
};

const searchUserByName = (req, res) => {
    const customer_name = req.query.q;
    UserModel.searchUserByName(customer_name, function (user) {
        res.send(user);
    });
};

const createUser = (req, res) => {
    const user = req.body;

    const phoneNumberRegex = /^(?:\+84|0)(?:\d){9}$/; // biểu thức chính quy
    // Loi dinh dang email
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(user.email);

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[A-Z][a-zA-Z0-9!@#$%^&*]{8,15}$/;

    // Loi bo trong du lieu
    if (!user.fullname || !user.email || !user.password || !user.phone || !user.diachi) {
        return res.json({
            msg: 'Trường dữ liệu không được để trống',
        });
    } else if (!isCheckEmail) {
        return res.status(200).json({
            status: 'Lỗi',
            msg: 'Sai định dạng email',
        });
    } else if (!phoneNumberRegex.test(user.phone)) {
        return res.json({
            message: 'Số điện thoại không hợp lệ',
        });
    } else if (!passwordRegex.test(user.password)) {
        return res.json({
            message: 'Mật khẩu cần có chữ cái đầu in hoa, ít nhất 1 kí tự viết thường, 1 chữ số và 1 kí tự đặc biệt, từ 8 - 15 kí tự',
        });
    }

    user.password = bcrypt.hashSync(user.password, 10);

    UserModel.checkUser(user.email, (userCheck) => {
        if (!userCheck) {
            UserModel.createUser(user, function (result) {
                res.json({
                    msg: 'Đăng ký thành công',
                    data: result,
                });
            });
        } else {
            res.json({
                msg: 'Email đã tồn tại!',
            });
        }
    });
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const user = req.body;

    const phoneNumberRegex = /^(?:\+84|0)(?:\d){9}$/; // biểu thức chính quy
    // Loi dinh dang email
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(user.email);

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[A-Z][a-zA-Z0-9!@#$%^&*]{8,15}$/;

    // Loi bo trong du lieu
    if (!user.fullname || !user.email || !user.password || !user.phone || !user.diachi) {
        return res.json({
            msg: 'Trường dữ liệu không được để trống',
        });
    } else if (!isCheckEmail) {
        return res.status(200).json({
            status: 'Lỗi',
            msg: 'Sai định dạng email',
        });
    } else if (!passwordRegex.test(user.password)) {
        return res.json({
            message: 'Mật khẩu cần có chữ cái đầu in hoa, ít nhất 1 kí tự viết thường, 1 chữ số và 1 kí tự đặc biệt, từ 8 - 15 kí tự',
        });
    } else if (!phoneNumberRegex.test(user.phone)) {
        return res.json({
            message: 'Số điện thoại không hợp lệ',
        });
    }

    user.password = bcrypt.hashSync(user.password, 10);
    //
    UserModel.checkUser(user.email, (userCheck) => {
        if (!userCheck) {
            UserModel.updateUser(id, user, function (result) {
                // res.send(rowsAffected.toString());
                res.json({
                    msg: "Cập nhật thành công",
                    result
                });
            });
        } else {
            res.json({
                msg: 'Email đã tồn tại!',
            });
        }
    });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    UserModel.deleteUser(id, function (rowsAffected) {
        res.send(rowsAffected.toString());
    });
};

const loginUser = (req, res) => {
    const user = req.body;

    //
    // Loi dinh dang email
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(user.email);

    // Loi bo trong du lieu
    if (!user.email || !user.password) {
        return res.json({
            msg: 'Trường dữ liệu không được để trống',
        });
    } else if (!isCheckEmail) {
        return res.status(200).json({
            status: 'Lỗi',
            msg: 'Sai định dạng email',
        });
    }

    UserModel.loginUser(user, (results) => {
        const comparePassword = bcrypt.compareSync(user.password, results.password);
        if (!comparePassword) {
            res.json({
                msg: 'loi',
            });
        } else {
            res.json(results);
        }
    });
};

module.exports = {
    getAllUsers,
    getProvince,
    getUserById,
    getDistrict,
    createUser,
    updateUser,
    deleteUser,
    searchUserByName,
    loginUser,
};
