import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader} from 'material-ui';
import { Map } from 'immutable';
import { RootState } from '../redux/reducer';
import D3Force from './d3/D3Force';
import { QueryNode, QueryEdge, QueryGraph } from '../model';

const mapStateToProps = (state: RootState) => ({
    colorMap: state.color.colorMap
});

class GraphPanelProps {
    colorMap: Map<string, string>;
    graph : QueryGraph;
    rank: number;
}

class Graph extends D3Force<QueryNode, QueryEdge> {
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
                        height={true}
                        biasx = {100}
                        biasy = {20}
                        getNodeID={n => n.id.toString()}
                        getNodeColor={n => colorMap.get(n.typeName, '#DDDDDD')}
                        getNodeLabel={n => n.typeName}
                        getNodeText={n => n.display+n.id}
                        getLinkID={d => d.id.toString()}
                        getLinkText={d => d.type}
                        getSourceNodeID={d => d.start.toString()}
                        getTargetNodeID={d => d.end.toString()}
                        nodeRadius = {30}
                        ishighlight={d=>d.focus}
                        onNodeClick={d => {
                        }}
                    />
                </CardContent>
            </Card>
        );
    }
}

export default (connect(mapStateToProps)(QueryGraphPanel));
