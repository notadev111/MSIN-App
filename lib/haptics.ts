import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export async function selectionAsync() {
  if (Platform.OS === 'web') {
    return;
  }

  await Haptics.selectionAsync();
}

export async function notifySuccessAsync() {
  if (Platform.OS === 'web') {
    return;
  }

  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

export async function notifyWarningAsync() {
  if (Platform.OS === 'web') {
    return;
  }

  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
}
