import { Base, Param } from "src/shared/interfaces/base.interface";

export interface ClientInterface extends Base {
    documentTypeId:     string;
    documentNumber:     string;
    firstName:          string;
    lastName:           string;
    email:              string;
    telephone:          string;
    addres:             string;
}

export interface ClienteResponse {
    documentTypeId:     string;
    documentNumber:     string;
    firstName:          string;
    lastName:           string;
    email:              string;
    telephone:          string;
    addres:             string;
}