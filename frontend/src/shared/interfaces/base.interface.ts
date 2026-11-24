export interface Base {
    id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
export interface Param extends Base{
    name:   string;
    code:   string
}
export interface Categorie extends Param{
    description: string;
}
export interface ResponseMessage{
    severity:       string; 
    summary:        string;
    detail:         string;
    life:           number;
    status:         number;
}