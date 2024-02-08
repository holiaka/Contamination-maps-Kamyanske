import { notifyToast } from 'components/Notify/notifyPropertyCode';
import { SwitchGeolocation, Follow, UnFollow } from './GeoLocation.styled';

export const GeoLocation = props => {
  const {setLocation, marker, setMarker } = props;

  const success = (pos) => {
    let { coords, timestamp } = pos;
    let dataTime = new Date(timestamp);
    let date = dataTime.toLocaleDateString();
    let time = dataTime.toLocaleTimeString();
    let obj = {
      longitude: coords.longitude,
        latitude: coords.latitude,
        accuracy: coords.accuracy,
        date: date,
        time: time,
    }
    setLocation(obj);
  };

  const error = err => {
    notifyToast('error', `${err.message}`);
    setMarker(() => false);    
  };  

  const onClick = () => {
    let id;
    if (marker === false) {
      setMarker(() => true);
      id = window.navigator.geolocation.watchPosition(success, error);      
      notifyToast(
        'info',
        'Tracking of geographical coordinates has been started!'
      );
      return;
    }
    window.navigator.geolocation.clearWatch(id);
    notifyToast('info', 'Tracking of geographic coordinates is disabled!');    
    setMarker(() => false);
  };

  return (
    <SwitchGeolocation onClick={onClick}>
      {marker ? <UnFollow /> : <Follow />}
    </SwitchGeolocation>
  );
};
