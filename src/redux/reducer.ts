import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    fetchDocumentResult, fetchRandomQuestion, fetchCypher
} from './action';
import { combineReducers } from 'redux';
import { DocumentResult,CypherResult } from '../model';
import { show } from 'js-snackbar';
import { graph, GraphState } from './graphReducer';
import { navGraph, NavGraphState } from './navGraphReducer';
import { color, ColorState } from './colorReducer';

function showError(message: string) {
    show({
        text: message,
        pos: 'bottom-center',
        duration: 10000
    });
}

function showMessage(message: string, time: number) {
    show({
        text: message,
        pos: 'bottom-center',
        duration: time
    });
}

function withError<V>(message: string, value: V): V {
    showError(message);
    return value;
}

export interface DocumentResultState {
    fetching: boolean;
    query: string;
    result?: DocumentResult;
}

export interface CypherState{
    query: string;
    result?: CypherResult;
}

export interface RootState {
    fetchingRandomQuestion: boolean;
    cypherResult: CypherState;
    graph: GraphState;
    navGraph: NavGraphState;
    documentResult: DocumentResultState;
    color: ColorState;
}

const fetchingRandomQuestion = reducerWithInitialState<boolean>(false)
    .case(fetchRandomQuestion.started, () => true)
    .case(fetchRandomQuestion.done, (s, p) => {
        p.params(p.result.query);
        return false;
    })
    .case(fetchRandomQuestion.failed, () => withError('Failed to get a random question', false));

const documentResult =
    reducerWithInitialState<DocumentResultState>({fetching: false, query: ''})
        .case(fetchDocumentResult.started, (state, payload) => ({fetching: true, query: payload.query}))
        .case(fetchDocumentResult.done, (state, payload) => ({
            fetching: false, query: payload.params.query, result: payload.result
        }))
        .case(fetchDocumentResult.failed, (state, payload) =>
            withError('Failed to rank', {fetching: false, query: payload.params.query}));

const cypherResult =
reducerWithInitialState<CypherState>({query: ''})
    .case(fetchCypher.started, (state, payload) => ({query: payload.query}))
    .case(fetchCypher.done, (state, payload) => {
        showMessage(payload.result.rankedResults[0].cypher, 10000);
        return {
            query: payload.params.query, result : payload.result
        }})
    .case(fetchCypher.failed, (state, payload) =>
        withError('Failed to Cypher'+JSON.stringify(payload.error), {query: payload.params.query}));            

export const appReducer = combineReducers({
    fetchingRandomQuestion, graph, navGraph, documentResult, color, cypherResult
});