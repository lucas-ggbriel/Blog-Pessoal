import { Temas } from "./Temas"
import { Usuario } from "./Usuario"

export class Postagens{
    public id: number
    public data: Date
    public texto: string
    public titulo: string
    
    public tema: Temas
    public usuario: Usuario

}