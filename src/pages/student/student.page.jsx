import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Space, Pagination, Drawer } from "antd";
import { FormOutlined, StopOutlined, DeleteOutlined } from "@ant-design/icons";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchStudentList,
  fetchClassDetail,
} from "../../redux/action/common/common";
import StudentForm from "../../components/form/student-form/student-form";

import "./student.page.css";

const StudentPage = ({
  fetchStudentList,
  fetchClassDetail,
  students,
  total,
  loading,
}) => {
  const location = useLocation();
  const history = useHistory();
  let query = queryString.parse(location.search);

  const [visible, setVisible] = useState(false);

  const [editRow, setEditRow] = useState("");

  const columns = [
    {
      title: "Student ID",
      dataIndex: "student",
      width: 150,
      render: (student) => (
        <b style={{ textTransform: "uppercase" }}>{student?.student_id}</b>
      ),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Class",
      dataIndex: "student",
      width: 100,
      render: (student) => student?.class_name,
    },
    {
      title: "Section",
      dataIndex: "student",
      width: 100,
      render: (student) => student?.section,
    },
    {
      title: "Email",
      width: 200,
      dataIndex: "email",
    },
    {
      title: "Campus",
      width: 50,
      dataIndex: "campus",
    },
    {
      title: "Action",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <FormOutlined
            onClick={() => editRowClick(record)}
            style={{ fontSize: "20px", color: "#3c5eb1" }}
            className="hb-cursor"
          />
          <StopOutlined
            style={{ fontSize: "20px", color: "#f4a460" }}
            className="hb-cursor"
          />
          <DeleteOutlined
            style={{ fontSize: "20px", color: "#ef2d56" }}
            className="hb-cursor"
          />
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  //on load
  const onLoad = () => {
    checkPageSizeParams(query);
    getStudentList();
    fetchClassDetail();
  };

  //add page and size in params if there is not values
  const checkPageSizeParams = (queryParams) => {
    if (
      typeof queryParams.page === "undefined" &&
      typeof queryParams.size === "undefined"
    ) {
      let modifiedQuery = queryParams;
      modifiedQuery.page = 1;
      modifiedQuery.size = 10;
      history.replace({
        pathname: location.pathname,
        search: queryString.stringify(modifiedQuery),
      });
    }
  };

  // on pagination click
  const pageParamsUpdate = (page) => {
    let modifiedQuery = query;
    modifiedQuery.page = page;
    history.replace({
      pathname: location.pathname,
      search: queryString.stringify(modifiedQuery),
    });
  };

  //get student list
  const getStudentList = () => {
    fetchStudentList(query.page);
  };

  //edit row click
  const editRowClick = (rowData) => {
    setEditRow(rowData);
    setVisible(true);
  };

  const onClose = () => {
    setEditRow("");
    setVisible(false);
  };

  useEffect(() => {
    onLoad();
  }, [query.page]);

  return (
    <Row className="h-mb15">
      <Col span={24}>
        <Row>
          <Col className="h-p20 h-plr40" span={24}>
            <h2>Student Information</h2>
          </Col>
        </Row>
        <Row>
          <Col className="h-plr40" span={24}>
            <Table
              rowSelection={{
                ...rowSelection,
              }}
              columns={columns}
              loading={loading}
              dataSource={students}
              className="hb-table"
              pagination={false}
              rowKey="_id"
            />
          </Col>
          <Col className="h-plr40" span={24}>
            <div className="h-fl">
              <Pagination
                defaultCurrent={1}
                current={Number(query.page)}
                total={total}
                defaultPageSize={10}
                onChange={pageParamsUpdate}
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Drawer
        title="Edit Student"
        placement="right"
        closable={true}
        onClose={onClose}
        width={400}
        visible={visible}
      >
        <StudentForm
          onClose={onClose}
          data={editRow}
          getStudentList={getStudentList}
        />
      </Drawer>
    </Row>
  );
};

const mapStateToProps = ({ commonData: { students, total, loading } }) => {
  return { students, total, loading };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStudentList: (page) => dispatch(fetchStudentList(page)),
  fetchClassDetail: () => dispatch(fetchClassDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
