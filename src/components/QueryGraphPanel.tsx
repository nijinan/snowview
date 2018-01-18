import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader} from 'material-ui';
import { Map } from 'immutable';
import { RootState } from '../redux/reducer';
import D3Graph from './D3Graph';
import { QueryNode, QueryEdge, QueryGraph } from '../model';

const mapStateToProps = (state: RootState) => ({
    colorMap: state.color.colorMap
});

interface GraphPanelProps {
    colorMap: Map<string, string>;
    graph : QueryGraph;
    rank: number;
}

class Graph extends D3Graph<QueryNode, QueryEdge> {
}

class QueryGraphPanel extends React.Component<GraphPanelProps , {}> {

    render() {
        const {colorMap} = this.props;

        const nodeset = this.props.graph.nodes;

        const linkset = this.props.graph.edges;

        return (
            <Card>
                <CardHeader title={"neo4jd3"+this.props.rank}/>
                <CardContent>
                    <Graph
                        id={"neo4jd3"+this.props.rank}
                        nodes={nodeset}
                        links={linkset}
                        getNodeID={n => n.id.toString()}
                        getNodeColor={n => colorMap.get(n.typeName, '#DDDDDD')}
                        getNodeLabel={n => n.typeName}
                        getNodeText={n => n.display+n.id}
                        getLinkID={d => d.id.toString()}
                        getLinkText={d => d.type}
                        getSourceNodeID={d => d.start.toString()}
                        getTargetNodeID={d => d.end.toString()}
                        onNodeClick={d => {
                        }}
                    />
                </CardContent>
            </Card>
        );
    }
}

export default (connect(mapStateToProps)(QueryGraphPanel));
