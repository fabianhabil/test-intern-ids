export interface Transaction {
    id: number;
    customerName: string;
    item?: Item;
    amount: number;
    status?: Status;
    transactionDate: string | Date;
    createBy: string;
    track?: {
        createOn?: string | Date;
    };
    productID?: string;
    statusID?: number;
}

export interface Status {
    id: number;
    name: string;
}

export interface Item {
    productID: string;
    productName: string;
}
