import {Optional} from "sequelize";

export interface ScratchAttributes {
    id: number;
    vehicleType: string;
    year: number;
    make: string;
    modelGroup: string;
    "model": string;
    "bodyStyle": string;
    "color": string;
    "primaryDamage": string;
    "secondaryDamage": string;
    "title": { };
    "vin": string;
    "odometer": number;
    "odometerBrand": string;
    "acv": string;
    "repairCost": string;
    "engineSize": string;
    "saleStatus": string;
    "buyItNow": string;
    "makeAnOffer": boolean;
    "currency": string;
    "saleLocation": {  };
    "saleDate": Date;
    "saleStartAt": string,
    "item": number;
    "gridRow": string;
    "location": { },
    "locationName": string;
    "offsite": string;
    "sold": boolean;
    "subLotInfo": string;
    "description": string;
    "sealedBid": boolean;
    "largeImage": string;
    "lane": string;
    "saleDateTimeLeft": string;
    "saleStatusString": string;
    "prebiddingClosed": boolean;
    "auctionInProgress": boolean;
    "bidStatus": string;
    "showClearVinBadge":boolean;
    "slug": string;
    "vehicleTypeLabel": string;
    "images": string[];
    "currentBid": number;
    "status": number;
    "isWatched": boolean;
    "vinHash": string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ScratchInput extends Optional<ScratchAttributes, 'id'> {
}

export interface ScratchOutput extends Required<ScratchAttributes> {
}

