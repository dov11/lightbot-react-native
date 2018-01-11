import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  takePicture = () => event => {
      console.log('took')
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
          console.log('data:', data)
      });
    }
};
  render() {
      const { hasCameraPermission } = this.state;
      console.log(this.state, 'here')
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
        <Text>zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</Text>
          <Camera 
            style={{ flex: 1 }}
            ref={ref => {
                this.camera = ref;
            }} 
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[{ flex: 0.3, alignSelf: 'flex-end' }]}
                onPress={() => {
                    console.log('took')
                    this.camera.takePictureAsync({quality: 0.5, base64: true}).then(data => {
                        console.log(data.base64)
                        console.log(data.width)
                    });
              }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> 
                    SNAP
                 </Text>
</TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

