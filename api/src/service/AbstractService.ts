

export default abstract class AbstractService<T>{

    private readonly sources : Array<{ name : string, ressource : object }> | undefined;
    private readonly config : any;

    constructor(config : any, ...sources : Array<{ name : string, ressource : object }>) {
        if (sources){
            this.sources = sources;
        }
        this.config = config;
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

    get Config(){
        return this.config;
    }
}
