import NotificationSound from '../assets/sounds/alert.mp3';
import EmergencySound from '../assets/sounds/emergency-alarm.mp3';

export const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

export const playAlertSound = () => {
    const audio =  new Audio(NotificationSound);
    audio.play();
};
export const playEmergencySound = () => {
    const audio2 =  new Audio(EmergencySound);
    audio2.play();
};

