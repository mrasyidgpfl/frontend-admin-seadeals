import cityService from '../utils/requestCities';

class Cities {
  static GetAllCities() {
    return cityService.get('/cities');
  }
}

export default Cities;
