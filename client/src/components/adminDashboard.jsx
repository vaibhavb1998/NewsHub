import React, { useState, useEffect } from 'react'
import { Select, Button } from 'antd';
import _ from 'lodash';
import axios from 'axios';
const constants = require("../config/constants");

const { Option } = Select;

const AdminDashboard = () => {

  const [ sourceList, setSourceList ] = useState([])
  const [ isApiLoading, setIsApiLoading ] = useState(false)

  const newsSourceList = constants.newsSourceList

  useEffect(() => {
    setIsApiLoading(true)
    axios.get('http://localhost:5000/api/user/get-selected-source-list')
      .then(res => {
        setSourceList(res.data.data[0].sourcesId)
        setIsApiLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsApiLoading(false)
      })
  }, [])

  const newsSourceName = _.flatMap(newsSourceList, (value) => (
    <Option key={value.id.toString(36)}>{value.name.toString(36)}</Option>
  ))

  function handleChange(value) {
    setSourceList(value)
  }

  function updateSourceList() {
    setIsApiLoading(true)
    axios.put('http://localhost:5000/api/user/set-selected-source-list', sourceList)
      .then(res => {
        setIsApiLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsApiLoading(false)
      })
  }

  return (
    <div className="container">
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={handleChange}
        disabled={isApiLoading}
        value={sourceList}
      >
        {newsSourceName}
      </Select>
      <Button type="primary" onClick={updateSourceList}>Update</Button>
    </div>
  );
}

export default AdminDashboard;
