import React, { useState } from 'react'
import { Result, Button } from 'antd';

const Success = () => {
  return (
    <div>
      <Result
        status="success"
        title="Registration Successful!!!"
        subTitle="Your account is successfully registered with us. Please proceed to Login Page."
        extra={[
          <Button href="/login" type="primary" key="console">
            Login
          </Button>
        ]}
      />
    </div>
  );
}

export default Success;
