import React, { Component } from 'react';
import './App.less';
import { Button } from 'antd-mobile';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Button>default</Button>
            <span>sss</span>
        </header>
      </div>
    );
  }
}

export default App;
