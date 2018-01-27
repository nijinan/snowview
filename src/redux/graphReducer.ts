import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    addNodes, addRelations, addShownRelations,
    fetchGraph, fetchNode, fetchRelationList,
    removeNode,
    selectNode, showRelations,addSchemaToMap,addSchemaToNode
} from './action';
import { combineReducers } from 'redux';
import { Neo4jRelation, SnowNode, SnowRelation, Neo4jNode, QueryEdge } from '../model';
import { Map } from 'immutable';
import { none, Option, some } from 'ts-option';
import { withError } from '../utils/utils';
import * as _ from 'lodash';

export type NodesState = Map<number, Option<SnowNode>>;

export type RelationsState = Map<string, SnowRelation>;

export type RelationListsState = Map<number, Option<string[]>>;

export class GraphState {
    fetching: boolean;
    selectedNode: Option<number>;
    nodes: NodesState;
    relations: RelationsState;
    relationLists: RelationListsState;
}

function r2id(neo4jRelation: Neo4jRelation) {
    return `${neo4jRelation.startNode},${neo4jRelation.endNode}`;
}

function r2id2(neo4jRelation: QueryEdge) {
    return `${(neo4jRelation.start+1) * -1},${(neo4jRelation.end+1) * -1}`;
}

const fetching = reducerWithInitialState<boolean>(false)
    .case(fetchGraph.started, () => true)
    .case(fetchGraph.done, () => false)
    .case(fetchGraph.failed, () => withError('Failed to execute CypherQuery', false));

const selectedNode = reducerWithInitialState<Option<number>>(none)
    .case(fetchGraph.started, () => none)
    .case(selectNode, (s, p) => some(p))
    .case(removeNode, (s, p) => s.exists(num => num === p) ? none : s);

const nodes = reducerWithInitialState<NodesState>(Map())
    .case(fetchGraph.started, (s, p) => Map())
    .case(fetchNode.started, (s, p) => s.update(p, (val = none) => val))
    .case(fetchNode.done, (s, p) => s.set(p.params, some({shown: true, highlight: false,node: p.result})))
    .case(fetchNode.failed, (s, p) => withError('Failed to get node', s.get(p.params).isEmpty ? s.remove(p.params) : s))
    .case(addNodes, (s, p) => p.reduce((prev, n) => {
        prev = prev.set(n._id, some({shown: true, highlight: false,node: n}));

        return prev;
    }, s))
    .case(removeNode, (s, p) => s.set(p, s.get(p).map(sn => ({shown: false, highlight: false,node: sn.node}))))
    .case(addSchemaToMap, (s, p) => p.nodes.reduce((prev, n) => {
        
        let nn : Neo4jNode = new Neo4jNode((n.id+1)*-1,n.typeName,n.display);
        
        prev = prev.set(nn._id, some({shown: true, highlight: n.focus,node: nn}));
        return prev;
    }, s));


const relations = reducerWithInitialState<RelationsState>(Map())
    .case(fetchGraph.started, () => Map())
    .case(addShownRelations, (s, p) => {
        const grouped = _.groupBy(p, r2id);
        let newState = s;
        for (const id of Object.keys(grouped)) {
            const [source, target] = id.split(',').map(x => parseInt(x, 10));
            const types = _.uniq(grouped[id].map(r => r.type));
            newState = newState.set(id, {shown: true, source, target, id, types});
        }
        return newState;
    })
    .case(addRelations, (s, p) => {
        const grouped = _.groupBy(p, r2id);
        let newState = s;
        for (const id of Object.keys(grouped)) {
            const [source, target] = id.split(',').map(x => parseInt(x, 10));
            const types = _.uniq(grouped[id].map(r => r.type));
            if (newState.has(id)) {
                newState = newState.update(id, r => Object.assign({}, r, {types: _.uniq([...r.types, ...types])}));
            } else {
                newState = newState.set(id, {shown: false, source, target, id, types});
            }
        }
        return newState;
    })
    .case(showRelations, (s, p) =>
        p.reduce((prev, r) => prev.update(r, old => Object.assign({}, old, {shown: true})), s))
    .case(removeNode, (s, p) => (s.map(value => value!.source === p || value!.target === p ?
            Object.assign({}, value, {shown: false}) : value!) as Map<string, SnowRelation>
    ))
    .case(addSchemaToMap,(s,p)=>{
        const grouped = _.groupBy(p.edges, r2id2);
        let newState = s;
        for (const id of Object.keys(grouped)) {
            const [source, target] = id.split(',').map(x => parseInt(x, 10));
            const types = _.uniq(grouped[id].map(r => r.type));
            console.log(id);
            newState = newState.set(id, {shown: true, source, target, id, types});
        }
        return newState;
    })
    .case(addSchemaToNode,(s,p)=> p.graph.nodes.filter(r => r.focus).reduce((prev, n) => {
        
        prev = p.nodes.reduce((pp,nn) => {
            
            let id : string= ""+(n.id+1)*-1+(nn._id);
            pp = pp.set(id,{shown: true, source : (n.id+1)*-1, target : nn._id, id, types : ['is'] });
            
            return pp;
        },prev);
        return prev;
    }, s));

const relationLists = reducerWithInitialState<RelationListsState>(Map())
    .case(fetchGraph.started, (state, payload) => Map())
    .case(fetchRelationList.started, (state, payload) => state.set(payload, state.get(payload, none)))
    .case(fetchRelationList.done, (state, payload) => state.set(payload.params, some(payload.result)))
    .case(fetchRelationList.failed, (state, payload) =>
        withError('Failed to get relation list', state.remove(payload.params))
    );

export const graph = combineReducers({
    fetching, selectedNode, nodes, relations, relationLists
});
