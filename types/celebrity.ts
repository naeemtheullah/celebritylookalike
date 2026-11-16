export type CelebrityImage={thumbnailUrl:string;originalUrl?:string;sourceUrl:string;filePageUrl:string;author?:string;license?:string;licenseUrl?:string;attribution?:string};
export type Celebrity={id:string;name:string;slug:string;profession:string;category:string;biography:string;nationality?:string;wikipediaUrl?:string;images:CelebrityImage[]};
export type ReferenceDescriptor={celebrityId:string;modelVersion:string;referenceImageId:string;values:number[]};
export type CelebrityMatch={celebrity:Celebrity;distance:number};
