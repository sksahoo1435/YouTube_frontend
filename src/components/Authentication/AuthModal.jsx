import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, Avatar } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './authModal.module.css';

const AuthModal = ({ isModalVisible, handleCancel }) => {

    const [profilePic, setProfilePic] = useState(null);

    const handleSubmit = (values) => {
        console.log('Form Values: ', { ...values, profilePic });

    };

    const handleUpload = (info) => {
        if (info.file.status === 'done') {
            setProfilePic(URL.createObjectURL(info.file.originFileObj));
        }
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
                <h2>Create your YouTube Account</h2>
            </div>

            <div className={styles.profileSection}>

                <Upload
                    showUploadList={false}
                    onChange={handleUpload}
                    accept="image/*"
                >
                    <Avatar
                        size={80}
                        src={profilePic}
                        icon={<UserOutlined />}
                        className={styles.avatar}
                    />
                    <p className={styles.uploadButton}>
                        Select Picture
                    </p>
                </Upload>
            </div>

            <Form
                name="auth_form"
                onFinish={handleSubmit}
                layout="vertical"
                autoComplete="off"
            >

                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>


                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'The input is not a valid email!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <div className={styles.footerButtons}>
                    <Button onClick={handleCancel} className={styles.cancelButton}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" className={styles.createChannelButton}>
                        Create Channel
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AuthModal;
