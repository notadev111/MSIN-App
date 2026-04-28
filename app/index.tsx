import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useApp } from '../context/AppContext';
import { Colors } from '../constants/theme';

// Entry point — redirects based on onboarding state.
// Shows a brief loading state while AsyncStorage hydrates.
export default function Index() {
  const { state } = useApp();

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.accent} />
      </View>
    );
  }

  if (!state.user.isOnboarded) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
