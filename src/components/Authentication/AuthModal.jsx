import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, Button, Upload, Avatar, Spin } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from './authModal.module.css';
import { LoginUser, RegisterUser } from '../../Redux/Slice/AuthSlice';

const AuthModal = ({ isModalVisible, handleCancel, isRegister }) => {
    const dispatch = useDispatch();
    const { isAuthLoader } = useSelector((state) => state.auth);
    const [form] = Form.useForm(); // Get the Form instance
    const [avatar, setAvatar] = useState(null);
    const [loginpage, setLoginpage] = useState(false);

    const handleSubmit = (values) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        if (avatar) {
            formData.append('avatar', avatar);
        }

        if (loginpage) {
            dispatch(LoginUser({
                email: values['email'],
                password: values['password']
            }))
                .then(() => {
                    form.resetFields();
                    handleCancel();
                });
        } else {
            dispatch(RegisterUser(formData))
                .then(() => {
                    console.log('Registration successful');
                    setLoginpage(true);
                    form.resetFields(); 
                    setAvatar(null); 
                })
                .catch((error) => {
                    console.error('Registration failed:', error);
                });
        }
    };

    const handleUpload = (info) => {
        const file = info.file.originFileObj;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogin = () => {
        setLoginpage(!loginpage);
    };

    return (
        <Modal
            title={null}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            className={styles.modal}
        >
            <div className={styles.header}>
                <h2>{!loginpage ? 'Create Your Account' : 'Login to Your Account'}</h2>
            </div>

            {!loginpage && (
                <div className={styles.profileSection}>
                    <Upload
                        name="avatar"
                        showUploadList={false}
                        onChange={handleUpload}
                        accept="image/*"
                    >
                        <Avatar
                            size={80}
                            src={avatar ? URL.createObjectURL(avatar) : undefined}
                            icon={<UserOutlined />}
                            className={styles.avatar}
                        />
                        <p className={styles.uploadButton}>Select Picture</p>
                    </Upload>
                </div>
            )}

            <Form
                form={form} // Associate form instance
                name="auth_form"
                onFinish={handleSubmit}
                layout="vertical"
                autoComplete="off"
            >
                {!loginpage && (
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Enter Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                )}

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Enter Email!' },
                        { type: 'email', message: 'The input is not a valid email!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Enter Password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <div className={styles.footerButtons}>
                    <Button onClick={handleCancel} className={styles.cancelButton}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.createChannelButton}
                        disabled={isAuthLoader}
                    >
                        {isAuthLoader ? <Spin size="small" /> : !loginpage ? 'Sign Up' : 'Login'}
                    </Button>
                </div>
            </Form>

            <div className={styles.switchMode}>
                {!loginpage ? (
                    <p>
                        Have an account?
                        <Button type="link" onClick={handleLogin} style={{ marginLeft: "-10px" }}>
                            Login
                        </Button>
                    </p>
                ) : (
                    <p>
                        Don't have an account?
                        <Button type="link" onClick={handleLogin} style={{ marginLeft: "-10px" }}>
                            Sign Up
                        </Button>
                    </p>
                )}
            </div>
        </Modal>
    );
};

export default AuthModal;
