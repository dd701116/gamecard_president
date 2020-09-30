

export default abstract class AbstractService<T>{

    private readonly sources : Array<{ name : string, ressource : object }> | undefined;

    constructor(...sources : Array<{ name : string, ressource : object }>) {
        if (sources){
            this.sources = sources;
        }
    }

    //  CREATE
    abstract add(element : T) : void;

    //  READ
    abstract get(filter : any) : Promise<T>;

    //  UPDATE
    abstract update(element : T) : void;

    //  DELETE
    abstract delete(element : T) : void;

    Source(name : string) : { name : string, ressource : object } | undefined{
        return this.sources? this.sources.find(souce => souce.name === name) : undefined;
    }
}
