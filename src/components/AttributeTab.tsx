import * as React from 'react';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, withStyles, WithStyles } from 'material-ui';
import { Theme } from 'material-ui/styles';
import { AttributeState } from '../redux/reducer';

const styles = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    table: {
        width: '70%',
    },
    progress: {
        flexGrow: 1,
        margin: theme.spacing.unit * 4
    }
}) as React.CSSProperties;

class AttributeTabProps {
    attributeResult: AttributeState;
}

type AttributeTabStyle = WithStyles<'container' | 'table' | 'progress'>;

class AttributeTab extends React.Component<AttributeTabProps & AttributeTabStyle, {}> {
    render() {
        const {classes, attributeResult} = this.props;
        return (
            <div className={classes.container}>
                {attributeResult.fetching && <LinearProgress className={classes.progress}/>}
                {attributeResult.rankResult != null && <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ranking</TableCell>
                            <TableCell>Candidate Answer</TableCell>
                            <TableCell>Up/Down(w.r.t. IR)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attributeResult.rankResult
                            .map(r => <TableRow>
                                <TableCell>
                                    {r}
                                </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>}
            </div>
        );
    }
}

export default withStyles(styles)<AttributeTabProps>(AttributeTab);
