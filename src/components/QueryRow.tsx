import * as React from 'react';
import {  TableCell,  TableRow, withStyles, WithStyles,Grid,Button } from 'material-ui';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import { Theme } from 'material-ui/styles';
import QueryGraphPanel from '../components/QueryGraphPanel';
import { QueryInfo} from '../model';
import { Dispatch } from 'redux';
import { RootState} from '../redux/reducer';
import { fetchGraphWorker, changeTab,fetchAttributeWorker, addColor } from '../redux/action';
import { connect } from 'react-redux';
const styles = (theme: Theme) => ({
    detail: {
        borderLeft: '0.25rem',
        borderLeftStyle: 'solid',
        borderLeftColor: theme.palette.secondary[500],
        paddingLeft: theme.spacing.unit
    },
    cellRank: {
        width: '12%'
    },
    cellMain: {
        width: '76%',
        overflowWrap: 'normal',
        whiteSpace: 'normal'
    },
    highlight: {
        background: theme.palette.primary[50]
    },
    querygraphpanel: {
        padding: theme.spacing.unit * 2,
    },
    table: {
        width: '70%',
    }
});
const mapStateToProps = (state: RootState) => ({
    
});
class QueryRowProps {
    dispatch: Dispatch<RootState>;
    
}

class QueryRowProps2 {
    query: QueryInfo;
}

type QueryRowStyle = WithStyles<'detail' | 'cellRank' | 'cellMain' | 'highlight' | 'querygraphpanel' | 'table'>;

class QueryRow extends React.Component<QueryRowProps & QueryRowProps2 &  QueryRowStyle, { expand: boolean }> {
    state = {
        expand: false
    };

    handleExpandMore = () => {
        this.setState({expand: true});
    }

    handleExpandLess = () => {
        this.setState({expand: false});
    }

    render() {
        const {classes} = this.props;
        const {dispatch} = this.props;
        this.props.query.graph.nodes.forEach((p)=>{dispatch(addColor(p.typeName))});
        return (
            <TableRow>
            <TableCell>
                {this.props.query.cypher}
                

                {this.state.expand && 
                <Grid container={true} spacing={0}>
                    <Grid item={true} xs={12} className={classes.querygraphpanel}>
                        <QueryGraphPanel
                            graph = {this.props.query.graph}
                            rank = {this.props.query.rank}
                        />
                    </Grid>
                  
                </Grid>}
            </TableCell>
            <TableCell>{this.props.query.score}
                {!this.state.expand && <ExpandMoreIcon onClick={this.handleExpandMore}/>}
                {this.state.expand && <ExpandLessIcon onClick={this.handleExpandLess}/>}
                <Button onClick={() => {
                            if (this.props.query.returnType === "node"){
                                dispatch(fetchGraphWorker({query:this.props.query.cypher,graph:this.props.query.graph}));
                                dispatch(changeTab("api-graph"));
                            }else{
                                dispatch(fetchAttributeWorker({query:this.props.query.cypher}));
                                dispatch(changeTab("attribute-cypher"));
                            }
                        }
                    }>RUN</Button>
            </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)<QueryRowProps2>(connect(mapStateToProps)(QueryRow));
