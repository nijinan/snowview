import * as React from 'react';
import GraphPanel from '../components/GraphPanel';
import FindEntityPanel from '../components/FindEntityPanel';
import InformationPanel from '../components/InformationPanel';
import { Grid, LinearProgress, withStyles, WithStyles } from 'material-ui';
import { connect } from 'react-redux';
import { Theme } from 'material-ui/styles';
import { RootState } from '../redux/reducer';
import { Dispatch } from 'redux';

const styles = (theme: Theme) => ({
    leftPanel: {
        padding: theme.spacing.unit * 2,
    },
    rightPanel: {
        paddingTop: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    informationPanel: {
        marginTop: theme.spacing.unit * 2,
    }
});

const mapStateToProps = (state: RootState) => {
    return {
        fetchingGraph: state.graph.fetching,
    };
};

class GraphTabProps {
    fetchingGraph: boolean;
    dispatch: Dispatch<RootState>;
}

type GraphTabStyles = WithStyles<'leftPanel' | 'rightPanel' | 'informationPanel'>;

class GraphTab extends React.Component<GraphTabProps & GraphTabStyles, {}> {
    render() {
        const {classes, fetchingGraph} = this.props;
        const show = (
            <Grid container={true} spacing={0}>
                <Grid item={true} xs={8} className={classes.leftPanel}>
                    <GraphPanel/>
                </Grid>
                <Grid item={true} xs={4} className={classes.rightPanel}>
                    <FindEntityPanel/>
                    <div className={classes.informationPanel}>
                        <InformationPanel/>
                    </div>
                </Grid>
            </Grid>
        );
        const notShow = (
            <Grid container={true} spacing={0}>
                <LinearProgress/>
            </Grid>
        );
        return fetchingGraph ? notShow : show;
    }
}

export default withStyles(styles)<{}>(connect(mapStateToProps)(GraphTab));
