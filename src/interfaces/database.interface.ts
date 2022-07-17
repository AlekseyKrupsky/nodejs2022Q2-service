export interface DatabaseInterface {
  insert(table: string, row: any): any;
  selectById(table: string, id: string);
  selectAll(table: string);
  update(table: string, id: string, payload: any);
  delete(table: string, id: string);
}
