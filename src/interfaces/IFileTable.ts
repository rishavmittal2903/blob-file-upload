export interface IColumn{
    label:string,
    value:string
}
export interface IRow{
  [key:string]:string
}
export interface IFileTable{
columns:Array<IColumn>
rows:Array<IRow>
}