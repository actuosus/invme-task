import Head from 'next/head';
import React from 'react';
import AppNavigator from '../src/App';
import { withRouter } from 'next/router';


const TITLE = 'Invme Task';
let app = null;

class Application extends React.Component {
  render() {
    const App = this.props.App || AppNavigator;

    return (
      <div className={"app-container"}>
        <Head>
          <title>{TITLE}</title>
        </Head>
        <App router={this.props.router}/>
      </div>
    );
  }
}

export default withRouter(Application);
