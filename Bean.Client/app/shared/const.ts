export class Service {
    static readonly SERVER_URL = 'http://localhost:21709';

    static readonly TOKEN_URL = Service.SERVER_URL + '/token';

    static readonly PLANT_API_URL = Service.SERVER_URL + '/api/plants';
    static readonly FAMILY_API_URL = Service.SERVER_URL + '/api/families';
    static readonly BINDER_API_URL = Service.SERVER_URL + '/api/binders';

    static readonly AUTH_API_URL = Service.SERVER_URL + '/api/account';
    static readonly REGISTER_API_URL = Service.AUTH_API_URL + '/register';

}