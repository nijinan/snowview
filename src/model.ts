export class RandomResult {
    query: string;
}

export class CypherQueryResult {
    searchResult: {
        results: Array<{
            data: Array<{
                graph: {
                    nodes: Neo4jNode[],
                    relationships: Neo4jRelation[]
                }
            }>
        }>
    };
}

export class NavResult {
    nodes: Neo4jNode[];
    relationships: Neo4jRelation[]
}

export class Neo4jRelation {
    constructor(id : number, start : number , end : number, type : string){
        this.id = id;
        this.startNode = start;
        this.endNode = end;
        this.type = type;
    }
    startNode: number;
    endNode: number;
    id: number;
    type: string;
}

export class Neo4jNode {
    constructor (id : number, type : string,  display : string){
        this._id = id;
        this._labels = [type];
        this.uniformTitle = display;
    }
    public _id: number;
    public _labels: string[];
    public uniformTitle?: string;
    public uniformText?: string;
}

export class SnowRelation {
    shown: boolean;
    id: string;
    source: number;
    target: number;
    types: string[];
}

export class SnowNode {
    shown: boolean;
    highlight: boolean;
    node: Neo4jNode;
}


export class RankedResult {
    finalRank: number;
    solrRank: number;
    body: string;
    title: string;
    highlight: boolean;
}

export class DocumentResult {
    query: string;
    rankedResults: Array<RankedResult>;
}

export class QueryNode{
    focus: boolean;
    type: string;
    typeName: string;
    display: string;
    id: number;
}

export class QueryEdge{
    id: number;
    start: number;
    end: number;
    type: string;

}

export class QueryGraph{
    nodes: QueryNode [];
    edges: QueryEdge [];
}

export class QueryInfo {
    graph: QueryGraph;
    score: number;
    cypher: string;
    rank: number;
    returnType: string;
}

export class CypherResult {
    rankedResults: QueryInfo[];
}

export type TabType = 'api-graph' | 'document' | 'qa-cypher' | 'attribute-cypher';