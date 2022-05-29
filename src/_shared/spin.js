import React from 'react';
import { Spin, } from 'antd';
import '../css/spin.css'

const SpinLoad=({loading, container})=> {
 
  const [state, setState] = React.useState({
    loading,
})
    return (
      <div>
        <Spin spinning={state.loading} delay={500}>
          {container}
        </Spin>
        
      </div>
    );
  }
export default SpinLoad