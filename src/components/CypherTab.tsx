import * as React from 'react';
import {  Table,  TableCell, TableBody, TableHead, TableRow, withStyles, WithStyles } from 'material-ui';
import { Theme } from 'material-ui/styles';
import { CypherState } from '../redux/reducer';
import QueryRow from './QueryRow';
const styles = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    table: {
        width: '70%',
    },
}) as React.CSSProperties;

interface CypherTabProps {
    cypherResult: CypherState;
}

type CypherTabStyle = WithStyles<'container' | 'table'>;

class CypherTab extends React.Component<CypherTabProps & CypherTabStyle, {}> {
    render() {
        const {classes, cypherResult} = this.props;
        return (
            <div className={classes.container}>
                {cypherResult.result != null && <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ranking</TableCell>
                            <TableCell>Candidate Answer</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                            {cypherResult.result.rankedResults
                            .map(r =>                         
                                <QueryRow
                                    query = {r}
                                />
                            )}

                    </TableBody>                    
                </Table>}
            </div>
        );
    }
}

export default withStyles(styles)<CypherTabProps>(CypherTab);
