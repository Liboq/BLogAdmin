import { Button, Result } from "antd";
import React from "react";
import {useNavigate} from 'react-router-dom'

const NotFund = () => {
    const navigate = useNavigate()
  const goHome = () => {
    navigate('/layout')
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={goHome} type="primary">
          Back Home
        </Button>
      }
    />
  );
};
export default NotFund;
