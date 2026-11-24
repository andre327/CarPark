import { SupplierInterface } from "@/pages/supplier/interfaces/supplier.interface";
import { Base, Categorie } from "src/shared/interfaces/base.interface";

export interface ProductInterface extends Base{
    name:               string;
    purchase_price:     string;
    sale_price:         string;
    current_stock:      string;
    minimum_stock:      string;
    category_id:        string;
    supplier_id:        string;
    description?:       string;
    category:           Categorie;
    supplier:           SupplierInterface;
}

export interface ProductResponse{
    name:               string;
    purchase_price:     string;
    sale_price:         string;
    current_stock:      string;
    minimum_stock:      string;
    category_id:        string;
    supplier_id:        string;
    description?:       string;
}

export interface ProductList{
    id:                     string;
    name:                   string;
    count:                  string;
    price:                  string;
    total:                  string;
    stock:                  string;
    showMaxStockMessage:    boolean;
    actionPlus:             boolean;
    hover:                  boolean;
}