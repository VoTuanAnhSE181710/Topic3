import { Button, Form, Input, Modal, Table, message } from 'antd'
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ManageCategory = () => {

  const [categories, setCategories] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const fetchCategories = async () => {
    //call api to get categories
    console.log('Fetching data from API...');
    //wait for BE to respond
    const response = await axios.get(
      'https://68d390e7214be68f8c6646ef.mockapi.io/category'
    );
    console.log(response.data);
    setCategories(response.data);
  };

  useEffect(() => {
    // what it does when the page is loaded
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Call API to create new category
      const response = await axios.post(
        'https://68d390e7214be68f8c6646ef.mockapi.io/category',
        values
      );

      console.log('Category created:', response.data);
      message.success('Category created successfully!');

      // Refresh the categories list
      await fetchCategories();

      // Close modal and reset form
      setOpen(false);
      form.resetFields();
      toast.success('Category created successfully!');

    } catch (error) {
      console.error('Error creating category:', error);
      message.error('Failed to create category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type='primary' onClick={() => setOpen(true)}>Add Category</Button>
      <Table dataSource={categories} columns={columns} />
      <Modal
        title="Create new category"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the category name!' },
              { min: 2, message: 'Name must be at least 2 characters long!' },
              { max: 50, message: 'Name must not exceed 50 characters!' },
              { pattern: /^[a-zA-ZàáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ0-9\s]+$/, message: 'Name can only contain Vietnamese/English letters, numbers, and spaces!' }
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please input the description!' },
              { min: 10, message: 'Description must be at least 10 characters long!' },
              { max: 200, message: 'Description must not exceed 200 characters!' }
            ]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Enter category description"
              showCount
              maxLength={200}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
              Submit
            </Button>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ManageCategory
