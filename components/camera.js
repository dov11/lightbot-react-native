import React from 'react';
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import sendPhoto from '../actions/sendPhoto'
import startRecognizing from '../actions/recognizing'
// import notRecognized from '../actions/loading'

class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  
  takePicture = () => {
    this.camera.takePictureAsync({quality: 0.1, base64: true}).then(data => {
      console.log('takePicture', data)
      this.props.sendPhoto(data.base64)
    });  
  }
  render() {
    const { hasCameraPermission } = this.state;
    const { messageArray, loading, recognitions } = this.props
    console.log('messageArray:', messageArray)
    // const messageNullArr = messageArray.filter(el=>el===null)
    // console.log(this.props.messageArray, 'message array')
    const lastMessage = messageArray[messageArray.length-1]
    if (lastMessage && lastMessage.message===null && !loading && recognitions<10) {
      console.log('here', lastMessage.message)
      this.takePicture()
      // this.props.notRecognized()
    }
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Text>                              Lightbot                             </Text>
          {!!lastMessage && !!lastMessage.message 
            && <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                {`Hello, ${lastMessage.message.split(' ')[0]} ${lastMessage.message.split(' ')[1]}!`}
              </Text>
          }

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
                  marginLeft: 10,
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
                style={[{ flex: 0.3, marginLeft: 10, alignSelf: 'flex-end' }]}
                onPress={() => {
                  this.takePicture()
                  this.props.startRecognizing()
                  }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> 
                    Snap
                 </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <Text>Bottom</Text>
        </View>
      );
    }
  }
}
const mapStateToProps = (state) => {

  return { 
    messageArray: state.messages, 
    loading: state.loading, 
    recognitions: state.recognizing
  }

}

export default connect(mapStateToProps, { sendPhoto, startRecognizing })(CameraExample)