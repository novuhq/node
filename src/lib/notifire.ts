import axios, { AxiosInstance } from 'axios';

export interface INotifireConfig {
  API_URL: string;
}

export class Notifire {
  private http: AxiosInstance;

  constructor(private API_KEY: string, private options: INotifireConfig = { API_URL: 'https://api.notifire.co/v1'}) {
    if (!API_KEY) {
      throw new Error('API_KEY must be provided during initialization');
    }

    this.http = axios.create({
      baseURL: this.options.API_URL,
      headers: {
        Authorization: `ApiKey ${this.API_KEY}`
      }
    });
  }

  async trigger(eventName: string, userId: string, payload = {}) {
    if (!eventName) {
      throw new Error('eventName must be specified');
    }

    return await this.http.post(`/events/trigger`, {
      name: eventName,
      payload: {
        userId,
        ...payload
      }
    })
  }
}
