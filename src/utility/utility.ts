export const getFileName=(item:any):string=>{
    const items:Array<string>=item?.split('/')
    return items[items.length-1];
}