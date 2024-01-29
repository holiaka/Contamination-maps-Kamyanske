import { notifyToast } from 'components/Notify/notifyPropertyCode';
import { SwitchGeolocation, Follow, UnFollow } from './GeoLocation.styled';

export const GeoLocation = props => {
  const { location, setLocation } = props;

  const success = pos => {
      let { coords, timestamp } = pos;
      let dataTime = new Date(timestamp);
      let data = dataTime.toLocaleDateString();
    let time = dataTime.toLocaleTimeString();
    setLocation(() => {
      return {
        longitude: coords.longitude,
        latitude: coords.latitude,
        accuracy: coords.accuracy,
        data: data,
        time: time,
      };
    });
  };

  const error = err => {
    notifyToast('error',  `${err.message}`);
  };

  let id;

  const onClick = () => {
    console.log(location);  
    if (location === null) {
      id = window.navigator.geolocation.watchPosition(success, error);
      notifyToast('info', 'Tracking of geographical coordinates has been started!');
    } else {
      window.navigator.geolocation.clearWatch(id);
      notifyToast('info', 'Tracking of geographic coordinates is disabled!');
      setLocation(() => null);
    };
  };

  return (
    <SwitchGeolocation onClick={onClick}>      
      {location === null ? <Follow /> : <UnFollow />}
    </SwitchGeolocation>
  );
};
