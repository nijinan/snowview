import * as React from 'react';
import { TableCell, TableRow, withStyles, WithStyles,Grid } from 'material-ui';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import { Theme } from 'material-ui/styles';
import QueryGraphPanel from '../components/QueryGraphPanel';
import { QueryInfo} from '../model';

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
    }
});

interface QueryRowProps {
    query: QueryInfo;
}

type QueryRowStyle = WithStyles<'detail' | 'cellRank' | 'cellMain' | 'highlight' | 'querygraphpanel'>;

class QueryRow extends React.Component<QueryRowProps & QueryRowStyle, { expand: boolean }> {
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

        return (
            <TableRow>
            <TableCell>
                {this.props.query.cypher}
                

                {this.state.expand && 
                <Grid container={true} spacing={0}>
                    <Grid item={true} xs={8} className={classes.querygraphpanel}>
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
            </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)<QueryRowProps>(QueryRow);
