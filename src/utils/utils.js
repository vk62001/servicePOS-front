import NotificationSound from '../assets/sounds/alert.mp3';

export const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

export const playAlertSound = () => {
    const audio =  new Audio(NotificationSound);
    audio.play();
}