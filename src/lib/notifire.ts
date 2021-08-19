import axios, { AxiosInstance } from 'axios';

import { ChannelTypeEnum } from './enums';

export interface INotifireConfig {
  API_URL: string;
}

export interface IEventPayload {
  $user_id: string;
  $first_name?: string;
  $last_name?: string;
  $email?: string;
  $channels?: ChannelTypeEnum[];
  [key: string]: any;
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

  async trigger(eventName: string, payload: IEventPayload) {
    if (!eventName) {
      throw new Error('eventName must be specified');
    }

    return await this.http.post(`/events/trigger`, {
      name: eventName,
      payload: {
        ...payload
      }
    })
  }
}
