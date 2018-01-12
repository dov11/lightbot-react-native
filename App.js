import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Scene } from 'react-native-router-flux';
import { AppState, StyleSheet, Text, View } from 'react-native';
import CameraExample from './components/camera'

export default class App extends React.Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState, this.state)
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      // store.dispatch(loadMessages());
    }
    this.setState({appState: nextAppState});
}
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="Camera" component={CameraExample} title="Camera" initial={true}/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
