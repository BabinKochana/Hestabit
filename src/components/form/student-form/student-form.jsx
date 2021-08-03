import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Row, Col, Button, Form, Input, Select, DatePicker } from "antd";
import { toast } from "react-toastify";
import { updateStudent } from "../../../services/common.service";
import "./student-form.css";

function StudentForm({ onClose, data, classes, campus, getStudentList }) {
  // get initial values
  const [initialValues, setinitialValues] = useState({
    first_name: data?.first_name,
    last_name: data?.last_name,
    campus: data?.campus,
    student_id: data?.student?.student_id,
    gender: data?.student?.gender,
    email: data?.email,
    class_name: data?.student?.class_name,
    section: data?.student?.section,
    dob: moment(data?.student?.dob),
    mobile_number: data?.mobile_number,
  });

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const size = "large";
  const { Option } = Select;

  //on success submit
  const onFinish = async (values) => {
    setLoading(true);

    let formatData = {
      ...values,
      ...{ dob: moment(values.dob).format("DD-MM-YYYY"), user_id: data._id },
    };

    try {
      const updateUser = await updateStudent(formatData);
      if (updateUser?.data?.status === 200) {
        await getStudentList();
        setLoading(false);
        onClose();
        toast.success("Student Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setLoading(false);
        toast.error("Error while updating", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      setLoading(false);
      toast.error("Error while updating", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // update initial values
  useEffect(() => {
    let defaultValues = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      campus: data?.campus,
      student_id: data?.student?.student_id,
      gender: data?.student?.gender,
      email: data?.email,
      class_name: data?.student?.class_name,
      section: data?.student?.section,
      dob: moment(data?.student?.dob),
      mobile_number: data?.mobile_number,
    };
    form.setFieldsValue(defaultValues);
    setinitialValues(defaultValues);
  }, [data, form]);

  return (
    <Row>
      <Col span={24}>
        <Form
          name="student"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          initialValues={initialValues}
        >
          <label className="h-mb5">First Name *</label>
          <Form.Item
            name="first_name"
            className="h-mb15"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input size={size} />
          </Form.Item>

          <label className="h-mb5">Last Name *</label>
          <Form.Item
            name="last_name"
            className="h-mb15"
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input size={size} />
          </Form.Item>

          <label className="h-mb5">Campus *</label>
          <Form.Item
            name="campus"
            className="h-mb15"
            rules={[{ required: true, message: "Please input Campus!" }]}
          >
            <Select style={{ width: "100%" }} size={size}>
              {campus.map((o) => (
                <Option value={o.campus_name} key={o._id}>
                  {o.campus_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <label className="h-mb5">Student Id *</label>
          <Form.Item name="student_id" className="h-mb15">
            <Input size={size} disabled />
          </Form.Item>

          <label className="h-mb5">Gender*</label>
          <Form.Item
            name="gender"
            className="h-mb15"
            rules={[{ required: true, message: "Please input Gender!" }]}
          >
            <Select style={{ width: "100%" }} size={size}>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>

          <label className="h-mb5">Date of Birth *</label>
          <Form.Item
            name="dob"
            className="h-mb15"
            rules={[{ required: true, message: "Please input Date of Birth!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              size={size}
              format="DD-MM-YYYY"
            />
          </Form.Item>

          <label className="h-mb5">Email Address *</label>
          <Form.Item name="email" className="h-mb15">
            <Input size={size} disabled />
          </Form.Item>

          <label className="h-mb5">Mobile *</label>
          <Form.Item name="mobile_number" className="h-mb15">
            <Input size={size} disabled />
          </Form.Item>

          <label className="h-mb5">Class *</label>
          <Form.Item
            name="class_name"
            className="h-mb15"
            rules={[{ required: true, message: "Please input Class!" }]}
          >
            <Select
              style={{ width: "100%" }}
              size={size}
              onChange={(data) =>
                setinitialValues({ ...initialValues, ...{ class_name: data } })
              }
            >
              {classes.map((o) => (
                <Option value={o.class_name} key={o._id}>
                  {o.class_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <label className="h-mb5">Section * </label>
          <Form.Item
            name="section"
            className="h-mb15"
            rules={[{ required: true, message: "Please input Section!" }]}
          >
            <Select style={{ width: "100%" }} size={size}>
              {classes
                .find((o) => o.class_name === initialValues.class_name)
                ?.section.map((item) => (
                  <Option value={item.section} key={item._id}>
                    {item.section}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item className="h-mb15 h-mt20">
            <Button
              className="h-btn h-save h-mr10 "
              htmlType="submit"
              loading={loading}
            >
              Save
            </Button>
            <Button
              className="h-btn h-cancel"
              htmlType="button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
const mapStateToProps = ({ commonData: { classes, campus } }) => {
  return { classes, campus };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
