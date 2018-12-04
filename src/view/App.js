import React, { Component } from 'react';
import '@/common/less/App.less';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import routes from '@/router/route'

class App extends Component {
  render() {
      console.log(routes)
    return (
      <div className="App">
          <Router>

              <div>
                  <div className="left">
                      <Link to="/home/Mymusic">我的音乐</Link>
                      <Link to="/home/">音乐馆</Link>
                  </div>
                  {
                      routes.map((route,key)=>{
                          if(route.exact){
                              return <Route key={key} exact path={route.path}
                                            render={props => (
                                                <route.component {...props} routes={route.routes} />
                                            )}
                              />
                          }else{
                              return <Route  key={key}  path={route.path}
                                             render={props => (
                                                 <route.component {...props} routes={route.routes} />
                                             )}
                              />

                          }
                      })
                  }
              </div>
          </Router>

      </div>
    );
  }
}

export default App;
