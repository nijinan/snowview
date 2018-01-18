export interface RandomResult {
    query: string;
}

export interface CypherQueryResult {
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

export interface NavResult {
    nodes: Neo4jNode[],
    relationships: Neo4jRelation[]
}

export interface Neo4jRelation {
    startNode: number;
    endNode: number;
    id: number;
    type: string;
}

export interface Neo4jNode {
    _id: number;
    _labels: string[];
    uniformTitle?: string;
    uniformText?: string;
}

export interface SnowRelation {
    shown: boolean;
    id: string;
    source: number;
    target: number;
    types: string[];
}

export interface SnowNode {
    shown: boolean;
    node: Neo4jNode;
}

export interface RankedResult {
    finalRank: number;
    solrRank: number;
    body: string;
    title: string;
    highlight: boolean;
}

export interface DocumentResult {
    query: string;
    rankedResults: Array<RankedResult>;
}

export interface QueryNode{
    focus: boolean;
    type: string;
    typeName: string;
    display: string;
    id: number;
}

export interface QueryEdge{
    id: number;
    start: number;
    end: number;
    type: string;
}

export interface QueryGraph{
    nodes: QueryNode [];
    edges: QueryEdge [];
}

export interface QueryInfo {
    graph: QueryGraph;
    score: number;
    cypher: string;
    rank: number;
    returnType: string;
}

export interface CypherResult {
    rankedResults: QueryInfo[];
}

export type TabType = 'api-graph' | 'document' | 'qa-cypher' | 'attribute-cypher';