import axios from "axios";

export class ContactsService {
    static readonly routes = {
        contactsList: 'http://localhost:4000/contacts',
    };

    static getContactList(): Promise<any> {
        axios.defaults.headers.common["Accept"] = "application/json";
        
        return axios.get(ContactsService.routes.contactsList);
    }
    static setContactList(data: any): Promise<any> {
        axios.defaults.headers.common["Accept"] = "application/json";

        return axios.post(ContactsService.routes.contactsList, data);
    }
}