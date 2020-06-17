import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AppNavigator } from './components/navigation.component';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import HomeScreen from './components/home.component.test.two';
import FormScreen from './components/form.component.test';
import LoginScreen from './components/login.component.test';


const { Navigator, Screen } = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    accent: '#6265ff',
  },
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authStatus: false
    };
  }


  // const [authStatus, setAuthStatus] = React.useState('false');

  // (async function () {

  //   try {
  //     if (await AsyncStorage.getItem('USER') != null) {
  //       setAuthStatus('true')
  //     } else {
  //       setAuthStatus('false')
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  // })();

  componentDidMount() {
    try {
      AsyncStorage.getItem('EMAIL', (err, item) => item == null ? this.setState({ authStatus: false }) : this.setState({ authStatus: true }));
    } catch {
      console.log('COMPONENT MOUNT FAIL')
    }
  }
  
  componentDidUpdate() {
    try {
      AsyncStorage.getItem('EMAIL', (err, item) => item == null ? this.setState({ authStatus: false }) : this.setState({ authStatus: true }));
    } catch {
      console.log('COMPONENT UPDATE FAIL')
    }
  }


  render() {

    return (

      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Navigator
            headerMode='none'
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
          >
            {this.state.authStatus == false ? (
              <>
                <Screen name="Login" component={LoginScreen} />
              </>
            ) : (
                <>
                  <Screen name="Home" component={HomeScreen} />
                  <Screen name="Form" component={FormScreen} />
                </>
              )}
          </Navigator>
        </NavigationContainer>
      </PaperProvider>

    )
  }
}